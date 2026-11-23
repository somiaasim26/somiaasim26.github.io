import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, FlaskConical, Satellite, Wind, Droplets } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { blogPosts } from '../data/content'

const upcomingPosts = [
  {
    id: 'agri-sat-nowcast',
    icon: Satellite,
    color: 'from-green-50 to-emerald-100',
    iconColor: 'text-emerald-400',
    title: "Can satellites nowcast Pakistan's agricultural growth?",
    excerpt: 'MODIS NDVI across Punjab and Sindh districts (FY2001-2026) tested against World Bank GDP figures — before official data releases.',
    tags: ['GEE', 'NDVI', 'Agriculture'],
  },
  {
    id: 'flood-to-drought',
    icon: Droplets,
    color: 'from-blue-50 to-sky-100',
    iconColor: 'text-sky-400',
    title: 'From flood to thirst: Punjab and Sindh, 2025-26',
    excerpt: 'CHIRPS rainfall trends (1981-2025) and UNOSAT flood extents trace the swing from extreme wet to extreme dry across the same districts.',
    tags: ['Flood', 'Drought', 'CHIRPS'],
  },
  {
    id: 'smog-crop-burning',
    icon: Wind,
    color: 'from-orange-50 to-amber-100',
    iconColor: 'text-amber-400',
    title: 'Smoke signals: crop burning, wind, and the smog belt',
    excerpt: 'FIRMS VIIRS fire detections (2012-2026) linked to ERA5 wind trajectories and PM2.5 from Lahore and Delhi.',
    tags: ['Air Quality', 'FIRMS', 'ERA5'],
  },
]

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Blog() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-label">Blog</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Thoughts on{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              geo &amp; data.
            </span>
          </h1>
          <p className="mt-4 text-slate-500 font-light max-w-lg">
            Deep dives into GIS workflows, remote sensing techniques, and data science for spatial problems.
          </p>
        </motion.div>

        {/* Coming Soon announcement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="cs-banner mb-6"
        >
          <div className="cs-banner-top">
            <FlaskConical size={13} className="text-blue-400 shrink-0" />
            <span>Coming Soon</span>
            <i className="cs-live" />
          </div>
          <div className="cs-ann">
            <div className="cs-ann-sub">Blogs in progress</div>
            <div className="cs-ann-title">Coming Soon.</div>
          </div>
        </motion.div>

        {/* Auto-sliding Coming Soon cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cs-cards-wrap mb-12"
        >
          <div className="cs-track">
            {[...upcomingPosts, ...upcomingPosts].map((post, i) => {
              const Icon = post.icon
              return (
                <div
                  key={post.id + '-' + i}
                  aria-hidden={i >= upcomingPosts.length}
                  className={`cs-card bg-gradient-to-br ${post.color}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={22} className={post.iconColor} />
                    <span className="cs-badge">Coming Soon</span>
                  </div>
                  <h3 className="cs-title">{post.title}</h3>
                  <p className="cs-desc">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(t => (
                      <span key={t} className="cs-tag">{t}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <style>{`
            .cs-banner{position:relative;overflow:hidden;border-radius:16px;border:1px solid rgba(59,130,246,.22);background:linear-gradient(135deg,#0d1b2e 0%,#112240 55%,#0d1b2e 100%);box-shadow:0 0 32px rgba(59,130,246,.07)}
            .cs-banner::before{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(99,179,237,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(99,179,237,.045) 1px,transparent 1px);background-size:28px 28px}
            .cs-banner-top{position:relative;display:flex;align-items:center;gap:8px;padding:10px 16px;border-bottom:1px solid rgba(59,130,246,.14)}
            .cs-banner-top span{font:400 11px "Space Mono",monospace;color:#93c5fd;text-transform:uppercase;letter-spacing:.18em}
            .cs-live{width:6px;height:6px;border-radius:50%;background:#34d399;animation:cs-pulse 2.5s ease-in-out infinite}
            @keyframes cs-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(52,211,153,.4)}50%{opacity:.5;box-shadow:0 0 0 4px rgba(52,211,153,0)}}
            .cs-ann{position:relative;padding:22px 20px 26px}
            .cs-ann-sub{font:400 11px "Space Mono",monospace;color:rgba(147,197,253,.6);letter-spacing:.22em;text-transform:uppercase;margin-bottom:8px}
            .cs-ann-title{font-family:Sora,sans-serif;font-weight:800;font-size:clamp(40px,9vw,72px);line-height:1;letter-spacing:-.03em;color:#f1f5f9;text-shadow:0 0 48px rgba(96,165,250,.35)}
            .cs-cards-wrap{overflow:hidden;padding:4px 0 10px}
            .cs-track{display:flex;gap:16px;width:max-content;animation:cs-slide 28s linear infinite}
            .cs-cards-wrap:hover .cs-track{animation-play-state:paused}
            @keyframes cs-slide{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 8px))}}
            .cs-card{flex:0 0 auto;width:288px;display:flex;flex-direction:column;gap:12px;padding:22px;border-radius:20px;border:1px solid rgba(0,0,0,.07);box-shadow:0 2px 16px rgba(0,0,0,.06);transition:transform .2s ease,box-shadow .2s ease}
            .cs-card:hover{transform:translateY(-4px);box-shadow:0 10px 30px rgba(0,0,0,.12)}
            .cs-badge{font:700 10px "Space Mono",monospace;text-transform:uppercase;letter-spacing:.05em;background:rgba(255,255,255,.85);color:#b45309;border:1px solid rgba(180,83,9,.25);padding:3px 10px;border-radius:999px}
            .cs-title{font-family:Sora,sans-serif;font-weight:800;font-size:15px;line-height:1.35;letter-spacing:-.01em;color:#0f172a}
            .cs-desc{font-size:12px;line-height:1.65;color:#475569;flex:1}
            .cs-tag{font:700 10px "Space Mono",monospace;text-transform:uppercase;letter-spacing:.04em;background:rgba(255,255,255,.7);color:#334155;padding:3px 9px;border-radius:5px;border:1px solid rgba(0,0,0,.06)}
            @media (prefers-reduced-motion:reduce){.cs-track{animation:none}.cs-cards-wrap{overflow-x:auto}}
          `}</style>
        </motion.div>

        {/* Featured post */}
        {blogPosts[0] && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Link to={`/blog/${blogPosts[0].id}`}>
              <div className="card overflow-hidden group">
                <div className="relative h-52 sm:h-72 bg-blue-50 overflow-hidden">
                  <img
                    src={blogPosts[0].cover}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 tag-chip bg-blue-500 text-white border-blue-500 text-xs">Featured</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} />{blogPosts[0].readTime}</span>
                    <span>{formatDate(blogPosts[0].date)}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {blogPosts[0].tags.map(t => (
                        <span key={t} className="tag-chip text-xs">{t}</span>
                      ))}
                    </div>
                    <span className="text-blue-500 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other posts */}
        <div className="space-y-5">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className="card p-5 group flex gap-5 items-start">
                  <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-blue-50 shrink-0">
                    <img
                      src={post.cover}
                      alt=""
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-400"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-1.5">
                      <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="font-display font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map(t => (
                        <span key={t} className="font-mono text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
