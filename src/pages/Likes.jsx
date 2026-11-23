import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { likes } from '../data/content'

export const things = [
  { emoji: '🎨', label: 'Digital Art' },
  { emoji: '✈️', label: 'Travel' },
  { emoji: '🦆', label: 'Pets (Cats & Ducks)' },
]

export default function Likes() {
  const [lightbox, setLightbox] = useState(null) // { img, label }

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <div className="section-label">What I Like</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Beyond the{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              maps.
            </span>
          </h1>
          <p className="mt-4 text-slate-500 font-light max-w-lg">
            A peek into the things that make me tick when I'm not staring at satellite imagery.
          </p>
        </motion.div>

        {/* Quick interest chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-14"
        >
          {things.map(({ emoji, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="card px-4 py-2.5 flex items-center gap-2 cursor-default"
            >
              <span className="text-lg">{emoji}</span>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Photo galleries by category */}
        {likes.map(({ category, items }, gi) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1 }}
            className="mb-12"
          >
            <div className="section-label">{category}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {items.map(({ label, img }, ii) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: ii * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="card overflow-hidden group cursor-pointer"
                  onClick={() => setLightbox({ img, label })}
                >
                  <div className="aspect-square bg-blue-50 overflow-hidden">
                    <img
                      src={img}
                      alt={label}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                      onError={e => {
                        e.target.style.display = 'none'
                        e.target.parentElement.style.background = 'linear-gradient(135deg,#EFF6FF,#DBEAFE)'
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-slate-600">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Video section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="section-label">Moments</div>
          <div className="mt-4 card overflow-hidden">
            <video
              src="./assets/photos/plantation-driv.mp4"
              controls
              playsInline
              className="w-full rounded-2xl"
              style={{ maxHeight: '480px', background: '#EFF6FF' }}
            >
              Your browser does not support video playback.
            </video>
            <div className="p-3">
              <p className="text-xs font-medium text-slate-600">Plantation Drive</p>
            </div>
          </div>
        </motion.section>

        {/* Quote */}
        {/* A little quote */}
		<motion.div
		  initial={{ opacity: 0, y: 20 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  className="card p-8 text-center mt-8"
		  style={{ background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)' }}
		>
		  <p className="font-display text-xl font-bold text-slate-800 leading-relaxed">
			"Study the science of art. Study the art of science. Develop your senses—learn how to see. Realize that everything connects to everything else."
		  </p>
		  <p className="mt-3 font-mono text-xs text-blue-500 tracking-wider">— Leonardo da Vinci</p>
		</motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={lightbox.img}
                alt={lightbox.label}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />
              <p className="mt-3 text-center text-sm text-white/70 font-medium">{lightbox.label}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
