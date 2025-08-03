"use client"
import { motion } from "framer-motion"
import type React from "react"

import { User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  agentIcon: React.ComponentType<{ className?: string }>
  agentColor: string
  index: number
}

export function ChatMessage({ message, agentIcon: Icon, agentColor, index }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-start gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      {message.role === "assistant" && (
        <div
          className={`w-8 h-8 bg-gradient-to-r ${agentColor} rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-[70%] p-4 rounded-2xl ${
          message.role === "user"
            ? `bg-gradient-to-r ${agentColor} text-white rounded-br-md`
            : "bg-gray-900/50 text-white border border-gray-800 rounded-bl-md"
        }`}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
      </div>

      {message.role === "user" && (
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </motion.div>
  )
}
