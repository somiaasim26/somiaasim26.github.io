import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-label">Experience</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Where I've{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              worked.
            </span>
          </h1>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.title + exp.org}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative sm:pl-14"
              >
                {/* Dot */}
                <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full border-2 border-blue-400 bg-white hidden sm:block" style={{ transform: 'translateX(-50%)' }} />

                <div
                  className="card p-6 backdrop-blur-sm relative overflow-hidden group"
                  style={{ borderLeft: '3px solid #3B82F6' }}
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                  <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-lg text-slate-800">{exp.title}</h3>
                    <span className={`font-mono text-xs px-3 py-1 rounded-full border ${
                      exp.badge === 'now'
                        ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
                        : 'text-blue-500 border-blue-100 bg-blue-50'
                    }`}>
                      {exp.badge === 'now' ? '● Present' : exp.period}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-slate-400 mb-3">{exp.org}{exp.badge === 'now' ? ` · ${exp.period}` : ''}</p>

                  <p className="text-sm text-slate-500 font-light leading-relaxed mb-4">{exp.desc}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tools.map(t => (
                      <span key={t} className="font-mono text-xs bg-slate-50 border border-slate-100 text-slate-400 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
