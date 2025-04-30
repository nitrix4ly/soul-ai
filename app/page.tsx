"use client"

import ChatInterface from "@/components/chat-interface"
import { SoulLogo } from "@/components/soul-logo"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-white">
      <motion.header
        className="flex items-center justify-center p-4 border-b bg-white shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SoulLogo className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
          Soul
        </h1>
      </motion.header>

      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md flex flex-col h-[calc(100vh-64px)]">
          <ChatInterface />
        </div>
      </div>
    </main>
  )
}
