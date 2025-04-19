import { Request, Response } from "express";
import { GenerateCompletionUseCase } from "../../application/useCases/groq/generateCompletion.useCase";
import { groq, GroqCompletionOptions, GroqMessage } from "../../infrastructure/config/groqClient";
import { readPdfContent } from "../../shared/utils/fileProcessor"; // Función personalizada para leer PDFs

export const generateCompletionController = async (req: Request, res: Response) => {
  try {
    const { model, temperature, max_tokens } = req.body;
    const messages = JSON.parse(req.body.messages || "[]");
    const file = req.file;

    // Procesar el archivo si existe
    let fileContent = "";
    if (file) {
      if (file.mimetype === "application/pdf") {
        fileContent = await readPdfContent(file.buffer);
      } else {
        return res.status(400).json({
          success: false,
          error: "Tipo de archivo no soportado. Solo PDF."
        });
      }
    }

    // Construir mensajes finales
    const finalMessages: GroqMessage[] = [
      ...(messages || []),
      ...(fileContent ? [{
        role: "system",
        content: `Contenido del archivo adjunto:\n${fileContent}`
      }] : [])
    ];

    const useCase = new GenerateCompletionUseCase();
    const completion = await useCase.execute(finalMessages, {
      model,
      temperature: temperature ? parseFloat(temperature) : undefined,
      max_tokens: max_tokens ? parseInt(max_tokens) : undefined
    });

    res.json({
      success: true,
      result: completion.choices[0]?.message?.content || ""
    });
    
  } catch (error) {
    console.error("Error en generación de completación:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    });
  }
};
