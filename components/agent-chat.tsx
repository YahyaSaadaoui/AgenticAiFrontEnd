"use client"
import { useChat } from "ai/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send } from "lucide-react"

interface AgentChatProps {
  agentId: string
  agentName: string
  agentLevel: number
  agentType: string
}

export function AgentChat({ agentId, agentName, agentLevel, agentType }: AgentChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      agentLevel,
      agentType,
    },
  })

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {agentName}
          </CardTitle>
          <Badge variant="outline">Level {agentLevel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 text-sm">Start a conversation with {agentName}</div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  <span className="text-xs opacity-75">{message.role === "user" ? "You" : agentName}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-900 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={`Message ${agentName}...`}
            disabled={isLoading}
          />
          <Button type="submit" size="sm" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
