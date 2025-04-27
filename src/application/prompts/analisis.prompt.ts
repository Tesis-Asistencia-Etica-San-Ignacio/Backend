import { SYSTEM_PROMPT } from "./system";
import type { PromptResponseDto } from "../dtos/prompt.dto";

export const getAnalysisPrompt = (documentContent: string, prompts : PromptResponseDto[]) => {
  const questionsText = prompts
    .map(q => `[${q.codigo}] ${q.texto}`)
    .join("\n");

  return {
    system: SYSTEM_PROMPT,
    user: `
      DOCUMENTO A ANALIZAR:
      ${documentContent}

      PREGUNTAS:
      ${questionsText}

      FORMATO REQUERIDO (JSON):
      ${JSON.stringify({
        analysis: prompts.map(q => ({
          description: "",
          codeNumber: q.codigo, 
          status: "",
          justificacion: "",
          cita: ""
        })),
      }, null, 2)}
    `
  };
};;