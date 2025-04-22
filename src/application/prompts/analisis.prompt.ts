import { SYSTEM_PROMPT } from "./system";
import { ANALYSIS_QUESTIONS } from "./questions";

export const getAnalysisPrompt = (documentContent: string) => {
  const questionsText = ANALYSIS_QUESTIONS.analysis_questions
    .map(q => `[${q.id}] ${q.question}`)
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
        analysis: ANALYSIS_QUESTIONS.analysis_questions.map(q => ({
          description: "",
          codeNumber: q.id, 
          status: "",
          justificacion: "",
          cita: ""
        })),
      }, null, 2)}
    `
  };
};;