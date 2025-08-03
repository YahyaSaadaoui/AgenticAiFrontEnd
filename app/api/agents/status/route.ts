import { NextResponse } from "next/server"

// Mock agent status - in real implementation, this would check actual venv status
const agentStatus = {
  "agent-alpha": { status: "online", venv: "alpha-env", lastPing: new Date() },
  "agent-beta": { status: "online", venv: "beta-env", lastPing: new Date() },
  "agent-gamma": { status: "offline", venv: "gamma-env", lastPing: new Date(Date.now() - 3600000) },
}

export async function GET() {
  return NextResponse.json(agentStatus)
}

export async function POST(req: Request) {
  const { agentId, action } = await req.json()

  if (!agentStatus[agentId as keyof typeof agentStatus]) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 })
  }

  // Mock venv operations
  switch (action) {
    case "start":
      agentStatus[agentId as keyof typeof agentStatus].status = "online"
      break
    case "stop":
      agentStatus[agentId as keyof typeof agentStatus].status = "offline"
      break
    case "restart":
      agentStatus[agentId as keyof typeof agentStatus].status = "online"
      agentStatus[agentId as keyof typeof agentStatus].lastPing = new Date()
      break
  }

  return NextResponse.json({
    success: true,
    agent: agentStatus[agentId as keyof typeof agentStatus],
  })
}
