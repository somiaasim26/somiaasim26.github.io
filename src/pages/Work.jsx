import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { projects } from '../data/content'

const filters = [
  { key: 'all',      label: 'All'         },
  { key: 'flood',    label: 'Flood'       },
  { key: 'lulc',     label: 'LULC'        },
  { key: 'analysis', label: 'Analysis'    },
  { key: 'cartography', label: 'Cartography'    },
]

export default function Work() {
  const [active, setActive] = useState('all')
  const [lb, setLb] = useState(null)

  const filtered = active === 'all' ? projects : projects.filter(p => p.cat === active)

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="section-label">Work</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Selected{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              projects.
            </span>
          </h1>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative font-mono text-xs px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f.key
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200'
                  : 'bg-white text-slate-500 border-blue-100 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {active === f.key && (
                <motion.span layoutId="filter-bg" className="absolute inset-0 rounded-full bg-blue-500" style={{ zIndex: -1 }} />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                onClick={() => setLb(p)}
                className="card overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-video bg-blue-50 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-400"
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.parentElement.style.background = 'linear-gradient(135deg,#EFF6FF,#DBEAFE)'
                    }}
                  />
                  <span className="absolute top-2 left-2 font-mono text-xs text-white bg-blue-500/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {p.badge}
                  </span>
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={28} />
                  </div>
                </div>
                {/* Body */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-slate-800 mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-2">{p.desc}</p>
                  <span className="font-mono text-xs text-blue-400">{p.org}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLb(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setLb(null)}
                className="absolute -top-10 right-0 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={lb.img}
                alt={lb.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="font-display font-bold text-white text-lg">{lb.title}</p>
                <p className="font-mono text-xs text-slate-400 mt-1">{lb.badge} · {lb.org}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
