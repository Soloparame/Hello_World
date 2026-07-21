import { useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '../ui/Button'
import {
  CoverflowCarousel,
  useCoverflowSizing,
  type CoverflowHandle,
} from '../ui/CoverflowCarousel'
import { projects } from '../../lib/content'

type ProjectsSectionProps = {
  limit?: number
  showSeeMore?: boolean
  title?: string
}

export function ProjectsSection({
  limit = 5,
  showSeeMore = true,
  title = "Things we've brought to life.",
}: ProjectsSectionProps) {
  const list = projects.slice(0, limit)
  const sizing = useCoverflowSizing()
  const carouselRef = useRef<CoverflowHandle>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = list[activeIndex] ?? list[0]

  const coverflowItems = list.map((project) => {
    const colorMatch = project.accent.match(/\[([^\]]+)\]/)
    const color = colorMatch?.[1] ?? '#1a1a1a'
    return {
      src: project.image || '',
      alt: project.name,
      href: project.url,
      title: project.name,
      description: project.description,
      meta: `${project.category} · ${project.type}`,
      gradient: `linear-gradient(160deg, ${color}, #050505)`,
    }
  })

  return (
    <section id="work" className="py-24 bg-transparent border-t border-hw-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
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

        <div
          className="relative mx-auto max-w-6xl"
          style={{ height: sizing.stageHeight }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b1ff00]/6 blur-[90px]"
          />
          <CoverflowCarousel
            ref={carouselRef}
            items={coverflowItems}
            activeWidth={sizing.activeWidth}
            activeHeight={sizing.activeHeight}
            restWidth={sizing.restWidth}
            restHeight={sizing.restHeight}
            gap={sizing.gap}
            radius={10}
            showArrows
            autoplay={list.length > 1}
            moveDuration={0.7}
            dwell={4}
            onActiveChange={setActiveIndex}
          />
        </div>

        {/* Mobile / tablet: keep description under the carousel */}
        <div className="mx-auto mt-8 max-w-2xl text-center min-h-[170px] lg:hidden">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <div className="mb-3 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-hw-muted">
                  <span>{active.category}</span>
                  <span className="text-hw-border">&bull;</span>
                  <span>{active.type}</span>
                  <span className="text-hw-border">&bull;</span>
                  <span className="text-hw-accent">{active.domain}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                  {active.name}
                </h3>
                <p className="text-sm text-hw-muted font-light leading-relaxed mb-5">
                  {active.description}
                </p>
                <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                  {active.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hw-border/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-hw-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-hw-accent/35 bg-[#b1ff00]/8 px-4 py-2.5 text-sm font-medium text-hw-accent transition-colors hover:bg-[#b1ff00]/14"
                >
                  Visit live site
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {list.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Show ${project.name}`}
              onClick={() => carouselRef.current?.goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-hw-accent'
                  : 'w-1.5 bg-hw-border hover:bg-hw-muted'
              }`}
            />
          ))}
        </div>

        {showSeeMore && limit < projects.length && (
          <div className="mt-10 flex justify-center">
            <Link
              to="/projects"
              className="text-sm font-mono uppercase tracking-wider text-hw-accent hover:underline"
            >
              View all {projects.length} projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
