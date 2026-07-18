import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-transparent relative border-t border-hw-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
                Have an idea? <br />
                <span className="text-hw-accent">Let&apos;s build it.</span>
              </h2>
              <p className="text-lg text-hw-muted font-light max-w-md mb-12 leading-relaxed">
                Whether you need a website, application, custom software, or reliable hosting infrastructure, let&apos;s turn your idea into something real.
              </p>
              
              <div className="flex flex-col gap-3">
                <a href="mailto:rebeccayihenew@gmail.com" className="text-xl font-mono text-white hover:text-hw-accent transition-colors break-all">
                  rebeccayihenew@gmail.com
                </a>
                <a href="tel:+251989991524" className="text-lg font-mono text-hw-muted hover:text-hw-accent transition-colors">
                  +251 989 991 524
                </a>
                <a href="tel:+251918155305" className="text-lg font-mono text-hw-muted hover:text-hw-accent transition-colors">
                  +251 918 155 305
                </a>
                <p className="text-hw-muted mt-2">Addis Ababa, Ethiopia — Worldwide</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl bg-hw-card border border-hw-border"
            >
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-hw-muted uppercase tracking-wider">Name</label>
                    <input type="text" className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors" placeholder="Abebe Kedede" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-hw-muted uppercase tracking-wider">Email</label>
                    <input type="email" className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors" placeholder="abebde@gmail.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-hw-muted uppercase tracking-wider">Phone</label>
                  <input type="tel" className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors" placeholder="+2519********" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-hw-muted uppercase tracking-wider">Company</label>
                  <input type="text" className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors" placeholder="Your Company Ltd" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-hw-muted uppercase tracking-wider">Estimated Project Type</label>
                  <select className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors appearance-none cursor-pointer">
                    <option className="bg-hw-bg">Web Application</option>
                    <option className="bg-hw-bg">Mobile Application</option>
                    <option className="bg-hw-bg">Custom Software</option>
                    <option className="bg-hw-bg">Website & Hosting</option>
                    <option className="bg-hw-bg">UI/UX Design</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-hw-muted uppercase tracking-wider">What do you want to build?</label>
                  <textarea rows={4} className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors resize-none" placeholder="Tell us about your idea..." />
                </div>

                <Button variant="primary" size="lg" className="w-full mt-4">
                  Start a Conversation
                </Button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
