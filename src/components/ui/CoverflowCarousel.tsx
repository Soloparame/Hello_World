import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'

export type CoverflowItem = {
  src: string
  alt: string
  href?: string
  title?: string
  description?: string
  meta?: string
  gradient?: string
}

type Sizing = {
  restWidth: number
  restHeight: number
  activeWidth: number
  activeHeight: number
}

type CoverflowCarouselProps = {
  items: CoverflowItem[]
  activeWidth?: number
  activeHeight?: number
  restWidth?: number
  restHeight?: number
  gap?: number
  radius?: number
  showArrows?: boolean
  autoplay?: boolean
  autoplayDirection?: 'leftToRight' | 'rightToLeft'
  moveDuration?: number
  dwell?: number
  className?: string
  style?: CSSProperties
  onActiveChange?: (index: number) => void
}

export type CoverflowHandle = {
  goTo: (index: number) => void
  goNext: () => void
  goPrev: () => void
}

const RENDER_RANGE = 6

const GRADIENT_FALLBACKS = [
  'linear-gradient(160deg, #1a2a0a, #3a4a14)',
  'linear-gradient(160deg, #0c2a4d, #1a4a6d)',
  'linear-gradient(160deg, #2b3a11, #4a5a20)',
  'linear-gradient(160deg, #113a36, #1a5a52)',
  'linear-gradient(160deg, #3a1c4a, #5a2c6a)',
  'linear-gradient(160deg, #4d2a0c, #6d3a1c)',
  'linear-gradient(160deg, #0d3f2b, #1a5f40)',
]

function relOf(index: number, pos: number, count: number): number {
  let rel = (((index - pos) % count) + count) % count
  if (rel > count / 2) rel -= count
  return rel
}

function xForRel(rel: number, s: Sizing, gap: number): number {
  const ar = Math.abs(rel)
  const c1 = s.activeWidth / 2 + gap + s.restWidth / 2
  const pitch = s.restWidth + gap
  const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch
  return (rel < 0 ? -1 : 1) * mag
}

function blendForRel(rel: number): number {
  return Math.min(Math.abs(rel), 1)
}

function wrapIndex(value: number, count: number): number {
  return ((Math.round(value) % count) + count) % count
}

