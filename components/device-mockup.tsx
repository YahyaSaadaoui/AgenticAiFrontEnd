"use client"
import { motion } from "framer-motion"
import { Bot, BarChart3, PenTool, Code } from "lucide-react"

export function DeviceMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative"
    >
      {/* Laptop Frame */}
      <div className="relative bg-gray-800 rounded-t-2xl p-4 shadow-2xl border border-gray-700">
        {/* Screen */}
        <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
          {/* Mock Interface */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <span className="text-white font-semibold">AgentHub</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-1/3 bg-gray-900/50 border-r border-gray-800 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-blue-600/20 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-white">DataMind</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg">
                    <PenTool className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">CreativeFlow</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg">
                    <Code className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">CodeCraft</span>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 space-y-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-lg p-2 max-w-xs">
                      <p className="text-xs text-gray-300">
                        Hello! I'm DataMind. I can help you analyze data and generate insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-blue-600 rounded-lg p-2 max-w-xs">
                      <p className="text-xs text-white">Can you analyze my sales data?</p>
                    </div>
                    <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-800">
                  <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-400">Type your message...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Base */}
      <div className="bg-gray-700 h-4 rounded-b-2xl border-t border-gray-600 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center"
      >
        <BarChart3 className="h-4 w-4 text-blue-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
      >
        <PenTool className="h-4 w-4 text-purple-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        className="absolute top-1/2 -right-8 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
      >
        <Code className="h-4 w-4 text-green-400" />
      </motion.div>
    </motion.div>
  )
}
