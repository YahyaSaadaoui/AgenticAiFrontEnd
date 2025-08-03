"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Send, Menu, X, Settings } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatMessage } from "@/components/chat-message"

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

export default function Agent1Page() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChat(newChat)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (!currentChat) {
      createNewChat()
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    const updatedMessages = [...currentChat.messages, userMessage]
    const updatedChat = {
      ...currentChat,
      messages: updatedMessages,
      title: currentChat.title === "New Chat" ? input.trim().slice(0, 30) + "..." : currentChat.title,
      updatedAt: new Date(),
    }

    setCurrentChat(updatedChat)
    setChats((prev) => prev.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat)))
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'm DataMind, your data analysis specialist. I can help you analyze data, create visualizations, and generate insights. What specific data analysis task would you like me to help you with?`,
        timestamp: new Date(),
      }

      const finalChat = {
        ...updatedChat,
        messages: [...updatedMessages, assistantMessage],
      }

      setCurrentChat(finalChat)
      setChats((prev) => prev.map((chat) => (chat.id === finalChat.id ? finalChat : chat)))
      setIsLoading(false)
    }, 1000)
  }

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <ChatSidebar
              chats={filteredChats}
              currentChat={currentChat}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onChatSelect={setCurrentChat}
              onNewChat={createNewChat}
              agentName="DataMind"
              agentIcon={BarChart3}
              agentColor="from-blue-500 to-cyan-500"
            />
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-400 hover:text-white lg:hidden"
                >
                  {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">DataMind</h1>
                    <p className="text-sm text-gray-400">Data Analysis Specialist</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            {!currentChat || currentChat.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6"
                >
                  <BarChart3 className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Welcome to DataMind</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                  I'm your data analysis specialist. I can help you analyze data, create visualizations, and generate
                  actionable insights from your datasets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  {[
                    "Analyze sales performance data",
                    "Create data visualizations",
                    "Generate statistical reports",
                    "Identify data trends and patterns",
                  ].map((suggestion, index) => (
                    <motion.div
                      key={suggestion}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-300">{suggestion}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {currentChat.messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    agentIcon={BarChart3}
                    agentColor="from-blue-500 to-cyan-500"
                    index={index}
                  />
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-900/50 rounded-2xl p-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="flex gap-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask DataMind to analyze your data..."
                  className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send your message</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
