import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageShell } from '../components/layout/PageShell'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { ContactSection } from '../components/sections/ContactSection'
import { Button } from '../components/ui/Button'
import { teamMembers } from '../lib/content'

export const Route = createFileRoute('/team')({
  component: TeamPage,
})

function TeamPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pb-10 pt-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mb-16"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-hw-accent animate-pulse" />
              TEAM · LEADERSHIP
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Meet the people behind <span className="text-hw-accent">Hello World.</span>
            </h1>
            <p className="text-lg text-hw-muted font-light leading-relaxed mb-8 max-w-2xl">
              Strategy and engineering in one tight leadership pair — shipping digital products that perform.
            </p>
            <Link to="/">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Back home
              </Button>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.slug}
                id={member.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-hw-accent mb-3">
                    {String(index + 1).padStart(2, '0')} · {member.title}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
                    {member.name}
                  </h2>
                  <p className="text-xl text-hw-accent font-medium mb-5">{member.role}</p>
                  <p className="text-lg text-hw-muted font-light leading-relaxed mb-7 max-w-xl">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {member.focus.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full border border-hw-border text-[11px] font-mono uppercase tracking-wider text-hw-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <a href="/#contact">
                    <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      Work with us
                    </Button>
                  </a>
                </div>

                <div className="relative">
                  <div className="rounded-3xl border border-hw-border overflow-hidden bg-hw-card shadow-[0_0_60px_rgba(177,255,0,0.08)]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full aspect-[4/5] object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-6 right-6 rounded-2xl border border-hw-border bg-hw-bg/90 backdrop-blur-md px-5 py-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-hw-accent mb-1">
                      {member.title}
                    </div>
                    <div className="text-white font-semibold">Hello World · Leadership</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection limit={5} showSeeMore title="Selected work with the team." />
      <ContactSection />
    </PageShell>
  )
}
