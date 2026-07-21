import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HeroSection } from '../components/sections/HeroSection'
import { HowWeThinkSection } from '../components/sections/HowWeThinkSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { TeamSection } from '../components/sections/TeamSection'
import { FigmaSection } from '../components/sections/FigmaSection'
import { TechStackSection } from '../components/sections/TechStackSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ContactSection } from '../components/sections/ContactSection'
import { CursorGlow } from '../components/ui/CursorGlow'
import { ChatBot } from '../components/ui/ChatBot'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="bg-hw-bg min-h-screen text-hw-text font-sans">
      <CursorGlow />
      <ChatBot />
      <Navbar />
      <HeroSection />
      <div className="site-waves-bg relative">
        <TechStackSection />
        <HowWeThinkSection />
        <ServicesSection />
        <ProjectsSection limit={5} showSeeMore />
        <TeamSection />
        <FigmaSection />
        <ProcessSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
