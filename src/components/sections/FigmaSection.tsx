import { motion } from 'framer-motion'
import { ExternalLink, Figma } from 'lucide-react'
import { figmaWorks } from '../../lib/content'

export function FigmaSection() {
  return (
    <section id="design" className="py-24 bg-transparent border-t border-hw-border">
      <div className="container mx-auto px-6">
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
            <span>UI / UX</span>
            <span className="text-hw-muted">&bull;</span>
            <span>FIGMA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Design systems in <span className="text-hw-accent">Figma.</span>
          </h2>
          <p className="text-lg text-hw-muted font-light leading-relaxed">
            Product interfaces and brand systems crafted before a single line of production code ships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {figmaWorks.map((work, index) => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-hw-border bg-hw-card overflow-hidden hover:border-hw-accent/35 transition-colors h-full"
              >
                {work.image && (
                  <div className="h-48 overflow-hidden border-b border-hw-border">
                    <img
                      src={work.image}
                      alt={work.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl border border-hw-border bg-black/40 flex items-center justify-center text-hw-accent">
                      <Figma className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-hw-muted">{work.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{work.name}</h3>
                  <p className="text-sm text-hw-muted mb-6">{work.status}</p>
                  <div className="flex items-center gap-2 text-sm text-hw-accent font-mono uppercase tracking-wider">
                    Open in Figma <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
