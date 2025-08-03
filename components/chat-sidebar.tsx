"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search, MessageCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatSidebarProps {
  chats: Chat[]
  currentChat: Chat | null
  searchQuery: string
  onSearchChange: (query: string) => void
  onChatSelect: (chat: Chat) => void
  onNewChat: () => void
  agentName: string
  agentIcon: React.ComponentType<{ className?: string }>
  agentColor: string
}

export function ChatSidebar({
  chats,
  currentChat,
  searchQuery,
  onSearchChange,
  onChatSelect,
  onNewChat,
  agentName,
  agentIcon: Icon,
  agentColor,
}: ChatSidebarProps) {
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
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900/30 backdrop-blur-sm border-r border-gray-800 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 bg-gradient-to-r ${agentColor} rounded-lg flex items-center justify-center`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white">{agentName}</h2>
            <p className="text-xs text-gray-400">Chat History</p>
          </div>
        </div>
        <Button
          onClick={onNewChat}
          className={`w-full bg-gradient-to-r ${agentColor} hover:opacity-90 text-white mb-3`}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search chats..."
            className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                variant={currentChat?.id === chat.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left p-3 h-auto ${
                  currentChat?.id === chat.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
                onClick={() => onChatSelect(chat)}
              >
                <div className="flex items-start gap-3 w-full">
                  <MessageCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs opacity-70">{formatDate(chat.updatedAt)}</p>
                    <p className="text-xs opacity-50">{chat.messages.length} messages</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}

          {chats.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chats yet</p>
              <p className="text-xs">Start a conversation with {agentName}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  )
}
