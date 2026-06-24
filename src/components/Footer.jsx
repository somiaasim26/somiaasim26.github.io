import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-blue-100 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-400">
          © 2025 <span className="text-blue-500 font-semibold">Somia Asim</span> — Lahore, Pakistan
        </p>
        <div className="flex items-center gap-4">
          <a href="mailto:somiaasim26@gmail.com" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="Email">
            <Mail size={16} />
          </a>
          <a href="https://www.linkedin.com/in/somia-asim-566483390" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="https://github.com/somiaasim26" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="GitHub">
            <Github size={16} />
          </a>
        </div>
        <p className="font-mono text-xs text-slate-400">
          Built with <span className="text-blue-400">♥</span> &amp; vibe coding
        </p>
      </div>
    </footer>
  )
}
