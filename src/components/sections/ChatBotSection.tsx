import { motion } from 'framer-motion'
import { ChatBot } from '../ui/ChatBot'

export function ChatBotSection() {
  return (
    <section id="chat" className="py-24 bg-transparent relative border-t border-hw-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-hw-accent">
              <span className="h-2 w-2 rounded-full bg-hw-accent" />
              Groq Assistant
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Chat with us
              <br />
              <span className="text-hw-accent">instantly.</span>
            </h2>
            <p className="max-w-xl text-lg font-light leading-relaxed text-hw-muted">
              This assistant is connected to Groq and can answer questions about Hello World,
              projects, hosting, the team, and how to start working with us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <ChatBot variant="section" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
