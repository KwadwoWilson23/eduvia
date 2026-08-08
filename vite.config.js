import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Honour PORT when the harness assigns one, so parallel sessions don't collide.
  server: { port: Number(process.env.PORT) || 5173 },
})
