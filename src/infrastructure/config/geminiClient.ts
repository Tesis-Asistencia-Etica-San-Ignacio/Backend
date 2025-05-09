import config from "./config";
import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({
  apiKey: config.gemini.apiKey
});


export type GeminiCompletionOptions = {
  model?: string;
  contents: string;
  config?: {
    systemInstruction?: string;
    temperature?: number;
    maxOutputTokens?: number;
  }
};