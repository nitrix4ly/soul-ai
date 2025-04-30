import { type NextRequest, NextResponse } from "next/server"
import { generateChatResponse } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { message, history, isFirstMessage } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Format history for the API - only if not the first message
    const formattedHistory = isFirstMessage
      ? []
      : history.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        }))

    const response = await generateChatResponse(message, formattedHistory)

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error("Error in chat API:", error)

    // Create a more user-friendly error message
    let errorMessage = "Failed to process your request"
    if (error.message && error.message.includes("API key")) {
      errorMessage = "There's an issue with the API key configuration"
    } else if (error.message && error.message.includes("not found")) {
      errorMessage = "The AI model is currently unavailable"
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error.message,
      },
      { status: 500 },
    )
  }
}
