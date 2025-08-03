"use client"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Code, PenTool, BarChart3, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { DeviceMockup } from "@/components/device-mockup"
import { EarthModel } from "@/components/earth-model"
import { FeatureSection } from "@/components/feature-section"
import { AboutSection } from "@/components/about-section"

const agents = [
  {
    id: "agent1",
    name: "DataMind",
    icon: BarChart3,
    description: "Advanced data analysis and insights generation. Transform raw data into actionable intelligence.",
    color: "from-blue-500 to-cyan-500",
    features: ["Statistical Analysis", "Data Visualization", "Predictive Modeling", "Report Generation"],
  },
  {
    id: "agent2",
    name: "CreativeFlow",
    icon: PenTool,
    description: "Creative content generation and ideation. From copywriting to creative concepts.",
    color: "from-purple-500 to-pink-500",
    features: ["Content Writing", "Creative Ideation", "Brand Strategy", "Social Media Content"],
  },
  {
    id: "agent3",
    name: "CodeCraft",
    icon: Code,
    description: "Intelligent code generation and development assistance. Build faster, debug smarter.",
    color: "from-green-500 to-emerald-500",
    features: ["Code Generation", "Bug Detection", "Architecture Design", "Code Review"],
  },
]

export default function HomePage() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Three Specialized AI Agents</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              Meet Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              Three specialized AI agents working together to transform your workflow. Data analysis, creative content,
              and code generation - all in one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/agent1">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg group"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToAbout}
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Device mockup and Earth */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <DeviceMockup />
            </div>
            <div className="absolute -top-20 -right-20 w-96 h-96 opacity-60">
              <EarthModel />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
            onClick={scrollToAbout}
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Agent Feature Sections */}
      <section className="py-20 space-y-32">
        {agents.map((agent, index) => (
          <FeatureSection key={agent.id} agent={agent} index={index} isReversed={index % 2 === 1} />
        ))}
      </section>

      {/* About Section */}
      <AboutSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users already leveraging the power of specialized AI agents
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/agent1">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                >
                  Try Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
