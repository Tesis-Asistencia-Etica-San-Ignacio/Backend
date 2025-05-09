import Groq from "groq-sdk";
import config from "./config";

export const groq = new Groq({
  apiKey: config.groq.apiKey
});

// Esto se usa para los modelos disponibles de Groq

export interface GroqModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  active: boolean;
  context_window: number;
  public_apps: any;
  max_completion_tokens: number;
}

// Interfaz para la respuesta de la API de Groq
export interface GroqApiResponse {
  object: string;
  data: GroqModel[];
}