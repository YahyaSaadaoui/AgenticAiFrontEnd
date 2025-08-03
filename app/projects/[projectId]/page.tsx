import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Settings, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"

// Mock data for agents across 3 levels
const agentLevels = [
  {
    level: 1,
    name: "Foundation Level",
    description: "Basic processing and data handling agents",
    agents: [
      { id: "l1-a1", name: "Data Collector", status: "active", type: "collector", uptime: "99.2%" },
      { id: "l1-a2", name: "Input Validator", status: "active", type: "validator", uptime: "98.8%" },
      { id: "l1-a3", name: "Format Parser", status: "inactive", type: "parser", uptime: "97.5%" },
      { id: "l1-a4", name: "Queue Manager", status: "active", type: "manager", uptime: "99.9%" },
    ],
  },
  {
    level: 2,
    name: "Processing Level",
    description: "Advanced analysis and decision-making agents",
    agents: [
      { id: "l2-a1", name: "Pattern Analyzer", status: "active", type: "analyzer", uptime: "98.5%" },
      { id: "l2-a2", name: "Decision Engine", status: "active", type: "engine", uptime: "99.1%" },
      { id: "l2-a3", name: "Context Builder", status: "active", type: "builder", uptime: "97.8%" },
      { id: "l2-a4", name: "Logic Processor", status: "maintenance", type: "processor", uptime: "96.2%" },
    ],
  },
  {
    level: 3,
    name: "Intelligence Level",
    description: "High-level reasoning and orchestration agents",
    agents: [
      { id: "l3-a1", name: "Strategy Planner", status: "active", type: "planner", uptime: "99.7%" },
      { id: "l3-a2", name: "Goal Optimizer", status: "active", type: "optimizer", uptime: "98.9%" },
      { id: "l3-a3", name: "Resource Allocator", status: "active", type: "allocator", uptime: "99.3%" },
      { id: "l3-a4", name: "System Orchestrator", status: "active", type: "orchestrator", uptime: "99.8%" },
    ],
  },
]

const projectData = {
  "project-alpha": {
    name: "Project Alpha",
    description: "Advanced data processing and analysis platform",
    color: "bg-blue-500",
  },
  "project-beta": {
    name: "Project Beta",
    description: "Customer service automation and support system",
    color: "bg-green-500",
  },
  "project-gamma": {
    name: "Project Gamma",
    description: "Content generation and marketing automation",
    color: "bg-purple-500",
  },
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "inactive":
      return "bg-gray-500"
    case "maintenance":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "default"
    case "inactive":
      return "secondary"
    case "maintenance":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = projectData[params.projectId as keyof typeof projectData]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-4 h-4 rounded-full ${project.color}`} />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
              <p className="text-slate-600">{project.description}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="agents">Agent Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            {agentLevels.map((level) => (
              <Card key={level.level}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Level {level.level}: {level.name}
                      </CardTitle>
                      <CardDescription>{level.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      {level.agents.filter((a) => a.status === "active").length}/{level.agents.length} Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {level.agents.map((agent) => (
                      <Card key={agent.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                              <Badge variant={getStatusVariant(agent.status)} className="text-xs">
                                {agent.status}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">{agent.name}</h4>
                              <p className="text-xs text-slate-600 capitalize">{agent.type}</p>
                            </div>
                            <div className="text-xs text-slate-600">Uptime: {agent.uptime}</div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
                                {agent.status === "active" ? (
                                  <Pause className="h-3 w-3" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 px-2 bg-transparent">
                                <Settings className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Average Response Time</span>
                      <span className="font-medium">245ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Success Rate</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Tasks Completed</span>
                      <span className="font-medium">15,432</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">CPU Usage</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Memory Usage</span>
                      <span className="font-medium">4.2GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">API Calls</span>
                      <span className="font-medium">8,921</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Healthy Agents</span>
                      <span className="font-medium text-green-600">10/12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Warning Status</span>
                      <span className="font-medium text-yellow-600">1/12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Critical Issues</span>
                      <span className="font-medium text-red-600">1/12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Configuration</CardTitle>
                <CardDescription>Manage project-wide settings and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline">Configure AI Models</Button>
                <Button variant="outline">Update Environment Variables</Button>
                <Button variant="outline">Manage API Keys</Button>
                <Button variant="outline">Export Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
