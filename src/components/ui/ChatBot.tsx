import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL as string | undefined
const CHAT_API_KEY = import.meta.env.VITE_CHAT_API_KEY as string | undefined
const CHAT_MODEL = (import.meta.env.VITE_CHAT_MODEL as string | undefined) || 'gpt-4o-mini'

const starter: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Hi — I am the Hello World assistant. Ask about projects, hosting, team, or how we can build with you.',
  },
]

async function requestAssistantReply(history: ChatMessage[]): Promise<string> {
  if (!CHAT_API_URL) {
    return 'Chat API is not configured yet. Add VITE_CHAT_API_URL in your .env file to connect a live assistant.'
  }

  const payload = {
    model: CHAT_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are the Hello World digital agency assistant in Addis Ababa, Ethiopia. Be concise, helpful, and guide users toward projects, hosting (WOS Hosting), team, and contact.',
      },
      ...history
        .filter((message) => message.role !== 'system')
        .map(({ role, content }) => ({ role, content })),
    ],
    temperature: 0.6,
  }

  const response = await fetch(CHAT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(CHAT_API_KEY ? { Authorization: `Bearer ${CHAT_API_KEY}` } : {}),
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Chat API failed (${response.status})`)
  }

  const data = await response.json()
  const content =
    data?.choices?.[0]?.message?.content ||
    data?.message ||
    data?.reply ||
    data?.output_text

  if (!content || typeof content !== 'string') {
    throw new Error('Unexpected chat API response shape')
  }

  return content.trim()
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(starter)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, loading])

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }
    const nextHistory = [...messages, userMessage]
    setMessages(nextHistory)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const reply = await requestAssistantReply(nextHistory)
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', content: reply },
      ])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to reach chat API'
      setError(message)
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry — I could not reach the chat API. Please try again or email rebeccayihenew@gmail.com.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-10 right-10 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="w-[min(92vw,380px)] h-[min(70vh,520px)] rounded-2xl border border-hw-border bg-hw-bg/95 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-hw-border bg-hw-card">
              <div>
                <div className="text-sm font-semibold text-white">Hello World Bot</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-hw-accent">
                  {CHAT_API_URL ? 'API connected' : 'Set VITE_CHAT_API_URL'}
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full border border-hw-border text-hw-muted hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-auto bg-hw-accent text-hw-bg'
                      : 'mr-auto bg-hw-card border border-hw-border text-hw-text'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto rounded-2xl border border-hw-border bg-hw-card px-3.5 py-2.5 text-sm text-hw-muted">
                  Thinking...
                </div>
              )}
              {error && <p className="text-[11px] text-red-400/90 font-mono">{error}</p>}
              <div ref={endRef} />
            </div>

            <form onSubmit={sendMessage} className="border-t border-hw-border p-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about a project..."
                className="flex-1 bg-hw-card border border-hw-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-hw-muted focus:outline-none focus:border-hw-accent"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 rounded-full bg-hw-accent text-hw-bg flex items-center justify-center disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? 'Close chat bot' : 'Open chat bot'}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="w-14 h-14 rounded-full bg-hw-accent text-hw-bg shadow-[0_0_30px_rgba(177,255,0,0.35)] flex items-center justify-center"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>
    </div>
  )
}
