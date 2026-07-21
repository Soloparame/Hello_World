import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'

export type RoundCarouselItem = {
  name: string
  logo: string
  category?: string
}

type RoundCarouselProps = {
  items: RoundCarouselItem[]
  imageWidth?: number
  imageHeight?: number
  spacing?: number
  speed?: number
  direction?: 'right' | 'left'
  drag?: boolean
  sensitivity?: number
  tilt?: number
  perspective?: number
  cornerRadius?: number
  logoSize?: number
  logoBox?: number
  titleSize?: number
  className?: string
  style?: CSSProperties
}

export function RoundCarousel({
  items,
  imageWidth = 200,
  imageHeight = 240,
  spacing = 2.4,
  speed = 5,
  direction = 'right',
  drag = true,
  sensitivity = 5,
  tilt = -8,
  perspective = 2800,
  cornerRadius = 18,
  logoSize = 40,
  logoBox = 72,
  titleSize = 18,
  className,
  style = {},
}: RoundCarouselProps) {
  const count = Math.max(items.length, 1)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const rotYRef = useRef(0)
  const velRef = useRef(0)
  const lastRef = useRef(0)
  const dragRef = useRef({ active: false, x: 0 })

  const angle = 360 / count
  const factor = 1 + spacing * 0.15
  const radius = (imageWidth * factor) / (2 * Math.tan(Math.PI / count))
  const degPerSec = speed * 6 * (direction === 'left' ? -1 : 1)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`
    }
    apply()

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0
      lastRef.current = now
      const f = Math.min(dt, 0.1)
      const d = dragRef.current
      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f
          velRef.current *= 0.94
        } else {
          rotYRef.current += degPerSec * f
        }
      }
      apply()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [radius, degPerSec, count])

  const onPointerDown = (e: ReactPointerEvent) => {
    if (!drag) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    dragRef.current = { active: true, x: e.clientX }
    velRef.current = 0
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = dragRef.current
    if (!d.active) return
    const dx = e.clientX - d.x
    d.x = e.clientX
    const k = 0.3 * sensitivity
    rotYRef.current += dx * k
    velRef.current = dx * k * 60
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    dragRef.current.active = false
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        perspective: `${perspective}px`,
        cursor: drag ? 'grab' : 'default',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div style={{ transformStyle: 'preserve-3d', transform: `rotateX(${tilt}deg)` }}>
        <div
          ref={ringRef}
          style={{
            position: 'relative',
            width: imageWidth,
            height: imageHeight,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              style={{
                position: 'absolute',
                inset: 0,
                transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <TechFace
                item={item}
                cornerRadius={cornerRadius}
                logoSize={logoSize}
                logoBox={logoBox}
                titleSize={titleSize}
                side="front"
              />
              <TechFace
                item={item}
                cornerRadius={cornerRadius}
                logoSize={logoSize}
                logoBox={logoBox}
                titleSize={titleSize}
                side="back"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TechFace({
  item,
  cornerRadius,
  logoSize,
  logoBox,
  titleSize,
  side,
}: {
  item: RoundCarouselItem
  cornerRadius: number
  logoSize: number
  logoBox: number
  titleSize: number
  side: 'front' | 'back'
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: cornerRadius,
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
        transform: side === 'back' ? 'rotateY(180deg)' : undefined,
        filter: side === 'back' ? 'brightness(0.45)' : undefined,
        background:
          'linear-gradient(160deg, rgba(177,255,0,0.08) 0%, rgba(10,10,10,0.95) 45%, #050505 100%)',
        border: '1px solid rgba(177,255,0,0.18)',
        boxShadow: '0 14px 40px rgba(0,0,0,0.45)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Math.max(8, logoBox * 0.18),
        padding: Math.max(12, logoBox * 0.28),
      }}
    >
      <div
        style={{
          width: logoBox,
          height: logoBox,
          borderRadius: Math.max(12, cornerRadius - 2),
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={item.logo}
          alt=""
          width={logoSize}
          height={logoSize}
          draggable={false}
          style={{ display: 'block', objectFit: 'contain' }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            color: '#ffffff',
            fontWeight: 700,
            fontSize: titleSize,
            letterSpacing: '-0.02em',
            marginBottom: 6,
            lineHeight: 1.15,
          }}
        >
          {item.name}
        </div>
        {item.category && (
          <div
            style={{
              color: '#b1ff00',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: Math.max(8, titleSize * 0.55),
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {item.category}
          </div>
        )}
      </div>
    </div>
  )
}

export function useRoundCarouselSizing() {
  const [sizing, setSizing] = useState({
    imageWidth: 200,
    imageHeight: 240,
    stageHeight: 420,
    spacing: 2.2,
    tilt: -8,
    perspective: 2800,
    cornerRadius: 18,
    logoSize: 40,
    logoBox: 72,
    titleSize: 18,
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 480) {
        setSizing({
          imageWidth: 118,
          imageHeight: 150,
          stageHeight: 260,
          spacing: 1.35,
          tilt: -4,
          perspective: 1600,
          cornerRadius: 14,
          logoSize: 28,
          logoBox: 52,
          titleSize: 13,
        })
      } else if (w < 640) {
        setSizing({
          imageWidth: 136,
          imageHeight: 172,
          stageHeight: 300,
          spacing: 1.55,
          tilt: -5,
          perspective: 1900,
          cornerRadius: 15,
          logoSize: 32,
          logoBox: 58,
          titleSize: 14,
        })
      } else if (w < 1024) {
        setSizing({
          imageWidth: 170,
          imageHeight: 210,
          stageHeight: 360,
          spacing: 1.9,
          tilt: -7,
          perspective: 2400,
          cornerRadius: 16,
          logoSize: 36,
          logoBox: 64,
          titleSize: 16,
        })
      } else {
        setSizing({
          imageWidth: 200,
          imageHeight: 240,
          stageHeight: 440,
          spacing: 2.2,
          tilt: -8,
          perspective: 2800,
          cornerRadius: 18,
          logoSize: 40,
          logoBox: 72,
          titleSize: 18,
        })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return sizing
}
