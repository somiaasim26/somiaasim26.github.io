import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ExternalLink } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { projects } from '../data/content'

const filters = [
  { key: 'all',         label: 'All'         },
  { key: 'flood',       label: 'Flood'       },
  { key: 'drought',     label: 'Drought'     },
  { key: 'lulc',        label: 'LULC'        },
  { key: 'analysis',    label: 'Analysis'    },
  { key: 'cartography', label: 'Cartography' },
  { key: 'interactive', label: 'Interactive' },
]

function NightGridPreview() {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320].map(x => (
        <line key={'v'+x} x1={x} y1="0" x2={x} y2="180" stroke="#1e4a7a" strokeWidth="0.6"/>
      ))}
      {[0,20,40,60,80,100,120,140,160,180].map(y => (
        <line key={'h'+y} x1="0" y1={y} x2="320" y2={y} stroke="#1e4a7a" strokeWidth="0.6"/>
      ))}
      <rect x="30"  y="100" width="16" height="80"  fill="#0f2d52" stroke="#2a6db5" strokeWidth="0.5"/>
      <rect x="50"  y="80"  width="12" height="100" fill="#0d2646" stroke="#2a6db5" strokeWidth="0.5"/>
      <rect x="66"  y="90"  width="20" height="90"  fill="#102e55" stroke="#3580cc" strokeWidth="0.5"/>
      <rect x="90"  y="65"  width="14" height="115" fill="#0d2a4e" stroke="#3580cc" strokeWidth="0.5"/>
      <rect x="108" y="75"  width="18" height="105" fill="#0f3060" stroke="#2a6db5" strokeWidth="0.5"/>
      <rect x="130" y="50"  width="22" height="130" fill="#0a2240" stroke="#4a90d9" strokeWidth="0.5"/>
      <rect x="156" y="70"  width="16" height="110" fill="#0e2b50" stroke="#2a6db5" strokeWidth="0.5"/>
      <rect x="176" y="85"  width="14" height="95"  fill="#0d2646" stroke="#3580cc" strokeWidth="0.5"/>
      <rect x="194" y="60"  width="20" height="120" fill="#102e55" stroke="#2a6db5" strokeWidth="0.5"/>
      <rect x="218" y="78"  width="16" height="102" fill="#0f2d52" stroke="#4a90d9" strokeWidth="0.5"/>
      <rect x="238" y="55"  width="18" height="125" fill="#0d2a4e" stroke="#3580cc" strokeWidth="0.5"/>
      <rect x="260" y="88"  width="14" height="92"  fill="#0a2240" stroke="#2a6db5" strokeWidth="0.5"/>
      <rect x="278" y="68"  width="20" height="112" fill="#0e2b50" stroke="#3580cc" strokeWidth="0.5"/>
      {[
        [38,115,1.4,'#7fd0ff'],[58,98,1.2,'#35b6ff'],[72,105,1.4,'#fff'],
        [95,80,1.2,'#7fd0ff'],[115,92,1.4,'#35b6ff'],[138,68,1.4,'#fff'],
        [163,88,1.2,'#7fd0ff'],[180,100,1.4,'#35b6ff'],[200,75,1.2,'#fff'],
        [224,92,1.4,'#7fd0ff'],[244,70,1.2,'#35b6ff'],[265,102,1.4,'#fff'],
        [283,82,1.2,'#7fd0ff'],[48,130,1.0,'#35b6ff'],[78,120,1.0,'#fff'],
        [120,140,1.0,'#7fd0ff'],[158,128,1.0,'#35b6ff'],[200,138,1.0,'#fff'],
        [245,122,1.0,'#7fd0ff'],[282,135,1.0,'#35b6ff'],
      ].map(([cx, cy, r, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} opacity="0.85"/>
      ))}
      <circle cx="160" cy="90" r="60" fill="none" stroke="#35b6ff" strokeWidth="0.5" opacity="0.25"/>
      <circle cx="160" cy="90" r="38" fill="none" stroke="#35b6ff" strokeWidth="0.4" opacity="0.2"/>
      <line x1="160" y1="90" x2="210" y2="48" stroke="#35b6ff" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  )
}

