import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

type ChatBotProps = {
  variant?: 'floating' | 'section'
}

const GROQ_API_URL =
  (import.meta.env.VITE_GROQ_API_URL as string | undefined) ||
  (import.meta.env.VITE_CHAT_API_URL as string | undefined) ||
  'https://api.groq.com/openai/v1/chat/completions'
const GROQ_API_KEY =
  (import.meta.env.VITE_GROQ_API_KEY as string | undefined) ||
  (import.meta.env.VITE_CHAT_API_KEY as string | undefined)
const GROQ_MODEL =
  (import.meta.env.VITE_GROQ_MODEL as string | undefined) ||
  (import.meta.env.VITE_CHAT_MODEL as string | undefined) ||
  'llama-3.3-70b-versatile'
const IS_GROQ_CONFIGURED = Boolean(GROQ_API_KEY)

const starter: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Hi, I am the Hello World assistant powered by Groq. Ask about projects, hosting, the team, pricing, or how we can build with you.',
  },
]

async function requestAssistantReply(history: ChatMessage[]): Promise<string> {
  if (!IS_GROQ_CONFIGURED) {
    return 'Groq is not configured yet. Add your Groq API key in the env file to connect the assistant.'
  }

  const payload = {
    model: GROQ_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are the Hello World digital agency assistant in Addis Ababa, Ethiopia. Be concise, helpful, friendly, and action-oriented. Help visitors learn about projects, hosting with WOS Hosting, the team, and how to contact the company.',
      },
      ...history
        .filter((message) => message.role !== 'system')
        .map(({ role, content }) => ({ role, content })),
    ],
    temperature: 0.6,
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(GROQ_API_KEY ? { Authorization: `Bearer ${GROQ_API_KEY}` } : {}),
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Groq request failed (${response.status})`)
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

function ChatBotPanel() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(starter)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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
      const message = err instanceof Error ? err.message : 'Unable to reach Groq'
      setError(message)
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Sorry, I could not reach Groq right now. Please try again in a moment or email rebeccayihenew@gmail.com.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-hw-border bg-hw-bg/95 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden flex h-[520px] max-h-[70vh] flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-hw-border bg-hw-card">
        <div>
          <div className="text-sm font-semibold text-white">Hello World Assistant</div>
        </div>
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
          placeholder="Ask about a project, hosting, pricing, or the team..."
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
    </div>
  )
}

export function ChatBot({ variant = 'floating' }: ChatBotProps) {
  if (variant === 'section') {
    return <ChatBotPanel />
  }

  return (
    <div className="fixed bottom-10 right-10 z-[90] flex flex-col items-end gap-3">
      <FloatingChatBot />
    </div>
  )
}

function FloatingChatBot() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="w-[min(92vw,380px)]"
          >
            <ChatBotPanel />
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
    </>
  )
}
