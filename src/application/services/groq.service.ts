import { groq, GroqCompletionOptions, GroqMessage } from "../../infrastructure/config/groqClient";

export async function createGroqChatCompletion(
    messages: GroqMessage[],
    options: GroqCompletionOptions = {}
  ) {
    try {
      return await groq.chat.completions.create({
        messages,
        model: options.model || "llama3-70b-8192",
        temperature: options.temperature ?? 0.5,
        max_tokens: options.max_tokens ?? 4096,
      });
    } catch (error) {
      throw new Error(`Groq API Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }