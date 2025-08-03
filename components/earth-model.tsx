"use client"
import { useRef } from "react"
import { motion } from "framer-motion"

export function EarthModel() {
  const earthRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={earthRef}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className="w-full h-full relative"
    >
      {/* Earth sphere with gradient */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 relative overflow-hidden shadow-2xl">
        {/* Continents overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-16 h-12 bg-green-400 rounded-full transform rotate-12"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-8 bg-green-400 rounded-full transform -rotate-12"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-10 bg-green-400 rounded-full transform rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/3 w-14 h-6 bg-green-400 rounded-full transform -rotate-30"></div>
        </div>

        {/* Atmosphere glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>

        {/* Floating particles */}
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 left-1/2 w-2 h-2 bg-white rounded-full"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -8, 0],
            y: [0, 8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, 5, 0],
            y: [0, -10, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full"
        ></motion.div>
      </div>

      {/* Orbital rings */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0 border border-white/10 rounded-full"
        style={{ transform: "rotateX(75deg)" }}
      ></motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-2 border border-white/5 rounded-full"
        style={{ transform: "rotateX(60deg)" }}
      ></motion.div>
    </motion.div>
  )
}
