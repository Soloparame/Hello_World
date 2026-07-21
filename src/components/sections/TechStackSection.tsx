import { RoundCarousel, useRoundCarouselSizing } from '../ui/RoundCarousel'

const technologies = [
  {
    name: 'React',
    category: 'LIBRARY',
    logo: 'https://cdn.simpleicons.org/react/61DAFB',
  },
  {
    name: 'Next.js',
    category: 'FRAMEWORK',
    logo: 'https://cdn.simpleicons.org/nextdotjs/ffffff',
  },
  {
    name: 'Node.js',
    category: 'RUNTIME',
    logo: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  },
  {
    name: 'Git',
    category: 'VCS',
    logo: 'https://cdn.simpleicons.org/git/F05032',
  },
  {
    name: 'Supabase',
    category: 'BACKEND',
    logo: 'https://cdn.simpleicons.org/supabase/3FCF8E',
  },
  {
    name: 'Vercel',
    category: 'DEPLOY',
    logo: 'https://cdn.simpleicons.org/vercel/ffffff',
  },
  {
    name: 'PostgreSQL',
    category: 'DATABASE',
    logo: 'https://cdn.simpleicons.org/postgresql/4169E1',
  },
  {
    name: 'MongoDB',
    category: 'DATABASE',
    logo: 'https://cdn.simpleicons.org/mongodb/47A248',
  },
  {
    name: 'TypeScript',
    category: 'LANGUAGE',
    logo: 'https://cdn.simpleicons.org/typescript/3178C6',
  },
  {
    name: 'Docker',
    category: 'DEVOPS',
    logo: 'https://cdn.simpleicons.org/docker/2496ED',
  },
  {
    name: 'Figma',
    category: 'DESIGN',
    logo: 'https://cdn.simpleicons.org/figma/F24E1E',
  },
  {
    name: 'Tailwind',
    category: 'STYLING',
    logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  },
]

export function TechStackSection() {
  const sizing = useRoundCarouselSizing()

  return (
    <section className="relative overflow-hidden border-t border-hw-border bg-transparent py-14 md:py-20 lg:py-24">
      <div className="container mx-auto px-5 md:px-6">
        <div className="mb-8 max-w-2xl md:mb-12 lg:mb-14">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-hw-accent md:mb-4 md:text-xs">
            <span>TECHNOLOGY</span>
            <span className="text-hw-muted">&bull;</span>
            <span>ECOSYSTEM</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:mb-6 md:text-5xl">
            A curated stack, connected as a <span className="text-hw-accent">single system.</span>
          </h2>
          <p className="text-sm font-light leading-relaxed text-hw-muted sm:text-base md:text-lg">
            Drag the ring or let it spin — every tool here is one we ship with in production.
          </p>
        </div>
      </div>

      <div
        className="relative mx-auto w-full max-w-6xl px-2 sm:px-4"
        style={{ height: sizing.stageHeight }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b1ff00]/6 blur-[70px] md:h-[55%] md:w-[45%] md:blur-[90px]"
        />
        <RoundCarousel
          items={technologies}
          imageWidth={sizing.imageWidth}
          imageHeight={sizing.imageHeight}
          spacing={sizing.spacing}
          tilt={sizing.tilt}
          perspective={sizing.perspective}
          cornerRadius={sizing.cornerRadius}
          logoSize={sizing.logoSize}
          logoBox={sizing.logoBox}
          titleSize={sizing.titleSize}
          speed={4.5}
          direction="right"
          drag
        />
      </div>
    </section>
  )
}
