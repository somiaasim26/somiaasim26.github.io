import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { blogPosts } from '../data/content'

// Blog post content — add your full markdown/html content here
const postContent = {
  'gee-flood-mapping': `
    <h2>Why Sentinel-1 SAR?</h2>
    <p>Optical imagery fails during cloud-covered monsoon conditions. Synthetic Aperture Radar (SAR) from Sentinel-1 penetrates cloud cover, making it ideal for near-real-time flood mapping during Pakistan's monsoon season.</p>
    <h2>Processing pipeline</h2>
    <p>The workflow begins with Sentinel-1 GRD image collection filtered to the August–September 2022 period. After applying a speckle filter and terrain correction, I computed the difference in backscatter values between pre-flood baseline composites and peak-flood imagery.</p>
    <p>A threshold of −3 dB relative to the baseline reliably distinguished open water from surrounding land cover across Sindh and Balochistan. The resulting binary flood masks were validated against UNOSAT and SUPARCO reference data.</p>
    <h2>Key findings</h2>
    <p>Roughly 6.4 million hectares showed inundation at peak flood extent. Sindh was hardest hit, with over 30% of agricultural land temporarily submerged.</p>
    <blockquote>The road network disruption model built on top of this flood layer identified 2,300+ supply route segments as severely impacted — findings that fed directly into a MHRC policy brief.</blockquote>
    <h2>Lessons learned</h2>
    <p>Temporal compositing matters enormously. A single Sentinel-1 overpass misses dynamic flood edges. I ended up blending 3-day mosaics to reduce noise while capturing peak extent. The GEE scale parameter also needs careful attention when working across large areas — defaulting to 10m causes memory errors at national scale.</p>
  `,
  'hdbscan-spatial': `
    <h2>The problem with K-means for spatial data</h2>
    <p>When clustering Pakistani districts by socioeconomic indicators, K-means forced me to pre-specify the number of clusters — a number I genuinely didn't know. It also struggled with the irregular spatial shapes of genuine economic clusters.</p>
    <h2>Why HDBSCAN?</h2>
    <p>HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise) finds clusters of arbitrary shape without requiring a pre-specified K. Crucially, it labels low-density points as noise rather than forcing them into a cluster — which is exactly the right behaviour for outlier districts.</p>
    <h2>Implementation</h2>
    <p>After standardising the feature matrix (GDP proxy, agricultural output, flood exposure index), I ran HDBSCAN with min_cluster_size=5 and min_samples=3. The result: 4 coherent regional economic clusters plus a noise class that captured genuinely anomalous FATA districts.</p>
  `,
  'fuzzy-matching-datasets': `
    <h2>The spelling problem</h2>
    <p>Pakistan's administrative data comes from dozens of agencies — each with their own transliteration conventions for Urdu district names. "Rahim Yar Khan" becomes "Rahim Yar Khan", "Rahimyar Khan", "R.Y. Khan", and half a dozen other variants.</p>
    <h2>rapidfuzz to the rescue</h2>
    <p>Using rapidfuzz's token_sort_ratio scorer, I matched 500,000 rows across two datasets in under 90 seconds — roughly 50x faster than fuzzywuzzy on the same machine. A threshold of 88 gave the best precision/recall trade-off after manual spot-checking 500 matched pairs.</p>
    <h2>Post-match validation</h2>
    <p>I joined the matched dataset back to administrative boundaries and visualised the spatial distribution of unmatched rows. Geographic clustering of failures revealed systematic naming differences for specific time periods rather than random errors — which led me to discover a boundary change in 2018 that had created entirely new district codes.</p>
  `,
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!post) return <Navigate to="/blog" replace />

  const content = postContent[id] || '<p>Full post coming soon. Check back later!</p>'

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </motion.div>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {/* Cover */}
          <div className="rounded-3xl overflow-hidden aspect-video bg-blue-50 mb-8">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
            <span className="flex items-center gap-1.5"><Calendar size={11} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime} read</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 border-l-4 border-blue-200 pl-5">
            {post.excerpt}
          </p>

          {/* Body */}
          <div
            className="prose prose-slate prose-blue max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-800
              prose-p:text-slate-600 prose-p:font-light prose-p:leading-relaxed
              prose-blockquote:border-blue-300 prose-blockquote:text-blue-700 prose-blockquote:bg-blue-50 prose-blockquote:rounded-xl prose-blockquote:py-1
              prose-strong:text-slate-700 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </motion.article>

        {/* Giscus comments */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-10 border-t border-blue-100"
        >
          <h3 className="font-display font-bold text-xl text-slate-800 mb-6">Comments</h3>
          {/*
            ── HOW TO ENABLE COMMENTS ──
            1. Go to https://giscus.app
            2. Enter your GitHub repo (e.g. somiaasim26/somiaasim26.github.io)
            3. Enable GitHub Discussions on the repo
            4. Copy the <script> tag giscus gives you and paste the data-* attributes below
          */}
          <div className="card p-6 text-center text-slate-400 text-sm">
            <p className="mb-2">💬 Comments powered by <strong className="text-blue-500">Giscus</strong></p>
            <p className="text-xs font-mono">
              To activate: go to <span className="text-blue-400">giscus.app</span>, configure your repo, then update <span className="text-blue-400">BlogPost.jsx</span> with the script tag.
            </p>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
