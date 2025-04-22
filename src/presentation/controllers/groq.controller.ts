import { Request, Response } from "express";
import { GenerateCompletionUseCase } from "../../application/useCases/groq/generateCompletion.useCase";
import { groq, GroqCompletionOptions, GroqMessage } from "../../infrastructure/config/groqClient";
import { readPdfContent } from "../../shared/utils/fileProcessor"; // Función personalizada para leer PDFs
import { EvaluacionRepository } from "../../infrastructure/database/repositories/evaluation.repository.impl";
import { GetEvaluacionByIdUseCase, getFileByNameBuffer, CreateEvaluacionUseCase} from "../../application";
import { getAnalysisPrompt } from "../../application/prompts/analisis.prompt";
import { parseJson } from '../../shared/utils/jsonParser';

export class GroqController {
  constructor(
    private readonly createEvaluacionUseCase: CreateEvaluacionUseCase,
    private readonly generateCompletionUseCase: GenerateCompletionUseCase,
    private readonly getEvaluacionByIdUseCase: GetEvaluacionByIdUseCase
  ) {}
  
  public generateCompletionController = async (req: Request, res: Response) => {
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
  
  public processEvaluationController = async (req: Request, res: Response) => {
    try {
      // 1. Validar y parsear el DTO

      const { evaluationId } = req.body;
      console.log("Evaluación recibida:", evaluationId);
  
      // 2. Obtener la evaluación desde MongoDB
      const evaluation = await this.getEvaluacionByIdUseCase.execute(evaluationId);
      console.log("Repuesta Mongo: ", evaluation);
      
      if (!evaluation) {
        return res.status(404).json({
          success: false,
          error: "Evaluación no encontrada"
        });
      }
  
      // 3. Obtener archivo de MinIO
      const fileName = evaluation.file.split('/').pop() || "";
      console.log("Archivo recibido:", fileName);
      const fileBuffer = await getFileByNameBuffer(fileName);
  
      // 4. Procesar el archivo
      let fileContent = "";
      if (fileName.endsWith(".pdf")) {
        fileContent = await readPdfContent(fileBuffer);
      } else {
        fileContent = fileBuffer.toString();
      }
  
      const { system, user } = getAnalysisPrompt(fileContent);
  
      // Ejecutar Groq
      const completion = await this.generateCompletionUseCase.execute([
        { role: "system", content: system },
        { role: "user", content: user }
      ], {
        model: "llama-3.1-8b-instant",  // Modelo de 132k tokens
        temperature: 0.2,
        response_format: { type: "json_object" }
      });
  
      const rawResponse = completion.choices[0]?.message?.content;
      if (!rawResponse) {
        throw new Error("No se recibió respuesta del modelo");
      } 
  
      const parsedAnalysis = parseJson(rawResponse);
      if (typeof parsedAnalysis !== 'object' || !parsedAnalysis.analysis) {
        throw new Error('La estructura de la respuesta es incorrecta');
      }
      

      await this.createEvaluacionUseCase.crearNormasEticasBase(evaluationId);
  
  
      
  
      res.json({ success: true, parsedAnalysis });
  
    } catch (error) {
      console.error("Error en procesamiento de evaluación:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

}





