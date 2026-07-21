import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Figma } from 'lucide-react'
import {
  CoverflowCarousel,
  useCoverflowSizing,
  type CoverflowHandle,
} from '../ui/CoverflowCarousel'
import { figmaWorks } from '../../lib/content'

export function FigmaSection() {
  const sizing = useCoverflowSizing()
  const carouselRef = useRef<CoverflowHandle>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = figmaWorks[activeIndex] ?? figmaWorks[0]

  const coverflowItems = figmaWorks.map((work) => ({
    src: work.image || '',
    alt: work.name,
    href: work.url,
    title: work.name,
    description: work.description,
    meta: `${work.category ?? 'UI / UX'} · ${work.status}`,
    gradient: 'linear-gradient(160deg, #1a1030, #050505)',
  }))

  return (
    <section id="design" className="py-24 bg-transparent border-t border-hw-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-10 md:mb-14 max-w-2xl">
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
            autoplay={figmaWorks.length > 1}
            moveDuration={0.7}
            dwell={4}
            onActiveChange={setActiveIndex}
          />
        </div>

        {/* Mobile / tablet: description under the carousel */}
        <div className="mx-auto mt-8 max-w-2xl text-center min-h-[150px] lg:hidden">
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
                  <Figma className="w-3 h-3 text-hw-accent" />
                  <span>{active.category ?? 'UI / UX'}</span>
                  <span className="text-hw-border">&bull;</span>
                  <span className="text-hw-accent">{active.status}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                  {active.name}
                </h3>
                <p className="text-sm text-hw-muted font-light leading-relaxed mb-5">
                  {active.description}
                </p>
                {active.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-hw-accent/35 bg-[#b1ff00]/8 px-4 py-2.5 text-sm font-medium text-hw-accent transition-colors hover:bg-[#b1ff00]/14"
                  >
                    Open in Figma
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {figmaWorks.map((work, index) => (
            <button
              key={work.id}
              type="button"
              aria-label={`Show ${work.name}`}
              onClick={() => carouselRef.current?.goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-8 bg-hw-accent'
                  : 'w-1.5 bg-hw-border hover:bg-hw-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