export default function Work() {
  const [active, setActive] = useState('all')
  const [lb, setLb] = useState(null)
  const [lbIdx, setLbIdx] = useState(0)

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)
  const filtered = active === 'all' ? rest : rest.filter(p => p.cat === active)

  function handleCardClick(p) {
    if (p.link && !p.img) {
      window.open(p.link, '_blank', 'noopener,noreferrer')
    } else {
      setLbIdx(0)
      setLb(p)
    }
  }

  function lbImages(p) {
    if (p.gallery && p.gallery.length) return p.gallery
    return p.img ? [p.img] : []
  }

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

        {/* Featured live apps */}
        <div className="mb-10">
          <div className="section-label">Featured · live apps</div>
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map(p => (
              <div key={p.id} className="card overflow-hidden backdrop-blur-sm flex flex-col">
                <div className="relative cursor-pointer" onClick={() => handleCardClick(p)}>
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full aspect-video object-cover object-top" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-blue-600 text-white px-2.5 py-1 rounded-full">Featured</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-2">{p.badge}</div>
                  <h3 className="font-display text-lg font-extrabold text-slate-900 leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 font-light leading-relaxed flex-1">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                       className="btn-primary inline-flex items-center gap-1.5 text-sm">
                      {p.linkLabel || 'Open app'} <ExternalLink size={14} />
                    </a>
                    <button type="button" onClick={() => handleCardClick(p)}
                            className="font-mono text-xs text-blue-500 hover:text-blue-700">
                      View screenshots
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                onClick={() => handleCardClick(p)}
                className="card overflow-hidden cursor-pointer group"
              >
                {/* Thumbnail */}
                {p.link && !p.img ? (
                  <div
                    className="relative aspect-video overflow-hidden"
                    style={{ background: 'linear-gradient(160deg,#060c18 0%,#091525 45%,#060e1c 100%)' }}
                  >
                    <NightGridPreview />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(6,10,20,0.5)' }}>
                      <ExternalLink size={26} style={{ color: '#7fd0ff' }} />
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#7fd0ff' }}>Open interactive</span>
                    </div>
                    <span
                      className="absolute top-2 left-2 font-mono text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(10,30,60,0.8)', color: '#7fd0ff', border: '1px solid rgba(53,182,255,0.35)', backdropFilter: 'blur(6px)' }}
                    >
                      {p.badge}
                    </span>
                  </div>
                ) : (
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
                      {p.link
                        ? <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={28} />
                        : <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={28} />
                      }
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    {p.title}
                    {p.link && <ExternalLink size={12} className="text-blue-400 shrink-0" />}
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-2">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-blue-400">{p.org}</span>
                    {p.link && p.img && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="font-mono text-xs text-blue-500 flex items-center gap-1 hover:text-blue-700"
                      >
                        {p.linkLabel || 'Open app'} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (() => {
          const imgs = lbImages(lb)
          const hasPrev = lbIdx > 0
          const hasNext = lbIdx < imgs.length - 1
          return (
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
                <div className="relative">
                  {lb.video ? (
                    <video
                      src={lb.video}
                      poster={imgs[0]}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-black"
                    />
                  ) : (
                    <img
                      key={lbIdx}
                      src={imgs[lbIdx]}
                      alt={lb.title}
                      className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                    />
                  )}
                  {hasPrev && (
                    <button
                      onClick={e => { e.stopPropagation(); setLbIdx(i => i - 1) }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                    >‹</button>
                  )}
                  {hasNext && (
                    <button
                      onClick={e => { e.stopPropagation(); setLbIdx(i => i + 1) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                    >›</button>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <p className="font-display font-bold text-white text-lg">{lb.title}</p>
                  <p className="font-mono text-xs text-slate-400 mt-1">{lb.badge} · {lb.org}</p>
                  {imgs.length > 1 && (
                    <p className="font-mono text-xs text-slate-500 mt-1">{lbIdx + 1} / {imgs.length}</p>
                  )}
                  {lb.link && (
                    <a
                      href={lb.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {lb.linkLabel || 'Open interactive app'} <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </PageWrapper>
  )
}
