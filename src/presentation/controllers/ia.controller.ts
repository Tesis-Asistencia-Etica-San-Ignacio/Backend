import { NextFunction, Request, Response } from "express";
import { GenerateCompletionUseCase } from "../../application/useCases/groq/generateCompletion.useCase";
import { GroqMessage } from "../../infrastructure/config/groqClient";
import { readPdfContent } from "../../shared/utils/fileProcessor"; // Función personalizada para leer PDFs
import { GetEvaluacionByIdUseCase, 
  getFileByNameBuffer, 
  CreateEvaluacionUseCase, 
  GetPromptsByEvaluatorIdUseCase, 
  GetEvaluacionesByUserUseCase,
  UpdateEvaluacionUseCase
} from "../../application";
import { getAnalysisPrompt } from "../../application/prompts/analisis.prompt";
import { parseJson } from '../../shared/utils/jsonParser';

export class IAController {
  constructor(
    private readonly createEvaluacionUseCase: CreateEvaluacionUseCase,
    private readonly generateCompletionUseCase: GenerateCompletionUseCase,
    private readonly getEvaluacionByIdUseCase: GetEvaluacionByIdUseCase,
    private readonly getPromptsByEvaluatorIdUseCase: GetPromptsByEvaluatorIdUseCase,
    private readonly getEvaluacionesByUserUseCase: GetEvaluacionesByUserUseCase,
    private readonly updateEvaluacionUseCase: UpdateEvaluacionUseCase
  ) {}
  
  public generateCompletionController = async (req: Request, res: Response, next : NextFunction) => {
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
  
  public processEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const userId = req.user!.id;
      const { evaluationId } = req.body;
      //console.log("Evaluación recibida:", evaluationId);

      const evaluacionesUsuario = await this.getEvaluacionesByUserUseCase.execute(userId);

      //console.log("Evaluaciones del usuario ", evaluacionesUsuario);

      const existeEvaluacion = evaluacionesUsuario.some(
        (evaluacion) => evaluacion.id.toString() === evaluationId.toString()
      );

      if (!existeEvaluacion) {
        return res.status(404).json({
          success: false,
          error: "Evaluación no encontrada"
        });
      }
      // 2. Obtener la evaluación desde MongoDB
      const evaluation = await this.getEvaluacionByIdUseCase.execute(evaluationId);

      //console.log("Repuesta Mongo: ", evaluation);
      
      if (!evaluation) {
        return res.status(404).json({
          success: false,
          error: "Evaluación no encontrada"
        });
      }

      if(evaluation.estado == "EVALUADO") {
        return res.status(400).json({
          success: false,
          error: "Evaluación ya evaluada"
        });
      }

      // 3. Obtener archivo de MinIO
      const fileName = evaluation.file.split('/').pop() || "";
      //console.log("Archivo recibido:", fileName);
      const fileBuffer = await getFileByNameBuffer(fileName);
  
      // 4. Procesar el archivo
      let fileContent = "";
      if (fileName.endsWith(".pdf")) {
        fileContent = await readPdfContent(fileBuffer);
      } else {
        fileContent = fileBuffer.toString();
      }

      const prompts = await this.getPromptsByEvaluatorIdUseCase.execute(userId);

      if (!prompts) {
        return res.status(404).json({
          success: false,
          error: "Prompts no encontrados"
        });
      }
  
      const { system, user } = getAnalysisPrompt(fileContent, prompts);

      /*
      Esto imprime el prompt
      console.log("Prompt --------------------------------/")
      console.log(system);
      console.log(user);
      console.log("Prompt --------------------------------/")
      */

      // Ejecutar Groq
      const completion = await this.generateCompletionUseCase.execute([
        { role: "system", content: system },
        { role: "user", content: user }
      ], {
        model: "llama-3.3-70b-versatile",  // Modelo de 132k tokens
        temperature: 0.2,
        response_format: { type: "json_object" }
      });
  
      const rawResponse = completion.choices[0]?.message?.content;
      if (!rawResponse) {
        throw new Error("No se recibió respuesta del modelo");
      } 

      // console.log("Respuesta recibida del modelo:", rawResponse); Muestra la respuesta del modelo
  
      const parsedAnalysis = parseJson(rawResponse);
      if (typeof parsedAnalysis !== 'object' || !parsedAnalysis.analysis) {
        throw new Error('La estructura de la respuesta es incorrecta');
      }
      
      //Esto muestra la respuesta parseada
      /*
      console.log("GROQ --------------------------------/")
      console.log("Respuesta parseada del modelo:", parsedAnalysis.analysis);
      console.log("GROQ --------------------------------/")*/
      
      await this.createEvaluacionUseCase.crearNormasEticasBase(evaluationId, parsedAnalysis.analysis);

      await this.updateEvaluacionUseCase.execute(evaluationId, { estado: "EVALUADO" });

      res.json({ success: true, "message": "Evaluación procesada con exito" });
  
    } catch (error) {
      console.error("Error en procesamiento de evaluación:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

}





