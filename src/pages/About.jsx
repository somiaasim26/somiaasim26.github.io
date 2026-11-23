import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, BookOpen, Briefcase, ArrowRight } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { focusAreas } from '../data/research'

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
			Researcher.
			<span className="text-2xl sm:text-3xl block font-normal text-slate-500 mt-1 mb-2">
			  Floods, water &amp; agriculture
			</span>
			<span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
			  GIS &amp; Remote Sensing.
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
                { icon: <Briefcase size={14} />, text: 'Research Associate · GIS & Remote Sensing' },
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
			  I'm a GIS &amp; remote sensing researcher. I use <strong className="text-slate-800 font-semibold">satellite data, spatial analysis and machine learning</strong> to study floods, water stress and agriculture in Pakistan, and to support environmental and policy research. My work covers the full workflow, from satellite image processing and spatial modelling to large-scale data engineering and interactive dashboards.
			</p>

			<p className="text-slate-500 font-light leading-relaxed">
			  I started at <strong className="text-slate-700 font-medium">WWF-Pakistan</strong> as a GIS intern and worked up to GIS Officer, mapping land-cover change and the 2022 floods. I now work as a <strong className="text-slate-700 font-medium">Research Associate at the Mahbub ul Haq Research Centre, Lahore University of Management Sciences (LUMS)</strong>. There I built the satellite flood inputs for an IGC study of how the 2022 floods disrupted agricultural supply, and I now run the spatial data infrastructure for a tax-compliance programme with the Punjab Revenue Authority.
			</p>

			<p className="text-slate-500 font-light leading-relaxed">
			  I also volunteer as a researcher at the <strong className="text-slate-700 font-medium">GeoScape Analytics Lab, University of the Punjab</strong>, on a GRACE groundwater review, a Lahore population-mapping study and a Late Jurassic dispersal analysis. I am now looking to deepen this work in a graduate research programme in Earth and environmental science.
			</p>

			<Link to="/research" className="inline-flex items-center gap-2 font-mono text-sm text-blue-600 hover:text-blue-800 no-underline">
			  See the research <ArrowRight size={14} />
			</Link>

			<p className="text-slate-500 font-light leading-relaxed">
			  Beyond maps and policy, I have a strong interest in art, sketching, and digital design. When I'm not working, I'm usually watching movies/series, playing with my cats, and raising my ducks.
			</p>
		  
            </div>

            {/* Focus areas */}
            <div className="card p-6 backdrop-blur-sm">
              <div className="font-mono text-xs text-blue-500 tracking-widest uppercase mb-4 pb-3 border-b border-blue-50">
                Research Focus
              </div>
              <ul className="space-y-3">
                {focusAreas.map(f => (
                  <li key={f.title} className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">{f.title}.</span> {f.desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills quick list */}
            <div className="card p-6 backdrop-blur-sm">
              <div className="font-mono text-xs text-blue-500 tracking-widest uppercase mb-4 pb-3 border-b border-blue-50">
                Core Competencies
              </div>
              <ul className="space-y-2">
                {[
                  'Satellite image processing (Google Earth Engine, Sentinel-1/2, Landsat, MODIS, NOAA VIIRS)',
                  'Flood inundation mapping and hazard modelling',
                  'Drought and vegetation indices (VCI, TCI, VHI, NDDI, DSI)',
                  'Crop monitoring with cropland-masked NDVI',
                  'Hydrological modelling and watershed delineation',
                  'Random Forest, MaxEnt and cross-validated spatial models',
                  'Land-cover classification and change detection',
                  'HDBSCAN / OPTICS clustering and spatial data quality assurance',
                  'Large dataset linkage and PostgreSQL / PostGIS pipelines',
                  'Interactive dashboards and web mapping',
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
          <div className="space-y-4">
            <div className="card p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-800">BS Geography</h3>
                  <p className="font-mono text-xs text-slate-400 mt-0.5">University of the Punjab · Lahore, Pakistan · 2018–2022 · CGPA 3.73 / 4.00</p>
                  <p className="text-sm text-slate-500 mt-2 font-light">
                    Coursework: Remote Sensing, GIS, Computer Mapping, Hydro Geography, Climatology, Geomorphology, Mathematics (Calculus and Algebra) and Statistics.
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-800">Summer School: From Data to Decisions</h3>
                  <p className="font-mono text-xs text-slate-400 mt-0.5">Institute of Geography, University of the Punjab · 2025</p>
                  <p className="text-sm text-slate-500 mt-2 font-light">Cloud computing and artificial intelligence applied to geospatial data.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* English proficiency */}
        <motion.div {...fadeUp(0.25)} className="mt-14">
          <div className="section-label">Language</div>
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">English Proficiency</h2>
          <div className="card p-6 backdrop-blur-sm">
            <div className="flex flex-wrap items-end gap-x-10 gap-y-5">
              <div>
                <div className="font-mono text-xs text-slate-400 tracking-widest uppercase mb-1">IELTS Academic · 28 Feb 2026</div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl font-extrabold bg-gradient-to-br from-blue-500 to-blue-800 bg-clip-text text-transparent">7.0</span>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Overall</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 flex-1 min-w-[260px] max-w-md">
                {[['Listening', '7.5'], ['Reading', '7.0'], ['Writing', '6.5'], ['Speaking', '7.0']].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-blue-50/70 border border-blue-100 px-3 py-3 text-center">
                    <div className="font-display text-xl font-bold text-slate-800">{v}</div>
                    <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{k}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500 font-light">Urdu (native) · English (fluent)</p>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  )
}
