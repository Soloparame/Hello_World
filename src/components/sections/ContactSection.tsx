import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

type FormState = {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  message: string
  botcheck: string
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: 'Web Application',
  message: '',
  botcheck: '',
}

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
const CONTACT_EMAIL = 'rebeccayihenew@gmail.com'

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (form.botcheck) return

    if (!ACCESS_KEY) {
      setStatus('error')
      setErrorMessage(
        'Email delivery is not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.',
      )
      return
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in your name, email, and project details.')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Hello World inquiry — ${form.projectType}`,
          from_name: 'Hello World Website',
          replyto: form.email.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || 'Not provided',
          company: form.company.trim() || 'Not provided',
          project_type: form.projectType,
          message: form.message.trim(),
        }),
      })

      const data = (await response.json()) as { success?: boolean; message?: string }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send your message right now.')
      }

      setStatus('success')
      setForm(INITIAL_FORM)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : `Something went wrong. Please email ${CONTACT_EMAIL} directly.`,
      )
    }
  }

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
                Whether you need a website, application, custom software, or reliable hosting
                infrastructure, let&apos;s turn your idea into something real.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xl font-mono text-white hover:text-hw-accent transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href="tel:+251989991524"
                  className="text-lg font-mono text-hw-muted hover:text-hw-accent transition-colors"
                >
                  +251 989 991 524
                </a>
                <a
                  href="tel:+251918155305"
                  className="text-lg font-mono text-hw-muted hover:text-hw-accent transition-colors"
                >
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
              {status === 'success' ? (
                <div className="flex min-h-[360px] flex-col items-start justify-center gap-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-hw-accent">
                    Message sent
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Thanks — we got your idea.
                  </h3>
                  <p className="text-hw-muted font-light leading-relaxed">
                    Your message is on its way to our inbox. We&apos;ll reply soon.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setStatus('idle')}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.botcheck}
                    onChange={(event) => updateField('botcheck', event.target.checked ? '1' : '')}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-mono text-hw-muted uppercase tracking-wider"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors"
                        placeholder="Abebe Kedede"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-mono text-hw-muted uppercase tracking-wider"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors"
                        placeholder="abebde@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-mono text-hw-muted uppercase tracking-wider"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors"
                      placeholder="+2519********"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-company"
                      className="text-xs font-mono text-hw-muted uppercase tracking-wider"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={(event) => updateField('company', event.target.value)}
                      className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors"
                      placeholder="Your Company Ltd"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-project-type"
                      className="text-xs font-mono text-hw-muted uppercase tracking-wider"
                    >
                      Estimated Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={form.projectType}
                      onChange={(event) => updateField('projectType', event.target.value)}
                      className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option className="bg-hw-bg" value="Web Application">
                        Web Application
                      </option>
                      <option className="bg-hw-bg" value="Mobile Application">
                        Mobile Application
                      </option>
                      <option className="bg-hw-bg" value="Custom Software">
                        Custom Software
                      </option>
                      <option className="bg-hw-bg" value="Website & Hosting">
                        Website & Hosting
                      </option>
                      <option className="bg-hw-bg" value="UI/UX Design">
                        UI/UX Design
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-mono text-hw-muted uppercase tracking-wider"
                    >
                      What do you want to build?
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      className="bg-transparent border-b border-hw-border py-2 text-white focus:outline-none focus:border-hw-accent transition-colors resize-none"
                      placeholder="Tell us about your idea..."
                    />
                  </div>

                  {status === 'error' && errorMessage && (
                    <p className="text-sm text-red-400/90 font-mono leading-relaxed">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full mt-4"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Start a Conversation'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
