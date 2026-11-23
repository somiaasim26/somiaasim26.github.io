import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { skills } from '../data/content'
import { focusAreas } from '../data/research'

const colors = ['blue', 'sky', 'indigo', 'cyan', 'violet', 'blue']

export default function Skills() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-label">Skills</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Tools of the{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              trade.
            </span>
          </h1>
        </motion.div>

        <div className="mb-10">
          <div className="section-label">Focus areas</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {focusAreas.map(f => (
              <div key={f.title} className="card p-5 backdrop-blur-sm">
                <h4 className="font-display font-semibold text-slate-800 mb-1.5">{f.title}</h4>
                <p className="text-sm text-slate-500 font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map(({ category, items }, gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="card p-5 backdrop-blur-sm group"
            >
              <div className="font-mono text-xs text-blue-500 tracking-widest uppercase mb-4 pb-3 border-b border-blue-50">
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + ii * 0.04, duration: 0.3 }}
                    whileHover={{ scale: 1.06 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium
                      bg-blue-50 text-blue-700 border border-blue-100
                      hover:bg-blue-100 hover:border-blue-200 cursor-default transition-colors"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="section-label">Also</div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Research & Writing', desc: 'Policy briefs, working papers, reports and technical documentation.' },
              { label: 'Cartographic Design', desc: 'Publication-quality maps, visual storytelling, story maps.' },
              { label: 'Teaching & Outreach', desc: 'GEE & MaxEnt training manuals, GIS Day events, science melas.' },
            ].map(({ label, desc }) => (
              <div key={label} className="card p-5 backdrop-blur-sm">
                <h4 className="font-display font-semibold text-slate-800 mb-1.5">{label}</h4>
                <p className="text-sm text-slate-500 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
