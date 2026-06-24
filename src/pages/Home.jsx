import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Satellite, Database, Globe, ChevronDown } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const tags = ['ArcGIS Pro', 'Google Earth Engine', 'QGIS', 'Python', 'R', 'PostgreSQL', 'Streamlit', 'Mapbox GL']

const stats = [
  { num: '4+',    label: 'Years Experience' },
  { num: '1000+', label: 'Maps Produced' },
  { num: '8K+',   label: 'Supply Routes Modelled' },
  { num: '3',     label: 'Research Orgs' },
]

const features = [
  { icon: <Satellite size={22} />, title: 'Remote Sensing', desc: 'Satellite image processing — Sentinel, Landsat, MODIS — for flood mapping and LULC classification.' },
  { icon: <MapPin size={22} />,    title: 'Spatial Analysis', desc: 'Flood risk modelling, spatial clustering, hydrology, and road network disruption analysis.' },
  { icon: <Database size={22} />,  title: 'Data Engineering', desc: 'Large dataset wrangling, fuzzy matching, PostgreSQL/PostGIS pipelines, and Streamlit dashboards.' },
  { icon: <Globe size={22} />,     title: 'Web Mapping', desc: 'Interactive ArcGIS Online web apps, Mapbox GL stories, and publication-quality cartography.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 min-h-[calc(100vh-96px)] flex flex-col justify-center">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="mb-6">
            <span className="tag-chip">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              GIS &amp; Remote Sensing Analyst
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6">
            <span className="text-slate-900">Somia</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent">
              Asim
            </span>
          </motion.h1>

          <motion.p variants={item} className="font-mono text-blue-500 text-sm tracking-widest uppercase mb-5">
            Spatial Data · Cartography · Vibe Coding
          </motion.p>

          <motion.p variants={item} className="text-slate-500 text-lg leading-relaxed max-w-xl mb-8 font-light">
            I turn satellite imagery, messy datasets, and spatial models into maps and insights that actually mean something.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
            {tags.map(t => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link to="/work" className="btn-primary">
              View My Work <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-start gap-1"
        >
          <span className="font-mono text-xs text-slate-400 tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="text-blue-300"
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-10 border-y border-blue-100 bg-white/60 backdrop-blur-sm mt-8">
        <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-2 lg:grid-cols-4 gap-px">
          {stats.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center px-4 py-6 relative"
            >
              {i < stats.length - 1 && (
                <span className="absolute right-0 top-1/4 bottom-1/4 w-px bg-blue-100 hidden lg:block" />
              )}
              <div className="text-3xl font-display font-extrabold bg-gradient-to-br from-blue-500 to-blue-800 bg-clip-text text-transparent mb-1">
                {num}
              </div>
              <div className="font-mono text-xs text-slate-400 tracking-widest uppercase">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="section-label">What I do</div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            The full geospatial<br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">workflow.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="card p-6 backdrop-blur-sm group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-100 transition-colors">
                {icon}
              </div>
              <h3 className="font-display font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MINI CTA */}
      <section className="max-w-7xl mx-auto px-5 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          <div className="px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-2">
                Let's make maps together.
              </h3>
              <p className="text-slate-500 font-light">Open to freelance, research collaborations, and consulting.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link to="/work" className="btn-primary">See My Work</Link>
              <Link to="/contact" className="btn-ghost">Contact Me</Link>
            </div>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  )
}
