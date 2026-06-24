import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { blogPosts } from '../data/content'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Blog() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="section-label">Blog</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Thoughts on{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              geo &amp; data.
            </span>
          </h1>
          <p className="mt-4 text-slate-500 font-light max-w-lg">
            Deep dives into GIS workflows, remote sensing techniques, and data science for spatial problems.
          </p>
        </motion.div>

        {/* Featured post */}
        {blogPosts[0] && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Link to={`/blog/${blogPosts[0].id}`}>
              <div className="card overflow-hidden group">
                <div className="relative h-52 sm:h-72 bg-blue-50 overflow-hidden">
                  <img
                    src={blogPosts[0].cover}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 tag-chip bg-blue-500 text-white border-blue-500 text-xs">Featured</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} />{blogPosts[0].readTime}</span>
                    <span>{formatDate(blogPosts[0].date)}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {blogPosts[0].tags.map(t => (
                        <span key={t} className="tag-chip text-xs">{t}</span>
                      ))}
                    </div>
                    <span className="text-blue-500 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other posts */}
        <div className="space-y-5">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/blog/${post.id}`}>
                <div className="card p-5 group flex gap-5 items-start">
                  <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-blue-50 shrink-0">
                    <img
                      src={post.cover}
                      alt=""
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-400"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-1.5">
                      <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="font-display font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-light line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map(t => (
                        <span key={t} className="font-mono text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
