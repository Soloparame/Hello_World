import React from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '../ui/Button'
import { projects, type Project } from '../../lib/content'

type ProjectsSectionProps = {
  limit?: number
  showSeeMore?: boolean
  title?: string
}

function ProjectCard({
  project,
  large = false,
}: {
  project: Project
  large?: boolean
}) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`group block h-full ${large ? 'lg:col-span-8' : ''}`}
    >
      <div
        data-project-card
        className={`project-card rounded-2xl border border-hw-border bg-hw-card overflow-hidden flex flex-col relative h-full ${
          large ? 'min-h-[420px] md:min-h-[500px]' : 'min-h-[240px]'
        }`}
      >
        <div className={`relative overflow-hidden ${large ? 'h-[280px] md:h-[340px]' : 'h-[160px] md:h-[180px]'}`}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${project.accent} to-hw-card`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-hw-card via-transparent to-black/20" />
          <div className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white/70 backdrop-blur-sm">
            {project.domain}
          </div>
        </div>

        <div className="p-5 md:p-6 border-t border-hw-border bg-hw-card relative z-10 flex items-center justify-between gap-4 flex-1">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-hw-muted uppercase tracking-wider mb-1">
              <span>{project.category}</span>
              <span>&bull;</span>
              <span>{project.type}</span>
            </div>
            <h3 className={`font-bold text-white ${large ? 'text-xl' : 'text-lg'}`}>{project.name}</h3>
            {project.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full border border-hw-border/50 text-[10px] font-mono text-hw-muted uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="w-9 h-9 shrink-0 rounded-full border border-hw-border flex items-center justify-center text-hw-muted group-hover:bg-hw-accent group-hover:text-hw-bg group-hover:border-hw-accent transition-all duration-300">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export function ProjectsSection({
  limit = 5,
  showSeeMore = true,
  title = "Things we've brought to life.",
}: ProjectsSectionProps) {
  const list = projects.slice(0, limit)
  const featured = list[0]
  const secondary = list.slice(1)

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('[data-project-card]')
    if (!card) return
    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`)
    card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`)
    card.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -2.2}deg`)
    card.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2.2}deg`)
  }

  return (
    <section id="work" onPointerMove={handlePointerMove} className="py-24 bg-transparent border-t border-hw-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
              <span>SELECTED WORK</span>
              <span className="text-hw-muted">&bull;</span>
              <span>{String(list.length).padStart(2, '0')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {title.includes('brought') ? (
                <>
                  Things we&apos;ve <span className="text-hw-accent">brought to life.</span>
                </>
              ) : (
                title
              )}
            </h2>
          </div>
          {showSeeMore && (
            <Link to="/projects">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                See more
              </Button>
            </Link>
          )}
        </div>

        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <ProjectCard project={featured} large />
            <div className="lg:col-span-4 flex flex-col gap-6 h-full">
              {secondary.slice(0, 2).map((project) => (
                <div key={project.id} className="flex-1 min-h-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {secondary.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {secondary.slice(2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {showSeeMore && limit < projects.length && (
          <div className="mt-10 flex justify-center">
            <Link to="/projects" className="text-sm font-mono uppercase tracking-wider text-hw-accent hover:underline">
              View all {projects.length} projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
