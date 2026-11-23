import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

export default function Community() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="section-label">Community</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Plantation{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">drive.</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="card overflow-hidden backdrop-blur-sm">
          <video
            controls
            playsInline
            preload="metadata"
            poster="./assets/videos/plantation-drive-poster.jpg"
            className="w-full bg-black aspect-video"
          >
            <source src="./assets/videos/plantation-drive.mp4" type="video/mp4" />
          </video>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-widest text-emerald-600">
              <Sprout size={14} /> Started June 2024 · Lahore
            </div>
            <p className="text-slate-600 font-light leading-relaxed">
              In June 2024 I started a tree-planting drive in my society in Lahore. I asked the children and elders
              of the society to plant one tree each around their homes, paid for the plants myself, and talked with
              them about why green space matters. About 100 plants went in, and they are flourishing.
            </p>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
