import { motion } from 'framer-motion'
import { MapPin, BookOpen, Briefcase } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5">

        {/* Header */}
		<motion.div {...fadeUp()} className="mb-12">
		  <div className="section-label">About</div>
		  <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
			Cartographer.
			<span className="text-2xl sm:text-3xl block font-normal text-slate-500 mt-1 mb-2">
			  Observer &amp; Learner
			</span>
			<span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
			  GIS Analyst.
			</span>
		  </h1>
		</motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Photo column */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-blue-50 border border-blue-100">
                <img
                  src="./assets/photos/ProfilePhoto.jpg"
                  alt="Somia Asim"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none' }}
                />
               
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white border border-blue-100 rounded-2xl shadow-xl shadow-blue-100/50 px-4 py-3">
                <div className="font-mono text-xs text-slate-400 mb-0.5">Currently at</div>
                <div className="font-display font-bold text-sm text-slate-800">MHRC · LUMS · GSAL</div>
              </div>
            </div>

            {/* Quick info */}
            <div className="mt-8 space-y-3">
              {[
                { icon: <MapPin size={14} />, text: 'Lahore, Pakistan' },
                { icon: <Briefcase size={14} />, text: 'Research Associate · GIS/RS/Data Analyst' },
                { icon: <BookOpen size={14} />, text: 'BS Geography · University of the Punjab' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="text-blue-400">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text column */}
		
		<motion.div {...fadeUp(0.15)} className="lg:col-span-3 space-y-6">
		  <div className="prose prose-slate max-w-none">
			<p className="text-lg text-slate-600 font-light leading-relaxed">
			  I'm a GIS &amp; Remote Sensing Analyst with <strong className="text-slate-800 font-semibold">4+ years of experience</strong> bridging geospatial data with environmental conservation, flood risk, and economic/environmental policy research. My work covers the full geospatial workflow — from satellite image processing and spatial modeling to heavy data wrangling and building interactive dashboards.
			</p>

			<p className="text-slate-500 font-light leading-relaxed">
			  I started at <strong className="text-slate-700 font-medium">WWF-Pakistan</strong> as a GIS intern, worked up to GIS Officer, and now work as a <strong className="text-slate-700 font-medium">Research Associate at MHRC, Lahore University of Management and Sciences (LUMS)</strong>, while also volunteering as a researcher at the <strong className="text-slate-700 font-medium">GeoScape Analytics Lab (GSAL), University of the Punjab</strong>.
			</p>

			<p className="text-slate-500 font-light leading-relaxed">
			  Beyond maps and policy, I have a strong interest in art, sketching, and digital design. When I'm not working, I'm usually watching movies/series, playing with my cats, and raising my ducks.
			</p>
		  
            </div>

            {/* Skills quick list */}
            <div className="card p-6 backdrop-blur-sm">
              <div className="font-mono text-xs text-blue-500 tracking-widest uppercase mb-4 pb-3 border-b border-blue-50">
                Core Competencies
              </div>
              <ul className="space-y-2">
                {[
                  'Satellite image processing (Sentinel, Landsat, MODIS, VIIRS)',
                  'Flood inundation & risk modelling',
                  'LULC classification & change detection',
                  'Spatial clustering (HDBSCAN) & statistical analysis',
                  'Large dataset merging & mapping',
                  'PostgreSQL / Excel database management',
                  'Interactive dashboard development',
                  'Publication-quality cartography',
                ].map(s => (
                  <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-400 mt-0.5 shrink-0">›</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div {...fadeUp(0.2)} className="mt-16">
          <div className="section-label">Education</div>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Academic Background</h2>
          <div className="card p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-800">BS Geography</h3>
                <p className="font-mono text-xs text-slate-400 mt-0.5">University of the Punjab · Lahore, Pakistan</p>
                <p className="text-sm text-slate-500 mt-2 font-light">
                  {/* ── Add graduation year, GPA, thesis, etc. ── */}
                  Specialisation in GIS, Remote Sensing, and Environmental Geography.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
