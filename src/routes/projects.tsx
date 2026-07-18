import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageShell } from '../components/layout/PageShell'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { ContactSection } from '../components/sections/ContactSection'
import { Button } from '../components/ui/Button'
import { projects } from '../lib/content'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pb-8 pt-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-hw-accent animate-pulse" />
              ALL PROJECTS · {String(projects.length).padStart(2, '0')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Every product we&apos;ve <span className="text-hw-accent">shipped live.</span>
            </h1>
            <p className="text-lg text-hw-muted font-light leading-relaxed mb-8 max-w-2xl">
              From cafés and clinics to hosting infrastructure and AI suites — explore the full Hello World portfolio.
            </p>
            <Link to="/">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Back home
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <ProjectsSection limit={projects.length} showSeeMore={false} title="Full portfolio." />
      <ContactSection />
    </PageShell>
  )
}
