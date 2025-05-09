import Groq from "groq-sdk";
import config from "./config";

export const groq = new Groq({
  apiKey: config.groq.apiKey
});

export type GroqMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type GroqCompletionOptions = {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  response_format?: { 
    type: "text" | "json_object"; // Solo estos valores permitidos
  };
};