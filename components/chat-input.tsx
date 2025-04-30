"use client"

import { useState, type FormEvent, type KeyboardEvent, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage("")
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [message])

  return (
    <motion.div
      className="border-t bg-white p-3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div
          className={`flex-1 relative ${isFocused ? "ring-2 ring-purple-300" : ""} rounded-lg transition-all duration-200`}
        >
          <textarea
            ref={textareaRef}
            className="w-full resize-none border rounded-lg p-3 pr-10 focus:outline-none focus:border-purple-400 max-h-32 transition-colors duration-200"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        <motion.button
          type="submit"
          className={`p-3 rounded-full ${
            message.trim() && !isLoading
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          } transition-all duration-200`}
          disabled={!message.trim() || isLoading}
          whileTap={{ scale: 0.95 }}
          whileHover={message.trim() && !isLoading ? { scale: 1.05 } : {}}
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </form>
    </motion.div>
  )
}
