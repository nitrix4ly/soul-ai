"use client"

import { useState } from "react"
import type { Message } from "./chat-interface"
import { SoulLogo } from "./soul-logo"
import { User } from "lucide-react"

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-start max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}>
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
            isUser ? "ml-2" : "mr-2"
          } transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
        >
          {isUser ? (
            <div className="bg-purple-100 rounded-full p-1 shadow-sm">
              <User className="h-6 w-6 text-purple-800" />
            </div>
          ) : (
            <div className="rounded-full shadow-sm overflow-hidden">
              <SoulLogo className="h-8 w-8" />
            </div>
          )}
        </div>

        <div
          className={`p-3 rounded-2xl shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-tr-none"
              : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
          } transition-all duration-300 ${isHovered ? "shadow-md" : ""}`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <div className={`text-xs mt-1 ${isUser ? "text-purple-200" : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}
