import { useEffect, useRef } from 'react'

/**
 * Full-bleed WebGL2 shader — a slow-drifting nebula that fills a hero.
 *
 * Adapted from Matthias Hurrle's fragment shader (via 21st.dev). The core
 * loop is unchanged; the palette constants are retuned to the platform's
 * cool blues (azure / aqua / brand-soft) with a faint tangerine ember, so
 * it blends into the night surface rather than fighting it.
 */

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

// The one place worth tweaking to shift palette:
//   PAL_A / PAL_B — the two ends of the starburst gradient
//   CLOUD_TINT    — the nebula wash sitting behind everything
const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),
        b=rnd(i+vec2(1,0)),
        c=rnd(i+vec2(0,1)),
        d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p){
  float t=.0, a=1.;
  mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++){
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p){
  float d=1., t=.0;
  for (float i=.0; i<3.; i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}

void main(void){
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);

  // Palette — cool blues with a warm ember.
  //   azure    ≈ #1E88F5 → (0.12, 0.53, 0.96)
  //   aqua     ≈ #22D3EE → (0.13, 0.83, 0.93)
  //   soft ink ≈ (0.07, 0.10, 0.18)
  vec3 PAL_A     = vec3(0.28, 0.62, 1.00);   // brighter cool
  vec3 PAL_B     = vec3(0.14, 0.86, 0.98);   // aqua highlight
  vec3 EMBER     = vec3(1.00, 0.42, 0.10);   // rare warm punch
  vec3 CLOUD_TINT= vec3(0.05, 0.10, 0.22);   // nebula wash

  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);

  for (float i=1.; i<12.; i++){
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);

    // Cycle between the two cool tones, with EMBER surfacing only every ~6th step.
    float phase=sin(i*.5)*.5+.5;
    vec3 tint=mix(PAL_A, PAL_B, phase);
    tint=mix(tint, EMBER, smoothstep(.85, 1.0, sin(i*.9)*.5+.5));

    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.)*tint;

    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)))*mix(PAL_A, PAL_B, b);

    // Nebula wash — subtle blue, so the night background reads as night.
    col=mix(col, CLOUD_TINT*bg, d);
  }

  O=vec4(col,1);
}`

class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl2')
    this.scale = 1
    this.program = null
  }

  setup() {
    const gl = this.gl
    if (!gl) return false

    const vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, VERTEX_SRC)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, FRAGMENT_SRC)
    gl.compileShader(fs)

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('[ShaderBackground] fragment shader:', gl.getShaderInfoLog(fs))
      return false
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[ShaderBackground] link:', gl.getProgramInfoLog(program))
      return false
    }

    this.program = program

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    this.uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      time: gl.getUniformLocation(program, 'time'),
    }
    return true
  }

  updateScale(scale) {
    this.scale = scale
    this.gl?.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  render(now) {
    const gl = this.gl
    if (!gl || !this.program) return
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(this.program)
    gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uniforms.time, now * 1e-3)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const rafRef = useRef(0)
  // Mirrors visibility + tab focus so the render loop only runs when it's
  // actually seen. A fragment shader like this can eat 20%+ CPU per frame
  // on mid-range laptops; leaving it running behind other sections was the
  // biggest cause of scroll jank down the page.
  const runningRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new Renderer(canvas)
    const ok = renderer.setup()
    if (!ok) return // WebGL2 unsupported — background falls back to plain black
    rendererRef.current = renderer

    // Cap the pixel ratio: a fragment shader like this is expensive at 3x.
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)

    const size = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width || window.innerWidth
      const h = rect.height || window.innerHeight
      canvas.width = Math.max(2, Math.floor(w * dpr))
      canvas.height = Math.max(2, Math.floor(h * dpr))
      renderer.updateScale(dpr)
    }
    requestAnimationFrame(size)

    const loop = (now) => {
      if (!runningRef.current) return
      renderer.render(now)
      rafRef.current = requestAnimationFrame(loop)
    }

    const start = () => {
      if (runningRef.current) return
      runningRef.current = true
      rafRef.current = requestAnimationFrame(loop)
    }
    const stop = () => {
      runningRef.current = false
      cancelAnimationFrame(rafRef.current)
    }

    // Only run while the wrapper is actually on screen.
    const parent = canvas.parentElement
    let io = null
    if (parent && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !document.hidden) start()
            else stop()
          }
        },
        // A tiny negative margin means we cut the shader the moment it
        // leaves the viewport rather than lingering during the fade.
        { rootMargin: '-40px 0px' }
      )
      io.observe(parent)
    } else {
      start()
    }

    let ro = null
    if (parent && 'ResizeObserver' in window) {
      ro = new ResizeObserver(size)
      ro.observe(parent)
    } else {
      window.addEventListener('resize', size)
    }

    // Pause while the tab is hidden too.
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (io) {
        // Let the IntersectionObserver's next entry decide — force a check.
        const rect = canvas.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) start()
      } else start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      if (io) io.disconnect()
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', size)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
