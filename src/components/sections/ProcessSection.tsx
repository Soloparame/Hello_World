import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Discover',
    description: 'Understand the idea, business, and problem before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Create the experience, interface, and visual direction with human-centered principles.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'Develop the product with modern engineering — clean architecture, tested code, and measured performance.',
  },
  {
    num: '04',
    title: 'Launch',
    description: 'Deploy the product and make it available to users. Every launch is rehearsed, not improvised.',
  },
  {
    num: '05',
    title: 'Host & Grow',
    description: 'Keep it fast, secure, reliable, and ready to scale across our premium infrastructure.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-32 bg-transparent relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">How we build.</h2>
          <p className="text-hw-muted text-lg font-light max-w-2xl mx-auto">
            A refined process from the first idea to the final deployment.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-hw-border hidden md:block" />
          
          <div className="flex flex-col gap-12 md:gap-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 w-full ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="p-8 rounded-2xl border border-hw-border bg-hw-card relative group hover:border-hw-accent/50 transition-colors">
                      <div className="font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
                        STEP {step.num}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-hw-muted font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex flex-col items-center justify-center relative z-10">
                    <div className="w-8 h-8 rounded-full bg-hw-bg border border-hw-border flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-hw-accent shadow-[0_0_10px_#b1ff00]" />
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
