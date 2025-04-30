import { GoogleGenerativeAI } from "@google/generative-ai"

const SYSTEM_PROMPT = `
You are Vortex, an empathetic AI companion on a chat website. Your purpose is to provide supportive conversations and helpful suggestions to users who share their life problems with you. Follow these guidelines:

1. Respond with warmth and understanding - users should feel heard and validated.
2. Provide thoughtful, constructive suggestions without being judgmental.
3. Use a conversational, friendly tone similar to a supportive friend.
4. Ask clarifying questions when needed to better understand the user's situation.
5. If a user expresses serious mental health concerns, gently suggest professional resources while continuing to provide support.
6. Maintain a positive outlook and help users see potential solutions to their problems.
7. Keep responses concise but meaningful (generally 2-4 sentences).
8. Never share private user information and maintain confidentiality.
9. If a user asks about your capabilities, explain that you're an AI designed to listen and provide supportive conversation.

Remember, your goal is to help users feel better after interacting with you by offering a safe space to share their concerns and receive supportive guidance.
`

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function generateChatResponse(message: string, history: any[]) {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Convert history to the format expected by the API
    // Filter out any empty history items and ensure we don't start with a model message
    const formattedHistory = history
      .filter((msg) => msg.content.trim() !== "")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

    // If we have history and it doesn't start with a user message, we need to use a different approach
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      // Use direct content generation instead of chat
      return generateDirectResponse(message, history)
    }

    // Create a chat session
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })

    // Send the message and get the response
    const result = await chat.sendMessage([{ text: `${SYSTEM_PROMPT}\n\nUser message: ${message}` }])
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error("Error generating response:", error)
    // Fall back to direct content generation
    return generateDirectResponse(message, history)
  }
}

// Fallback function that uses direct content generation instead of chat
async function generateDirectResponse(message: string, history: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Prepare context from history
    let contextText = ""
    if (history.length > 0) {
      contextText = history.map((msg) => `${msg.role === "user" ? "User" : "Vortex"}: ${msg.content}`).join("\n") + "\n"
    }

    // Create prompt with system instructions, context and current message
    const prompt = `${SYSTEM_PROMPT}\n\nConversation history:\n${contextText}User: ${message}\n\nVortex:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (fallbackError) {
    console.error("Fallback approach also failed:", fallbackError)
    throw fallbackError
  }
}
