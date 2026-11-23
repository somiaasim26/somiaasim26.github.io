import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, FlaskConical, GraduationCap } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Flowchart from '../components/Flowchart'
import { researchInterests, researchProjects, course, publications, comingSoon } from '../data/research'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
})

export default function Research() {
  const [open, setOpen] = useState({})
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5">

        <motion.div {...fadeUp()} className="mb-8">
          <div className="section-label">Research</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Questions I{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              work on.
            </span>
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {researchInterests.map(t => <span key={t} className="tag-chip">{t}</span>)}
          </div>
        </motion.div>

        {/* Coming soon panel: one announcement, sliding cards */}
        <motion.div {...fadeUp(0.05)} className="rs-banner mb-10">
          <div className="rs-banner-top">
            <FlaskConical size={13} className="text-blue-300 shrink-0" />
            <span>Research in progress</span>
            <i className="rs-live" />
          </div>
          <div className="rs-body">
            <div className="rs-title">Coming Soon.</div>
            <p className="rs-sub">Full write-ups and methods notes are on the way. Here is what is in the pipeline.</p>
          </div>
          <div className="rs-cards-wrap">
            <div className="rs-track">
              {[...comingSoon, ...comingSoon].map((c, i) => (
                <div
                  key={c.title + i}
                  aria-hidden={i >= comingSoon.length}
                  className={`rs-card bg-gradient-to-br ${c.color}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rs-badge">Coming Soon</span>
                    <span className="rs-status">{c.status}</span>
                  </div>
                  <h3 className="rs-card-title">{c.title}</h3>
                  <p className="rs-card-desc">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map(t => <span key={t} className="rs-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects */}
        <div className="space-y-10">
          {researchProjects.map(p => (
            <motion.section key={p.id} {...fadeUp()} className="card p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  p.soon ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>{p.status}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">{p.title}</h2>
              <p className="mt-3 text-slate-600 font-light leading-relaxed">{p.question}</p>

              <div className="mt-6">
                {p.phases && <Flowchart phases={p.phases} />}
                {p.thumb && (
                  <img src={p.thumb} alt={p.title} loading="lazy"
                       className="w-full max-w-2xl mx-auto rounded-xl border border-slate-100 mb-5" />
                )}
                {p.image && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpen(o => ({ ...o, [p.id]: !o[p.id] }))}
                      aria-expanded={!!open[p.id]}
                      className="inline-flex items-center gap-2 font-mono text-xs text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 rounded-lg px-4 py-2"
                    >
                      {open[p.id] ? 'Hide methodology' : 'Click to see methodology'}
                    </button>
                    {open[p.id] && (
                      <a href={p.image} target="_blank" rel="noopener noreferrer" className="block mt-4">
                        <img src={p.image} alt={p.imageAlt} loading="lazy"
                             className="w-full max-w-2xl mx-auto rounded-xl border border-slate-100 bg-white" />
                        <span className="block text-center mt-2 font-mono text-[10px] text-slate-400">Click to enlarge</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <p className="mt-6 text-sm text-slate-500 font-light leading-relaxed border-l-2 border-blue-200 pl-4">{p.note}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded">{t}</span>
                ))}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                     className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-blue-500 hover:text-blue-700">
                    {p.linkLabel} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Course */}
        <motion.section {...fadeUp()} className="mt-12 rs-course">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={16} className="text-blue-300" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-200">Teaching · {course.with}</span>
          </div>
          <div className="rs-course-when">{course.when}</div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight mt-2">{course.title}</h2>
          <p className="mt-3 text-blue-100/80 font-light leading-relaxed max-w-2xl">{course.desc}</p>
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {course.covers.map(c => (
              <li key={c} className="flex items-start gap-2 text-sm text-blue-100/90">
                <span className="text-blue-300 mt-0.5 shrink-0">›</span>{c}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Publications */}
        <motion.section {...fadeUp()} className="mt-14">
          <div className="section-label">Publications &amp; reports</div>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">Written work</h2>
          <div className="space-y-3">
            {publications.map(pub => (
              <div key={pub.text} className="card p-5 backdrop-blur-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-blue-500">{pub.status}</span>
                <p className="mt-2 text-sm text-slate-600 font-light leading-relaxed">{pub.text}</p>
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 mt-2 font-mono text-xs text-blue-500 hover:text-blue-700">
                    Read the report <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <style>{`
        .rs-banner{position:relative;overflow:hidden;border-radius:16px;border:1px solid rgba(59,130,246,.22);background:linear-gradient(135deg,#0d1b2e 0%,#112240 55%,#0d1b2e 100%);box-shadow:0 0 32px rgba(59,130,246,.08)}
        .rs-banner::before{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(99,179,237,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,.045) 1px,transparent 1px);background-size:28px 28px}
        .rs-banner-top{position:relative;display:flex;align-items:center;gap:8px;padding:10px 16px;border-bottom:1px solid rgba(59,130,246,.14)}
        .rs-banner-top span{font:400 11px "Space Mono",monospace;color:#93c5fd;text-transform:uppercase;letter-spacing:.18em}
        .rs-live{width:6px;height:6px;border-radius:50%;background:#34d399;animation:rs-pulse 2.5s ease-in-out infinite}
        @keyframes rs-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(52,211,153,.4)}50%{opacity:.5;box-shadow:0 0 0 4px rgba(52,211,153,0)}}
        .rs-body{position:relative;padding:22px 20px 26px}
        .rs-title{font-family:Sora,sans-serif;font-weight:800;font-size:clamp(40px,9vw,72px);line-height:1;letter-spacing:-.03em;color:#f1f5f9;text-shadow:0 0 48px rgba(96,165,250,.35)}
        .rs-sub{margin-top:12px;max-width:560px;color:rgba(191,219,254,.75);font-size:14px;font-weight:300;line-height:1.6}
        .rs-soon-badge{font:700 10px "Space Mono",monospace;text-transform:uppercase;letter-spacing:.08em;color:#fff;background:linear-gradient(90deg,#f59e0b,#ea580c);padding:4px 10px;border-radius:999px}
        .rs-course{position:relative;overflow:hidden;border-radius:20px;padding:28px;background:linear-gradient(135deg,#0d1b2e 0%,#1e3a6e 60%,#0d1b2e 100%);border:1px solid rgba(59,130,246,.25);box-shadow:0 10px 40px rgba(30,58,110,.25)}
        .rs-course-when{display:inline-block;font:700 11px "Space Mono",monospace;text-transform:uppercase;letter-spacing:.15em;color:#fff;background:linear-gradient(90deg,#f59e0b,#ea580c);padding:5px 12px;border-radius:999px}
        .rs-cards-wrap{position:relative;overflow:hidden;padding:4px 0 22px}
        .rs-track{display:flex;gap:16px;width:max-content;padding-left:16px;animation:rs-slide 36s linear infinite}
        .rs-cards-wrap:hover .rs-track{animation-play-state:paused}
        @keyframes rs-slide{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 8px))}}
        .rs-card{flex:0 0 auto;width:290px;display:flex;flex-direction:column;gap:10px;padding:20px;border-radius:18px;border:1px solid rgba(255,255,255,.35);box-shadow:0 6px 24px rgba(0,0,0,.25);transition:transform .2s ease}
        .rs-card:hover{transform:translateY(-4px)}
        .rs-badge{font:700 10px "Space Mono",monospace;text-transform:uppercase;letter-spacing:.06em;color:#fff;background:linear-gradient(90deg,#f59e0b,#ea580c);padding:3px 9px;border-radius:999px}
        .rs-status{font:400 10px "Space Mono",monospace;color:#475569;text-align:right}
        .rs-card-title{font-family:Sora,sans-serif;font-weight:800;font-size:14px;line-height:1.35;letter-spacing:-.01em;color:#0f172a}
        .rs-card-desc{font-size:12px;line-height:1.6;color:#475569;flex:1}
        .rs-tag{font:700 10px "Space Mono",monospace;text-transform:uppercase;letter-spacing:.04em;background:rgba(255,255,255,.75);color:#334155;padding:3px 8px;border-radius:5px;border:1px solid rgba(0,0,0,.06)}
        @media (prefers-reduced-motion:reduce){.rs-track{animation:none;flex-wrap:wrap;width:auto;padding-right:16px}}
      `}</style>
    </PageWrapper>
  )
}
