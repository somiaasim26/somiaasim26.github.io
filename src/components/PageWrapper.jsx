import { motion } from 'framer-motion'

export default function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 pt-24 pb-16 min-h-screen"
    >
      {children}
    </motion.main>
  )
}
