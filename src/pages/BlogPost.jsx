import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { useEffect, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import { blogPosts } from '../data/content'

// Blog post content — add your full markdown/html content here
const postContent = {
  'kowloon-nightgrid': `
    <h2>What is this?</h2>
    <p>The Kowloon Night Grid is a cinematic 3D visualization of Kowloon, Hong Kong — built entirely from OpenStreetMap building footprints and road networks, rendered as a glowing sci-fi city in a single self-contained HTML file. No server, no npm install, no build step to view it. Just open the file in a browser.</p>
    <p>The same pipeline has produced versions of Manhattan, Lahore, and Islamabad. This post walks through exactly how it works, step by step.</p>

    <h2>The pipeline at a glance</h2>
    <p>The full workflow is four steps:</p>
    <blockquote>Pick a bounding box → Pull OSM data (Python/osmnx) → Hand data + prompt to Claude → Open the HTML file</blockquote>
    <p>Claude does the heavy lifting in step three: it inspects the GeoJSON data, writes a Python packing script, then generates the entire self-contained HTML — geometry, shaders, libraries and all — as a single file you can drop anywhere.</p>

    <h2>Step 1: Define your bounding box</h2>
    <p>Everything starts with a bounding box — four coordinates (north, south, east, west) that define your city area. For Kowloon I used a tight rectangle covering the dense urban core. The easiest way to get exact corners is right-click → "What's here?" on Google Maps, or use bboxfinder.com to draw a box visually.</p>
    <p>The tighter the box, the faster the data pull and the more focused the visualization. For a dense area like Kowloon, a roughly 2×2 km box gives you enough buildings to feel like a city without overwhelming the renderer.</p>

    <h2>Step 2: Pull OSM data with osmnx</h2>
    <p>The <code>scripts/download_data.py</code> script uses the <strong>osmnx</strong> Python library to fetch two things from OpenStreetMap: building footprints (polygons, with height or building:levels where tagged) and the drivable road network (line segments). You just set the bounding box at the top of the script and run it.</p>
    <pre><code>pip install osmnx geopandas shapely
python scripts/download_data.py</code></pre>
    <p>This outputs two GeoJSON files: <code>{key}_buildings.geojson</code> and <code>{key}_roads.geojson</code>. Before moving to the next step, reproject both to the local UTM zone (meters, not lat/lon) — the visualization assumes projected coordinates for accurate proportions.</p>
    <pre><code>gdf = gdf.to_crs("EPSG:32650")  # UTM zone 50N for Hong Kong</code></pre>

    <h2>Step 3: Claude generates the visualization</h2>
    <p>This is where the magic happens. Zip both GeoJSON files, upload them to Claude along with the prompt template from <code>PROMPT.md</code> (swapping in your city name, EPSG code, and an appropriate camera distance). Claude then:</p>
    <p>Inspects the data — counting features, checking the CRS, examining what height properties are available. Writes a Python packing script that quantizes coordinates and encodes everything (geometry, colors, heights) into compact base64 typed arrays. Inlines Three.js r147, OrbitControls, EffectComposer, UnrealBloomPass, and the earcut triangulation library directly into the HTML — so there are zero runtime network dependencies. Builds the buildings as a single merged mesh with baked vertex-color lighting (height → color ramp from deep navy to cyan), roads as a neon line layer on top, then applies custom GLSL shaders: scanlines, Fresnel rim glow, a radial "city pulse" wave that expands outward from the center, and a rotating radar sweep. Smoke-tests the packed data (vertex and segment count consistency, finite heights) before returning the file.</p>
    <p>The result is a ~2.6 MB HTML file with everything baked in. You can email it, host it on GitHub Pages, or just open it locally — it works in all three.</p>

    <h2>Step 4: View it</h2>
    <p>Open the HTML file in any modern browser. No install, no server. The controls are:</p>
    <p><strong>Drag</strong> to rotate and tilt · <strong>Right-drag</strong> to pan · <strong>Scroll</strong> to zoom · The panel in the top-left lets you toggle bloom glow, floor scanlines, window lights, city pulse, and the radar sweep independently.</p>

    <h2>Making it for a new city</h2>
    <p>To adapt the pipeline for any other city, change four things in <code>download_data.py</code>: the <code>north/south/east/west</code> bounding box, the <code>key</code> string (used as the output filename prefix), and the EPSG code for the local UTM zone. Then update the city name and EPSG in the <code>PROMPT.md</code> template before uploading to Claude. That's it — the pipeline is fully reusable.</p>

    <h2>Tech stack</h2>
    <p>OSM data via <strong>osmnx</strong> · geometry packing with <strong>numpy, struct, base64</strong> in Python · rendered with <strong>Three.js r147</strong> (WebGL) and custom GLSL shaders · post-processing via <strong>EffectComposer / UnrealBloomPass</strong> for the bloom glow · roof triangulation via <strong>earcut</strong> · building and road data © OpenStreetMap contributors, ODbL license.</p>
    <p>The full repo — including the packing script, the reusable prompt template, and the finished Kowloon file — is on <a href="https://github.com/somiaasim26/kowloon-nightgrid-" target="_blank" rel="noreferrer">GitHub</a>.</p>
  `,
  'gee-flood-mapping': `
    <h2>Why Sentinel-1 SAR?</h2>
    <p>Optical imagery fails during cloud-covered monsoon conditions. Synthetic Aperture Radar (SAR) from Sentinel-1 penetrates cloud cover, making it ideal for near-real-time flood mapping during Pakistan's monsoon season.</p>
    <h2>Processing pipeline</h2>
    <p>The workflow begins with Sentinel-1 GRD image collection filtered to the August–September 2022 period. After applying a speckle filter and terrain correction, I computed the difference in backscatter values between pre-flood baseline composites and peak-flood imagery.</p>
    <p>A threshold of −3 dB relative to the baseline reliably distinguished open water from surrounding land cover across Sindh and Balochistan. The resulting binary flood masks were validated against UNOSAT and SUPARCO reference data.</p>
    <h2>Key findings</h2>
    <p>Roughly 6.4 million hectares showed inundation at peak flood extent. Sindh was hardest hit, with over 30% of agricultural land temporarily submerged.</p>
    <blockquote>Analysis was done during my time as GIS Officer at the Richard Garstang Conservation GIS Lab, WWF-Pakistan (2022–2024).</blockquote>
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

function GiscusComments() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('script')) return
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'somiaasim26/somiaasim26.github.io')
    script.setAttribute('data-repo-id', 'R_kgDOTEGskg')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOTEGsks4C_1GX')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'en')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
  }, [])

  return <div ref={ref} />
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
          <GiscusComments />
        </motion.div>
      </div>
    </PageWrapper>
  )
}
