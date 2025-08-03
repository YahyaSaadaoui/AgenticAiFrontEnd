"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  media?: {
    type: "image" | "audio" | "file"
    url: string
    name: string
  }
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatHistoryProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  onSelectSession: (session: ChatSession) => void
  onNewChat: () => void
  agentName: string
}

export function ChatHistory({ sessions, currentSession, onSelectSession, onNewChat, agentName }: ChatHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-full flex flex-col bg-slate-800/30">
      <div className="p-4 border-b border-slate-700">
        <Button
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={currentSession?.id === session.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left p-3 h-auto ${
                  currentSession?.id === session.id
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
                onClick={() => onSelectSession(session)}
              >
                <div className="flex items-start gap-2 w-full">
                  <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{session.title}</p>
                    <p className="text-xs opacity-70">{formatDate(session.updatedAt)}</p>
                    <p className="text-xs opacity-50">{session.messages.length} messages</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chat history yet</p>
              <p className="text-xs">Start a conversation with {agentName}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
