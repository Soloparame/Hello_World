import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { teamMembers } from '../../lib/content'

export function TeamSection() {
  return (
    <section id="team" className="relative z-30 py-24 bg-transparent border-t border-hw-border">
      <div className="container mx-auto px-6 relative z-30">
        <div className="mb-14 max-w-2xl flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
              <span>TEAM</span>
              <span className="text-hw-muted">&bull;</span>
              <span>02</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              The people behind the <span className="text-hw-accent">build.</span>
            </h2>
            <p className="text-lg text-hw-muted font-light leading-relaxed">
              A tight leadership pair spanning strategy, product, and engineering — building digital products that ship and stay alive.
            </p>
          </div>
          <Link to="/team">
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-hw-accent hover:underline">
              Full team page <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
            >
              <Link
                to="/team"
                className="group block rounded-2xl border border-hw-border bg-hw-card overflow-hidden hover:border-hw-accent/40 transition-colors relative z-30"
              >
                <div className="aspect-[4/5] overflow-hidden bg-black relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-hw-accent mb-2">
                      {member.title}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-hw-muted">{member.role}</p>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between border-t border-hw-border bg-hw-card">
                  <span className="text-sm text-hw-muted group-hover:text-white transition-colors">View team page</span>
                  <span className="w-9 h-9 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-hw-accent group-hover:text-hw-bg group-hover:border-hw-accent transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
