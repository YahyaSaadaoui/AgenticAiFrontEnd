import { type NextRequest, NextResponse } from "next/server"

// Mock agent data
const agents = [
  { id: "l1-a1", name: "Data Collector", level: 1, status: "active" },
  { id: "l1-a2", name: "Input Validator", level: 1, status: "active" },
  { id: "l2-a1", name: "Pattern Analyzer", level: 2, status: "active" },
  { id: "l3-a1", name: "Strategy Planner", level: 3, status: "active" },
]

export async function GET() {
  return NextResponse.json({ agents })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { agentId, action } = body

  // Mock agent control logic
  const agent = agents.find((a) => a.id === agentId)
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 })
  }

  switch (action) {
    case "start":
      agent.status = "active"
      break
    case "stop":
      agent.status = "inactive"
      break
    case "restart":
      agent.status = "active"
      break
    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  return NextResponse.json({ success: true, agent })
}
