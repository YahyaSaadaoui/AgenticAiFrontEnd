"use client"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Bot, User, Send, ArrowLeft, Settings, Plus, Paperclip, History } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ChatHistory } from "@/components/chat-history"
import { VoiceRecorder } from "@/components/voice-recorder"

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

const agentData = {
  "agent-alpha": {
    name: "Agent Alpha",
    description: "Data Analysis Specialist",
    color: "bg-blue-500",
    personality: "analytical and precise",
    specialty: "Data Analysis",
  },
  "agent-beta": {
    name: "Agent Beta",
    description: "Creative Content Expert",
    color: "bg-green-500",
    personality: "creative and engaging",
    specialty: "Content Creation",
  },
  "agent-gamma": {
    name: "Agent Gamma",
    description: "Code Generation Master",
    color: "bg-purple-500",
    personality: "technical and solution-focused",
    specialty: "Code Generation",
  },
}

export default function ChatPage({ params }: { params: { agentId: string } }) {
  const agent = agentData[params.agentId as keyof typeof agentData]
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [dailyMessages, setDailyMessages] = useState(3) // User has sent 3 messages today
  const [messageLimit] = useState(7) // Daily limit
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentSession?.messages])

  useEffect(() => {
    // Load chat sessions from localStorage
    const savedSessions = localStorage.getItem(`chat-sessions-${params.agentId}`)
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
      setChatSessions(sessions)
      if (sessions.length > 0) {
        setCurrentSession(sessions[0])
      }
    }
  }, [params.agentId])

  const saveSessions = (sessions: ChatSession[]) => {
    localStorage.setItem(`chat-sessions-${params.agentId}`, JSON.stringify(sessions))
  }

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const updatedSessions = [newSession, ...chatSessions]
    setChatSessions(updatedSessions)
    setCurrentSession(newSession)
    saveSessions(updatedSessions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || dailyMessages >= messageLimit) return

    if (!currentSession) {
      createNewChat()
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    const updatedMessages = [...currentSession.messages, userMessage]
    const updatedSession = {
      ...currentSession,
      messages: updatedMessages,
      title: currentSession.title === "New Chat" ? input.trim().slice(0, 30) + "..." : currentSession.title,
      updatedAt: new Date(),
    }

    setCurrentSession(updatedSession)
    setInput("")
    setIsLoading(true)
    setDailyMessages((prev) => prev + 1)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          agentId: params.agentId,
          agentName: agent?.name,
          agentPersonality: agent?.personality,
          agentSpecialty: agent?.specialty,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""

      const assistantMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      }

      const messagesWithAssistant = [...updatedMessages, assistantMessageObj]
      const sessionWithAssistant = {
        ...updatedSession,
        messages: messagesWithAssistant,
      }
      setCurrentSession(sessionWithAssistant)

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const data = JSON.parse(line.slice(2))
                if (data.type === "text-delta" && data.textDelta) {
                  assistantMessage += data.textDelta
                  const updatedMessagesWithStream = messagesWithAssistant.map((msg) =>
                    msg.id === assistantMessageObj.id ? { ...msg, content: assistantMessage } : msg,
                  )
                  setCurrentSession({
                    ...sessionWithAssistant,
                    messages: updatedMessagesWithStream,
                  })
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }

      // Save final session
      const finalSession = {
        ...sessionWithAssistant,
        messages: messagesWithAssistant.map((msg) =>
          msg.id === assistantMessageObj.id ? { ...msg, content: assistantMessage } : msg,
        ),
      }
      const updatedSessions = chatSessions.map((session) => (session.id === finalSession.id ? finalSession : session))
      setChatSessions(updatedSessions)
      saveSessions(updatedSessions)
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again.",
        timestamp: new Date(),
      }
      const errorSession = {
        ...updatedSession,
        messages: [...updatedMessages, errorMessage],
      }
      setCurrentSession(errorSession)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && currentSession) {
      const mediaMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        media: {
          type: file.type.startsWith("image/") ? "image" : "file",
          url: URL.createObjectURL(file),
          name: file.name,
        },
      }

      const updatedSession = {
        ...currentSession,
        messages: [...currentSession.messages, mediaMessage],
        updatedAt: new Date(),
      }
      setCurrentSession(updatedSession)
    }
  }

  const handleVoiceRecording = (audioBlob: Blob) => {
    if (currentSession) {
      const audioMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: "Voice message",
        timestamp: new Date(),
        media: {
          type: "audio",
          url: URL.createObjectURL(audioBlob),
          name: "voice-message.wav",
        },
      }

      const updatedSession = {
        ...currentSession,
        messages: [...currentSession.messages, audioMessage],
        updatedAt: new Date(),
      }
      setCurrentSession(updatedSession)
    }
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Agent Not Found</h1>
          <Link href="/hub">
            <Button>Back to Hub</Button>
          </Link>
        </div>
      </div>
    )
  }

  const remainingMessages = messageLimit - dailyMessages

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 border-r border-slate-700 overflow-hidden"
            >
              <ChatHistory
                sessions={chatSessions}
                currentSession={currentSession}
                onSelectSession={setCurrentSession}
                onNewChat={createNewChat}
                agentName={agent.name}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-slate-800/50 border-b border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-slate-300 hover:text-white"
                >
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
                <Link href="/hub">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Hub
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${agent.color}`} />
                <div>
                  <h1 className="text-lg font-semibold text-white">{agent.name}</h1>
                  <p className="text-sm text-slate-400">{agent.description}</p>
                </div>
                <Badge variant={isConnected ? "default" : "secondary"} className="ml-auto">
                  {isConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-600">
                  {remainingMessages} messages left
                </Badge>
                <Button variant="ghost" size="sm" onClick={createNewChat} className="text-slate-300 hover:text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!currentSession || currentSession.messages.length === 0 ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-full ${agent.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <Bot className="h-8 w-8 text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg font-semibold text-white mb-2"
                >
                  Welcome to {agent.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-slate-400 max-w-md mx-auto"
                >
                  I'm your {agent.specialty.toLowerCase()} specialist. How can I help you today?
                </motion.p>
              </div>
            ) : (
              currentSession.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div
                      className={`w-8 h-8 rounded-full ${agent.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                        : "bg-slate-800/50 text-white border border-slate-700 rounded-bl-md"
                    }`}
                  >
                    {message.media && (
                      <div className="mb-2">
                        {message.media.type === "image" && (
                          <img
                            src={message.media.url || "/placeholder.svg"}
                            alt={message.media.name}
                            className="max-w-full h-auto rounded-lg"
                          />
                        )}
                        {message.media.type === "audio" && (
                          <audio controls className="w-full">
                            <source src={message.media.url} type="audio/wav" />
                          </audio>
                        )}
                        {message.media.type === "file" && (
                          <div className="flex items-center gap-2 p-2 bg-slate-700 rounded">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm">{message.media.name}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className={`w-8 h-8 rounded-full ${agent.color} flex items-center justify-center`}>
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl rounded-bl-md border border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-400">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-slate-800/50 border-t border-slate-700 p-6">
            {remainingMessages <= 0 && (
              <div className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">
                  You've reached your daily message limit.
                  <Link href="/pricing" className="underline ml-1">
                    Upgrade your plan
                  </Link>{" "}
                  or wait until tomorrow.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message ${agent.name}...`}
                    disabled={isLoading || !isConnected || remainingMessages <= 0}
                    className="min-h-[60px] bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none pr-24"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSubmit(e)
                      }
                    }}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <VoiceRecorder
                      onRecordingComplete={handleVoiceRecording}
                      isRecording={isRecording}
                      setIsRecording={setIsRecording}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim() || !isConnected || remainingMessages <= 0}
                  className="h-[60px] px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{isConnected ? "Connected to virtual environment" : "Disconnected"}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
