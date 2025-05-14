import { getGroqClient } from "../../infrastructure/config/groqClient";
import { IaOptionsDto } from "../dtos";

  export async function createGroqChatCompletion(
    ia : IaOptionsDto,
  ) {
    try {
      const groq = getGroqClient();
      const response = await groq.chat.completions.create({
        messages : [{ role: "system", content: ia.systemInstruction }, { role: "user", content: ia.contents }],
        model: ia.model || "deepseek-r1-distill-llama-70b",
        temperature: ia.temperature ?? 0.5,
        max_tokens: ia.maxOutputTokens ?? 4096,
        response_format: ia.responseType || { type: "text" },
      });
      return response.choices[0].message?.content;
    } catch (error) {
      throw new Error(`Groq API Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }