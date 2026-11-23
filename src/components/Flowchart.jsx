import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const kinds = {
  input:   'bg-blue-50 border-blue-200 text-blue-900',
  process: 'bg-white border-slate-200 text-slate-800',
  output:  'bg-emerald-50 border-emerald-200 text-emerald-900',
  planned: 'bg-amber-50 border-amber-300 border-dashed text-amber-900',
}

export default function Flowchart({ phases }) {
  return (
    <div className="space-y-1">
      {phases.map((ph, pi) => (
        <div key={ph.label}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: pi * 0.05, duration: 0.45 }}
            className="grid sm:grid-cols-[92px_1fr] gap-3 items-stretch rounded-xl bg-slate-50/80 border border-slate-100 p-3"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400 self-center">{ph.label}</div>
            <div className="flex flex-wrap gap-2">
              {ph.nodes.map(n => (
                <div
                  key={n.text}
                  className={`flex-1 min-w-[150px] rounded-lg border px-3 py-2 text-xs leading-snug ${kinds[n.kind || 'process']}`}
                >
                  {n.text}
                </div>
              ))}
            </div>
          </motion.div>
          {pi < phases.length - 1 && (
            <div className="flex justify-center py-0.5 text-blue-300"><ArrowDown size={14} /></div>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-4 pt-3 font-mono text-[10px] text-slate-400">
        <span><i className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-100 border border-blue-300 mr-1.5 align-middle" />Input</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-sm bg-white border border-slate-300 mr-1.5 align-middle" />Step</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300 mr-1.5 align-middle" />Output</span>
        <span><i className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-50 border border-dashed border-amber-400 mr-1.5 align-middle" />Planned</span>
      </div>
    </div>
  )
}
