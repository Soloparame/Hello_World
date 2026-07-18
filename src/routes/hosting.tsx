import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, Phone, Server } from 'lucide-react'
import { PageShell } from '../components/layout/PageShell'
import { ContactSection } from '../components/sections/ContactSection'
import { Button } from '../components/ui/Button'
import { hostingProduct } from '../lib/content'

export const Route = createFileRoute('/hosting')({
  component: HostingPage,
})

function HostingPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pb-10 pt-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 font-mono text-xs text-hw-accent uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-hw-accent animate-pulse" />
                HOSTING · WOS HOSTINGETH
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-5">
                Reliable hosting built for <span className="text-hw-accent">Ethiopia.</span>
              </h1>
              <p className="text-lg text-hw-muted font-light leading-relaxed mb-6 max-w-xl">
                WOS Hosting (woshostingeth.com) is Hello World&apos;s hosting platform for domains,
                cPanel websites, SSL, and managed support — so businesses can launch and stay online
                without wrestling infrastructure.
              </p>
              <p className="text-base text-hw-muted font-light leading-relaxed mb-8 max-w-xl">
                From cafés and clinics to charity organizations, WOS Hosting powers live sites with
                free Sitejet website builder, SSL certificates, and 24/7 support via Telegram chat,
                phone, and email.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={hostingProduct.url} target="_blank" rel="noreferrer">
                  <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    Visit WOS Hosting
                  </Button>
                </a>
                <Link to="/">
                  <Button variant="outline" size="sm">
                    Back home
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-hw-border overflow-hidden bg-hw-card"
            >
              <img
                src={hostingProduct.image}
                alt="WOS Hosting"
                className="w-full aspect-[16/11] object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-hw-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Domains + Hosting',
                text: 'Search and buy domains, then launch hosting in one place with instant setup.',
              },
              {
                title: 'cPanel + Sitejet',
                text: 'Every plan includes cPanel and the Sitejet drag-and-drop builder — no coding required.',
              },
              {
                title: 'Local support',
                text: 'Get help in Ethiopia with Telegram chat, phone, and email when you need it.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-hw-border bg-hw-card/80 p-6">
                <Server className="w-5 h-5 text-hw-accent mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-hw-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <div className="font-mono text-xs text-hw-accent uppercase tracking-wider mb-3">Plans</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Choose the plan that fits your launch.
            </h2>
            <p className="text-hw-muted max-w-2xl">
              Pricing from WOS Hostingeth — Bronze through Platinum, each with SSL and Sitejet Builder included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {hostingProduct.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`rounded-2xl border p-6 bg-hw-card ${
                  plan.name === 'Gold' ? 'border-hw-accent' : 'border-hw-border'
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-hw-accent mb-2">
                  {plan.name}
                </div>
                <div className="text-2xl font-bold text-white mb-5">{plan.price}</div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-hw-muted">
                      <Check className="w-4 h-4 text-hw-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={hostingProduct.url} target="_blank" rel="noreferrer" className="block">
                  <Button
                    variant={plan.name === 'Gold' ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full justify-center"
                  >
                    Order Now
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-hw-border">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl border border-hw-border bg-hw-card p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Need help getting live?</h2>
              <p className="text-hw-muted leading-relaxed mb-6">
                WOS Hosting support is available to help you buy a domain, order hosting, make a payment,
                or troubleshoot your site. Partners already on the platform include Madeg Charity, WOS Caffe,
                and WOS Medical.
              </p>
              <a href={hostingProduct.url} target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                  Open WOS Hosting portal
                </Button>
              </a>
            </div>
            <div className="space-y-4">
              <a
                href={`tel:${hostingProduct.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 rounded-xl border border-hw-border px-4 py-3 hover:border-hw-accent/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-hw-accent" />
                <span className="text-white">{hostingProduct.phone}</span>
              </a>
              <a
                href={`tel:${hostingProduct.phoneAlt.replace(/\s/g, '')}`}
                className="flex items-center gap-3 rounded-xl border border-hw-border px-4 py-3 hover:border-hw-accent/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-hw-accent" />
                <span className="text-white">{hostingProduct.phoneAlt}</span>
              </a>
              <a
                href={`mailto:${hostingProduct.email}`}
                className="flex items-center gap-3 rounded-xl border border-hw-border px-4 py-3 hover:border-hw-accent/40 transition-colors"
              >
                <Mail className="w-4 h-4 text-hw-accent" />
                <span className="text-white break-all">{hostingProduct.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </PageShell>
  )
}
