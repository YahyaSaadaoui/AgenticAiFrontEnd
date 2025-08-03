"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Users, Sparkles } from "lucide-react"

const values = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant responses from our optimized AI agents",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are encrypted and never stored",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Multiple agents working together for better results",
  },
  {
    icon: Sparkles,
    title: "Continuously Learning",
    description: "Our agents improve with every interaction",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-transparent to-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose AgentHub?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We've built the most advanced AI agent platform that combines specialized intelligence with seamless user
            experience. Each agent is designed to excel in their domain while working together as a unified team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border-white/10 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To democratize access to advanced AI capabilities through specialized agents that understand your unique
                needs. We believe that AI should augment human creativity and productivity, not replace it. Our platform
                is designed to be intuitive, powerful, and accessible to everyone.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
