import config from "./config";
import { GoogleGenAI } from "@google/genai";

export const gemini = new GoogleGenAI({
  apiKey: config.gemini.apiKey
});

//--------------------- Esto es para lo que responde los modelos disponibles de Gemini

export interface GeminiModel {
  name: string;
  version: string;
  displayName: string;
  description: string;
  inputTokenLimit: number;
  outputTokenLimit: number;
  supportedGenerationMethods: string[];
  temperature: number;
  topP: number;
  topK: number;
  maxTemperature?: number;
}

// Interfaz para la respuesta de la API
export interface GeminiApiResponse {
  models: GeminiModel[];
}