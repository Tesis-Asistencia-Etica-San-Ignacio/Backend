import { gemini, GeminiCompletionOptions } from "../../infrastructure/config/geminiClient";

export async function sendGeminiCompletion( options : GeminiCompletionOptions
) {
  const response = await gemini.models.generateContent({
    model: options.model ||"gemini-2.5-pro-preview-05-06", //Experimental: gemini-2.5-pro-exp-03-25
    contents: options.contents,
    config : {
      temperature: options.config?.temperature ?? 0.5,
      maxOutputTokens: options.config?.maxOutputTokens ?? 4096,
      systemInstruction: options.config?.systemInstruction
    }
  });
  console.log(response.text);

  return response.text
}

