"use client"
import { motion } from "framer-motion"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check } from "lucide-react"

interface Agent {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  color: string
  features: string[]
}

interface FeatureSectionProps {
  agent: Agent
  index: number
  isReversed: boolean
}

export function FeatureSection({ agent, index, isReversed }: FeatureSectionProps) {
  const Icon = agent.icon

  return (
    <section className="container mx-auto px-4">
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:grid-flow-col-dense" : ""}`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={`space-y-6 ${isReversed ? "lg:col-start-2" : ""}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
          >
            <div className={`p-2 bg-gradient-to-r ${agent.color} rounded-lg`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm text-gray-300">Agent {index + 1}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold"
          >
            {agent.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            {agent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {agent.features.map((feature, featureIndex) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + featureIndex * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className={`p-1 bg-gradient-to-r ${agent.color} rounded-full`}>
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <Link href={`/${agent.id}`}>
              <Button
                size="lg"
                className={`bg-gradient-to-r ${agent.color} hover:scale-105 transition-transform text-white px-8 py-4 text-lg group`}
              >
                Explore {agent.name}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className={`${isReversed ? "lg:col-start-1" : ""}`}
        >
          <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
            <CardContent className="p-8">
              <div className="relative">
                {/* Main icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-24 h-24 bg-gradient-to-r ${agent.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <Icon className="h-12 w-12 text-white" />
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-r ${agent.color} opacity-20 rounded-lg`}
                ></motion.div>
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  className={`absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-r ${agent.color} opacity-30 rounded-full`}
                ></motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  className={`absolute top-1/2 right-1/4 w-6 h-6 bg-gradient-to-r ${agent.color} opacity-40 rounded-full`}
                ></motion.div>

                {/* Mock interface elements */}
                <div className="space-y-3 mt-8">
                  <div className="h-2 bg-white/10 rounded-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                  <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
