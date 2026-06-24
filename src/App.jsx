import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Background3D from './components/Background3D'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home       from './pages/Home'
import About      from './pages/About'
import Experience from './pages/Experience'
import Skills     from './pages/Skills'
import Work       from './pages/Work'
import Blog       from './pages/Blog'
import BlogPost   from './pages/BlogPost'
import Likes      from './pages/Likes'
import Contact    from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills"     element={<Skills />} />
        <Route path="/work"       element={<Work />} />
        <Route path="/blog"       element={<Blog />} />
        <Route path="/blog/:id"   element={<BlogPost />} />
        <Route path="/likes"      element={<Likes />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Background3D />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  )
}
