import React, { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { InteractiveGlobe } from '../ui/InteractiveGlobe'

const links = [
  { label: 'Services', href: '/#services', type: 'anchor' as const },
  { label: 'Work', to: '/projects', type: 'route' as const },
  { label: 'Hosting', to: '/hosting', type: 'route' as const },
  { label: 'Team', to: '/team', type: 'route' as const },
  { label: 'Design', href: '/#design', type: 'anchor' as const },
  { label: 'Contact', href: '/#contact', type: 'anchor' as const },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-hw-bg/90 backdrop-blur-md border-b border-hw-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={close}>
          <div className="h-9 w-9 overflow-hidden rounded-full border border-hw-accent/30 bg-black shadow-[0_0_20px_rgba(177,255,0,0.12)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <InteractiveGlobe compact />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Hello World.</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-hw-muted">
          {links.map((link) =>
            link.type === 'route' ? (
              <Link key={link.label} to={link.to} className="hover:text-hw-text transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="hover:text-hw-text transition-colors">
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/#contact" className="hidden sm:block" onClick={close}>
            <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Start a Project
            </Button>
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden w-11 h-11 rounded-full border border-hw-border bg-hw-card text-white flex items-center justify-center"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-hw-border bg-hw-bg/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
              {links.map((link) =>
                link.type === 'route' ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={close}
                    className="rounded-xl px-4 py-3 text-base text-hw-muted hover:text-white hover:bg-hw-card transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className="rounded-xl px-4 py-3 text-base text-hw-muted hover:text-white hover:bg-hw-card transition-colors"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <a href="/#contact" onClick={close} className="mt-3">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} className="w-full justify-center">
                  Start a Project
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
