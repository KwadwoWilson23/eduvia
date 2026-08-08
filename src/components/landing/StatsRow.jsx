import { motion } from 'framer-motion'
import CountUp from '../shared/CountUp'
import { Stagger, staggerChild } from '../shared/Motion'
import { stats } from '../../mockData'

const accents = ['#A855F7', '#A3E635', '#22D3EE', '#F97316']

export default function StatsRow() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-night py-16 lg:py-20">
      <div className="relative mx-auto max-w-shell px-4 sm:px-6 lg:px-10">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          {stats.map((stat, i) => (
            <motion.div key={stat.id} variants={staggerChild} className="text-center lg:text-left">
              <div
                className="mx-auto mb-4 h-1 w-10 rounded-full lg:mx-0"
                style={{ backgroundColor: accents[i % accents.length] }}
              />
              <div className="font-heading text-4xl font-extrabold tracking-tightest lg:text-[56px]">
                {/* Only five-figure counts collapse to K — 1,800 reads better in full. */}
                <CountUp value={stat.value} suffix={stat.suffix} compact={stat.value >= 10000} />
              </div>
              <div className="mt-3 text-sm font-semibold">{stat.label}</div>
              <div className="mt-1 text-xs text-white/40">{stat.sub}</div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