function Card({
  item,
  index,
  pos,
  count,
  R,
  sizing,
  gap,
  radius,
  gradient,
  onSelect,
  didDragRef,
}: {
  item: CoverflowItem
  index: number
  pos: MotionValue<number>
  count: number
  R: number
  sizing: Sizing
  gap: number
  radius: number
  gradient: string
  onSelect?: (index: number) => void
  didDragRef: MutableRefObject<boolean>
}) {
  const x = useTransform(pos, (p) => xForRel(relOf(index, p, count), sizing, gap))
  const opacity = useTransform(pos, (p) => {
    const ar = Math.abs(relOf(index, p, count))
    return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R)
  })
  const zIndex = useTransform(pos, (p) =>
    Math.round(1000 - Math.abs(relOf(index, p, count)) * 100),
  )
  const width = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count))
    return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a
  })
  const height = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count))
    return sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a
  })
  const borderRadius = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count))
    const w = sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a
    const h = sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a
    return (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(w, h) / 2)
  })
  const boxShadow = useTransform(pos, (p) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? '0 24px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(177,255,0,0.12)'
      : '0 14px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)',
  )
  const overlayReady = useTransform(pos, (p) =>
    Math.abs(relOf(index, p, count)) < 0.45 ? 1 : 0,
  )

  const handleClick = () => {
    if (didDragRef.current) return
    const active = Math.abs(relOf(index, pos.get(), count)) < 0.5
    if (active && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }
    onSelect?.(index)
  }

  return (
    <motion.div
      onClick={handleClick}
      className="group"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x,
        zIndex,
        opacity,
        cursor: 'pointer',
      }}
    >
      <motion.div
        style={{
          x: '-50%',
          y: '-50%',
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          background: gradient,
          boxShadow,
        }}
      >
        {item.src ? (
          <img
            src={item.src}
            alt={item.alt}
            draggable={false}
            className="block h-full w-full object-cover object-[center_18%] pointer-events-none select-none"
          />
        ) : null}

        {(item.title || item.description) && (
          <motion.div
            style={{ opacity: overlayReady }}
            className="pointer-events-none absolute inset-0 hidden lg:block"
          >
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/55 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:p-6">
              {item.meta && (
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-hw-accent">
                  {item.meta}
                </div>
              )}
              {item.title && (
                <div className="mb-1.5 text-lg font-bold tracking-tight text-white xl:text-xl">
                  {item.title}
                </div>
              )}
              {item.description && (
                <p className="line-clamp-3 text-sm font-light leading-relaxed text-white/80">
                  {item.description}
                </p>
              )}
              {item.href && (
                <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-hw-accent">
                  Click to open site →
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

function ArrowButton({
  side,
  onClick,
  size,
}: {
  side: 'left' | 'right'
  onClick: () => void
  size: number
}) {
  const isLeft = side === 'left'
  return (
    <button
      type="button"
      aria-label={isLeft ? 'Previous project' : 'Next project'}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="absolute top-1/2 z-[2000] flex items-center justify-center rounded-full border border-hw-border bg-hw-card/90 text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-hw-accent/50 hover:text-hw-accent"
      style={{
        [isLeft ? 'left' : 'right']: 8,
        transform: 'translateY(-50%)',
        width: size,
        height: size,
      }}
    >
      <svg
        width={size * 0.38}
        height={size * 0.38}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: 'none' }}
      >
        {isLeft ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  )
}

export const CoverflowCarousel = forwardRef<CoverflowHandle, CoverflowCarouselProps>(
  function CoverflowCarousel(
    {
      items,
      activeWidth = 560,
      activeHeight = 360,
      restWidth = 150,
      restHeight = 230,
      gap = 22,
      radius = 8,
      showArrows = true,
      autoplay = false,
      autoplayDirection = 'rightToLeft',
      moveDuration = 0.35,
      dwell = 2.2,
      className,
      style,
      onActiveChange,
    },
    ref,
  ) {
  const prefersReducedMotion = useReducedMotion()
  const count = Math.max(1, items.length)
  const sizing: Sizing = { restWidth, restHeight, activeWidth, activeHeight }
  const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2)))

  const pos = useMotionValue(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTRef = useRef<number | null>(null)
  const autoplayingRef = useRef(false)
  const dirRef = useRef(1)
  const dwellAccRef = useRef(0)
  const moveDurRef = useRef(moveDuration)
  moveDurRef.current = moveDuration
  const dwellRef = useRef(dwell)
  dwellRef.current = dwell
  const reducedRef = useRef(prefersReducedMotion)
  reducedRef.current = prefersReducedMotion
  const onActiveChangeRef = useRef(onActiveChange)
  onActiveChangeRef.current = onActiveChange

  const emitActive = useCallback(() => {
    onActiveChangeRef.current?.(wrapIndex(targetRef.current, count))
  }, [count])

  const tick = useCallback(
    (t: number) => {
      const last = lastTRef.current ?? t
      const dt = Math.min((t - last) / 1000, 1 / 30)
      lastTRef.current = t

      const cur = pos.get()
      const diff = targetRef.current - cur
      const dur = Math.max(0.08, moveDurRef.current)
      const step = (1 / dur) * dt
      const arriving = reducedRef.current || Math.abs(diff) <= step

      if (arriving) {
        pos.set(targetRef.current)
        emitActive()
        if (autoplayingRef.current) {
          dwellAccRef.current += dt
          if (dwellAccRef.current >= Math.max(0, dwellRef.current)) {
            dwellAccRef.current = 0
            targetRef.current += dirRef.current
          }
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        rafRef.current = null
        lastTRef.current = null
        return
      }

      pos.set(cur + Math.sign(diff) * step)
      rafRef.current = requestAnimationFrame(tick)
    },
    [pos, emitActive],
  )

  const ensureRunning = useCallback(() => {
    if (rafRef.current == null) {
      lastTRef.current = null
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const goNext = useCallback(() => {
    targetRef.current += 1
    dwellAccRef.current = 0
    ensureRunning()
  }, [ensureRunning])

  const goPrev = useCallback(() => {
    targetRef.current -= 1
    dwellAccRef.current = 0
    ensureRunning()
  }, [ensureRunning])

  const goTo = useCallback(
    (index: number) => {
      const cur = targetRef.current
      let d = index - cur
      d = ((d % count) + count) % count
      if (d > count / 2) d -= count
      targetRef.current = cur + d
      dwellAccRef.current = 0
      ensureRunning()
    },
    [ensureRunning, count],
  )

  useImperativeHandle(ref, () => ({ goTo, goNext, goPrev }), [goTo, goNext, goPrev])

  useEffect(() => {
    emitActive()
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [emitActive])

  useEffect(() => {
    const on = autoplay && count > 1
    autoplayingRef.current = on
    if (on) {
      dirRef.current = autoplayDirection === 'leftToRight' ? -1 : 1
      dwellAccRef.current = 0
      ensureRunning()
    }
    return () => {
      autoplayingRef.current = false
    }
  }, [autoplay, autoplayDirection, count, ensureRunning])

  useMotionValueEvent(pos, 'change', (latest) => {
    onActiveChangeRef.current?.(wrapIndex(latest, count))
  })

  const isHoveredRef = useRef(false)
  useEffect(() => {
    if (autoplay) return
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [autoplay, goPrev, goNext])

  const dragX = useRef<number | null>(null)
  const didDragRef = useRef(false)
  const onPointerDown = (e: ReactPointerEvent) => {
    dragX.current = e.clientX
    didDragRef.current = false
  }
  const onPointerUp = (e: ReactPointerEvent) => {
    if (dragX.current == null) return
    const delta = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(delta) < 40) return
    didDragRef.current = true
    if (delta < 0) goNext()
    else goPrev()
  }

  const selectable = count > 1

  return (
    <div
      tabIndex={0}
      className={className}
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
      onFocus={() => {
        isHoveredRef.current = true
      }}
      onBlur={() => {
        isHoveredRef.current = false
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragX.current = null
      }}
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 280,
        minHeight: 220,
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'pan-y',
        outline: 'none',
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden [isolation:isolate]">
        {items.map((item, i) => (
          <Card
            key={`${item.src}-${i}`}
            item={item}
            index={i}
            pos={pos}
            count={count}
            R={R}
            sizing={sizing}
            gap={gap}
            radius={radius}
            gradient={item.gradient || GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length]}
            onSelect={selectable ? goTo : undefined}
            didDragRef={didDragRef}
          />
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <ArrowButton side="left" onClick={goPrev} size={44} />
          <ArrowButton side="right" onClick={goNext} size={44} />
        </>
      )}
    </div>
  )
})

export function useCoverflowSizing() {
  const [sizing, setSizing] = useState({
    activeWidth: 560,
    activeHeight: 360,
    restWidth: 150,
    restHeight: 230,
    gap: 22,
    stageHeight: 420,
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) {
        setSizing({
          activeWidth: Math.min(300, w - 72),
          activeHeight: 210,
          restWidth: 72,
          restHeight: 140,
          gap: 12,
          stageHeight: 280,
        })
      } else if (w < 1024) {
        setSizing({
          activeWidth: 420,
          activeHeight: 280,
          restWidth: 110,
          restHeight: 180,
          gap: 16,
          stageHeight: 340,
        })
      } else {
        setSizing({
          activeWidth: 560,
          activeHeight: 360,
          restWidth: 150,
          restHeight: 230,
          gap: 22,
          stageHeight: 420,
        })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return sizing
}
