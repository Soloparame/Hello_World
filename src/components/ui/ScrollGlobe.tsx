import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

export function ScrollGlobe() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const [hiddenByTeam, setHiddenByTeam] = useState(false)
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.45,
  })

  useEffect(() => {
    const teamSection = document.getElementById('team')
    if (!teamSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHiddenByTeam(entry.isIntersecting && entry.intersectionRatio > 0.12)
      },
      { threshold: [0, 0.12, 0.25, 0.5], rootMargin: '-10% 0px -10% 0px' },
    )

    observer.observe(teamSection)
    return () => observer.disconnect()
  }, [])

  const points = [0, 0.08, 0.2, 0.34, 0.48, 0.62, 0.76, 0.9, 1]
  const left = useTransform(progress, points, ['86%', '86%', '12%', '82%', '16%', '78%', '10%', '86%', '86%'])
  const top = useTransform(progress, points, ['70%', '70%', '28%', '66%', '34%', '60%', '25%', '68%', '68%'])
  const scale = useTransform(progress, points, [0, 0, 1, 0.72, 1.08, 0.76, 1, 0.55, 0])
  const baseOpacity = useTransform(progress, points, [0, 0, 0.92, 0.68, 0.95, 0.7, 0.9, 0.45, 0])
  const opacity = useTransform(baseOpacity, (value) => (hiddenByTeam ? 0 : value))
  const rotate = useTransform(progress, [0, 1], [0, 520])

  return (
    <motion.div
      aria-hidden="true"
      className="journey-globe-wrap pointer-events-none fixed z-10 hidden md:block"
      style={{ left, top, scale, opacity, rotate: prefersReducedMotion ? 0 : rotate }}
    >
      <div className="journey-orbit" />
      <div className={`journey-globe ${prefersReducedMotion ? 'journey-globe--still' : ''}`} />
      <div className="journey-globe-label">ORBIT / 01</div>
    </motion.div>
  )
}
