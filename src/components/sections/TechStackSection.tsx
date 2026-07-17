import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const technologies = [
  { name: 'TypeScript', category: 'LANGUAGE' },
  { name: 'React', category: 'FRAMEWORK' },
  { name: 'Next.js', category: 'FRAMEWORK' },
  { name: 'Node.js', category: 'RUNTIME' },
  { name: 'Python', category: 'LANGUAGE' },
  { name: 'Swift', category: 'MOBILE' },
  { name: 'Kotlin', category: 'MOBILE' },
  { name: 'PostgreSQL', category: 'DATABASE' },
  { name: 'Redis', category: 'CACHE' },
  { name: 'Supabase', category: 'PLATFORM' },
  { name: 'Docker', category: 'RUNTIME' },
  { name: 'Kubernetes', category: 'ORCHESTRATION' },
  { name: 'Cloudflare', category: 'EDGE' },
  { name: 'AWS', category: 'CLOUD' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Figma', category: 'DESIGN' },
];

export function TechStackSection() {
  return (
    <section className="py-24 bg-transparent relative border-t border-hw-border">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
            <span>TECHNOLOGY</span>
            <span className="text-hw-muted">&bull;</span>
            <span>ECOSYSTEM</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            A curated stack, connected as a <span className="text-hw-accent">single system.</span>
          </h2>
          <p className="text-lg text-hw-muted font-light leading-relaxed">
            We pick tools for how well they age, not how loud they trend. Every technology below is one we run in production today.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-5 rounded-xl border border-hw-border bg-[#0a0a0a] hover:bg-hw-card transition-colors group flex items-center justify-between cursor-default"
            >
              <div>
                <div className="text-white font-semibold mb-1 group-hover:text-hw-accent transition-colors">{tech.name}</div>
                <div className="text-[10px] font-mono text-hw-muted uppercase tracking-wider">{tech.category}</div>
              </div>
              <div className="w-5 h-5 rounded-full border border-hw-border flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:border-hw-accent/50 group-hover:bg-[#b1ff00]/10 transition-all">
                <Check className="w-3 h-3 text-hw-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
