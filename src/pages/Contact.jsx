import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-label">Contact</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Let's{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              connect.
            </span>
          </h1>
          <p className="mt-4 text-slate-500 font-light max-w-md">
            Send me a message — I'd love to hear from you.
          </p>

          {/* LinkedIn only */}
          <a
            href="https://www.linkedin.com/in/somia-asim-566483390"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            <Linkedin size={16} /> somia-asim-566483390
          </a>
        </motion.div>

        {/* Form — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="card p-7 space-y-5 backdrop-blur-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1.5 tracking-wide" htmlFor="name">
                  Name <span className="text-blue-400">*</span>
                </label>
                <input
                  id="name" name="from_name" required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-blue-50/50
                    text-slate-800 text-sm placeholder:text-slate-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1.5 tracking-wide" htmlFor="email">
                  Email <span className="text-blue-400">*</span>
                </label>
                <input
                  id="email" name="from_email" type="email" required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-blue-50/50
                    text-slate-800 text-sm placeholder:text-slate-300
                    focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1.5 tracking-wide" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject" name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-blue-50/50
                  text-slate-800 text-sm placeholder:text-slate-300
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1.5 tracking-wide" htmlFor="message">
                Message <span className="text-blue-400">*</span>
              </label>
              <textarea
                id="message" name="message" required rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, research idea, or just say hi..."
                className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-blue-50/50
                  text-slate-800 text-sm placeholder:text-slate-300 resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
              />
            </div>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 rounded-xl px-4 py-3 border border-emerald-100">
                <CheckCircle size={16} /> Message sent! I'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                <AlertCircle size={16} /> Something went wrong. Please try again.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <><Send size={15} /> Send Message</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
