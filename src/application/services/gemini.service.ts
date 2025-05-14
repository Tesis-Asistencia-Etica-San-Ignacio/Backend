import { getGeminiClient } from "../../infrastructure/config/geminiClient";
import { IaOptionsDto } from "../dtos";

export async function sendGeminiCompletion( ia : IaOptionsDto
) {
  try {
    const gemini = getGeminiClient();
    const response = await gemini.models.generateContent({
      model: ia.model || "gemini-2.0-flash", //Experimental: gemini-2.5-pro-exp-03-25
      contents: ia.contents,
      config : {
        temperature: ia.temperature ?? 0.5,
        maxOutputTokens: ia.maxOutputTokens ?? 4096,
        systemInstruction: ia.systemInstruction,
        responseMimeType: 'application/json',
      }
    });
    return response.text
  } catch (error) {
    throw new Error(`Gemini API Error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

