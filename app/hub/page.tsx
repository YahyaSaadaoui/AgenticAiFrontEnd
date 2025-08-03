import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, ArrowRight, Activity } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const agents = [
  {
    id: "agent-alpha",
    name: "Agent Alpha",
    description: "Specialized in data analysis and research tasks",
    status: "online",
    color: "bg-blue-500",
    lastActive: "2 minutes ago",
    specialty: "Data Analysis",
  },
  {
    id: "agent-beta",
    name: "Agent Beta",
    description: "Expert in creative writing and content generation",
    status: "online",
    color: "bg-green-500",
    lastActive: "5 minutes ago",
    specialty: "Content Creation",
  },
  {
    id: "agent-gamma",
    name: "Agent Gamma",
    description: "Focused on code generation and technical solutions",
    status: "online",
    color: "bg-purple-500",
    lastActive: "1 hour ago",
    specialty: "Code Generation",
  },
]

export default function AgentHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Agent Hub</h1>
          <p className="text-xl text-slate-400">Access all your AI agents in one place</p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="hover:shadow-xl transition-all duration-300 border-2 hover:border-slate-600 bg-slate-800/50 border-slate-700"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-4 h-4 rounded-full ${agent.color}`} />
                  <Badge
                    variant={agent.status === "online" ? "default" : "secondary"}
                    className={agent.status === "online" ? "bg-green-500" : ""}
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    {agent.status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-white">{agent.name}</CardTitle>
                <CardDescription className="text-base text-slate-400">{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Specialty:</span>
                    <span className="font-medium text-white">{agent.specialty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Last Active:</span>
                    <span className="font-medium text-white">{agent.lastActive}</span>
                  </div>
                </div>

                <Link href={`/chat/${agent.id}`} className="block">
                  <Button
                    className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={agent.status === "offline"}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start Chatting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
                <div className="text-slate-400">Total Agents</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                <div className="text-slate-400">Online Now</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-slate-400">Available</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
