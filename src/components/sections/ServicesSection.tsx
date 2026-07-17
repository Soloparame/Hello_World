import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Monitor, Smartphone, Code2, LayoutDashboard } from 'lucide-react';
import { Badge } from '../ui/Badge';

const services = [
  {
    id: '01',
    title: 'Web Development',
    description: 'Modern, fast, scalable websites and web applications built for real businesses and digital products.',
    icon: <Monitor className="w-5 h-5 text-hw-accent" />,
    tags: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'EDGE'],
  },
  {
    id: '02',
    title: 'Mobile Applications',
    description: 'Beautiful and functional mobile applications designed for iOS and Android experiences.',
    icon: <Smartphone className="w-5 h-5 text-hw-muted group-hover:text-hw-accent transition-colors" />,
    tags: ['SWIFT', 'KOTLIN', 'REACT NATIVE', 'EXPO'],
  },
  {
    id: '03',
    title: 'Custom Software',
    description: 'Tailored software solutions built around specific business needs, workflows, and integrations.',
    icon: <Code2 className="w-5 h-5 text-hw-muted group-hover:text-hw-accent transition-colors" />,
    tags: ['NODE', 'PYTHON', 'POSTGRESQL', 'APIS'],
  },
  {
    id: '04',
    title: 'UI/UX Design',
    description: 'Clear, intuitive, and visually compelling digital experiences that focus on user needs.',
    icon: <LayoutDashboard className="w-5 h-5 text-hw-muted group-hover:text-hw-accent transition-colors" />,
    tags: ['FIGMA', 'RESEARCH', 'PROTOTYPING'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Standard Services */}
          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-6 rounded-2xl border ${
                  index === 0 
                    ? 'border-hw-accent bg-[#b1ff00]/5' 
                    : 'border-hw-border bg-hw-card hover:bg-hw-card-hover'
                } transition-all duration-300 cursor-pointer flex gap-6`}
              >
                <div className="mt-1 hidden sm:block">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-[#b1ff00]/10' : 'bg-hw-bg'
                  }`}>
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-hw-muted">{service.id}</span>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${index === 0 ? 'text-hw-accent' : 'text-hw-muted opacity-0 group-hover:opacity-100'} transition-all`} />
                  </div>
                  <p className="text-hw-muted mb-4 font-light leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map(tag => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Hosting & Infrastructure */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <div className="h-full rounded-2xl border border-hw-border bg-hw-card p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                  <span className="text-hw-accent">05</span>
                  <span className="text-hw-muted">&bull;</span>
                  <span className="text-hw-accent">INFRASTRUCTURE</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-hw-accent">
                  <span className="w-2 h-2 rounded-full bg-hw-accent animate-pulse" />
                  ACTIVE
                </div>
              </div>

              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Hosting & Infrastructure.</h2>
              <p className="text-hw-muted mb-8 font-light leading-relaxed">
                We don't just build digital products — we keep them online. Reliable hosting, fast global delivery, secure deployment pipelines, and 24/7 monitoring.
              </p>

              {/* Terminal Simulation */}
              <div className="flex-1 rounded-xl bg-[#0a0a0a] border border-hw-border overflow-hidden flex flex-col font-mono text-sm mb-8">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-hw-border bg-hw-bg">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  </div>
                  <span className="text-xs text-hw-muted ml-2">~/deploy</span>
                </div>
                <div className="p-4 flex-1 text-hw-muted flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-hw-accent">$</span>
                    <span className="text-white">hw deploy --env production</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hw-muted">→ Building assets</span>
                    <span className="border-b border-dotted border-hw-muted flex-1 mx-2" />
                    <span className="text-hw-muted">ok</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hw-muted">→ Provisioning edge nodes</span>
                    <span className="border-b border-dotted border-hw-muted flex-1 mx-2" />
                    <span className="text-hw-muted">ok</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hw-muted">→ Configuring TLS certificate</span>
                    <span className="border-b border-dotted border-hw-muted flex-1 mx-2" />
                    <span className="text-hw-muted">ok</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-hw-muted">→ Live at</span>
                    <span className="text-hw-accent underline">https://yourdomain.com</span>
                  </div>
                </div>
              </div>

              {/* Stats Mini Grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-hw-border pt-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">99.98%</div>
                  <div className="text-[10px] font-mono text-hw-muted uppercase tracking-wider">Uptime</div>
                </div>
                <div className="text-center border-l border-r border-hw-border">
                  <div className="text-xl font-bold text-white mb-1">38ms</div>
                  <div className="text-[10px] font-mono text-hw-muted uppercase tracking-wider">Avg TTFB</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">24/7</div>
                  <div className="text-[10px] font-mono text-hw-muted uppercase tracking-wider">Monitoring</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
