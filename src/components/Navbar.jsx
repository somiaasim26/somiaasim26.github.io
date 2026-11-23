import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',           label: 'Home'       },
  { to: '/about',      label: 'About'      },
  { to: '/experience', label: 'Experience' },
  { to: '/research',   label: 'Research'   },
  { to: '/skills',     label: 'Skills'     },
  { to: '/work',       label: 'Work'       },
  { to: '/blog',       label: 'Blog'       },
  { to: '/community',  label: 'Community'  },
  { to: '/likes',      label: 'Likes'      },
  { to: '/contact',    label: 'Contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-blue-100/60' : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(240,247,255,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(59,130,246,0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="font-mono text-sm font-bold text-blue-600 tracking-wider hover:text-blue-700 transition-colors">
            somia.asim
          </NavLink>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'}>
                  {({ isActive }) => (
                    <div className="relative px-3 py-1.5">
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-blue-50 border border-blue-100"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className={`relative text-sm font-medium transition-colors duration-150 ${
                        isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                      }`}>
                        {label}
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(59,130,246,0.12)',
            }}
          >
            <ul className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
