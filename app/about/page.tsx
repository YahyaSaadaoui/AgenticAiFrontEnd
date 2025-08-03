"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Users, Zap, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"

const team = [
  {
    name: "Alex Chen",
    role: "AI Research Lead",
    image: "/placeholder.svg?height=200&width=200",
    bio: "PhD in Machine Learning with 8+ years in AI development",
  },
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "UX expert focused on human-AI interaction design",
  },
  {
    name: "Marcus Rodriguez",
    role: "Backend Engineer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Distributed systems architect with cloud expertise",
  },
]

const values = [
  {
    icon: Bot,
    title: "AI-First Approach",
    description: "We believe AI should augment human capabilities, not replace them.",
  },
  {
    icon: Users,
    title: "User-Centric Design",
    description: "Every feature is designed with the user experience in mind.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We're constantly pushing the boundaries of what's possible with AI.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data and conversations are always secure and private.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About AgentHub</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're building the future of AI interaction through specialized agents that understand your unique needs and
            work together to solve complex problems.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
                To democratize access to advanced AI capabilities through intuitive, specialized agents that can handle
                everything from data analysis to creative content generation and code development. We believe that AI
                should be accessible, reliable, and tailored to individual needs.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-slate-400">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-400 mb-3">{member.role}</p>
                    <p className="text-slate-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Our Story</h2>
              <div className="max-w-4xl mx-auto space-y-6 text-slate-300 leading-relaxed">
                <p>
                  AgentHub was born from a simple observation: while AI has become incredibly powerful, most people
                  struggle to harness its full potential. We saw users jumping between different AI tools, each with its
                  own interface and limitations.
                </p>
                <p>
                  Our founders, coming from backgrounds in AI research, product design, and software engineering,
                  decided to create something different. Instead of building another general-purpose AI, we focused on
                  creating specialized agents that excel in specific domains.
                </p>
                <p>
                  Today, AgentHub serves thousands of users worldwide, from data scientists and content creators to
                  developers and entrepreneurs. Our three specialized agents - Alpha, Beta, and Gamma - work together to
                  provide a comprehensive AI experience that adapts to your unique workflow.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
