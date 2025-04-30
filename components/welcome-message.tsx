"use client"

import { motion } from "framer-motion"
import { SoulLogo } from "./soul-logo"

export default function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 text-center space-y-4 bg-white rounded-lg shadow-sm mb-6 border border-purple-100"
    >
      <SoulLogo className="h-16 w-16 animate-pulse" />
      <h2 className="text-xl font-semibold text-purple-800">Welcome to Vortex</h2>
      <p className="text-gray-600">
        I'm your AI companion, here to listen and provide supportive conversation. Feel free to share what's on your
        mind, and I'll do my best to help.
      </p>
      <div className="text-sm text-gray-500 pt-2 border-t w-full">
        <p>Start by typing a message below.</p>
      </div>
      <div className="text-xs text-purple-600 font-medium mt-2">Developed by Harshu</div>
    </motion.div>
  )
}
