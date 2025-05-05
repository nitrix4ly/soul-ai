"use client"

import { useState, useRef, useEffect } from "react"
import ChatMessage from "./chat-message"
import ChatInput from "./chat-input"
import WelcomeMessage from "./welcome-message"
import { AnimatePresence, motion } from "framer-motion"

export type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isFirstMessage, setIsFirstMessage] = useState(true)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Clear any previous errors
    setError(null)

    // Hide welcome message once user starts chatting
    if (showWelcome) {
      setShowWelcome(false)
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: isFirstMessage ? [] : messages.slice(-10), // Only send history after first message
          isFirstMessage,
        }),
      })

      // No longer the first message
      if (isFirstMessage) {
        setIsFirstMessage(false)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to get response")
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      console.error("Error sending message:", error)
      setError(error.message)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your message right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 to-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showWelcome && <WelcomeMessage />}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center p-2"
          >
            <div className="dot-typing"></div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-sm"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">
              There was a problem connecting to the AI service. Please try again later.
            </span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

      <footer className="text-center text-xs text-gray-500 py-2 bg-white border-t">Developed with ❤️ by Harshit</footer>
    </div>
  )
}
