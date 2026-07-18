import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CursorGlow } from '../ui/CursorGlow'
import { ScrollGlobe } from '../ui/ScrollGlobe'
import { ChatBot } from '../ui/ChatBot'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-hw-bg min-h-screen text-hw-text font-sans">
      <CursorGlow />
      <ScrollGlobe />
      <ChatBot />
      <Navbar />
      <div className="site-waves-bg relative pt-24">
        {children}
        <Footer />
      </div>
    </main>
  )
}
