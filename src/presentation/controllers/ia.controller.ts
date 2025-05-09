import { Request, Response } from 'express';
import {
  CreateEthicalRulesUseCase,
  GenerateCompletionUseCase,
  GetEvaluacionByIdUseCase,
  GetPromptsByEvaluatorIdUseCase,
  GetEvaluacionesByUserUseCase,
  UpdateEvaluacionUseCase,
  deleteEthicalRulesByEvaluationIdUseCase,
} from '../../application';
import { EvaluatePipelineUseCase } from '../../application/useCases/groq/evaluatePipeline.useCase';

export class IAController {
  private readonly pipelineUC: EvaluatePipelineUseCase;

  constructor(
    createNormsUC: CreateEthicalRulesUseCase,
    generateLLMUC: GenerateCompletionUseCase,
    getEvalByIdUC: GetEvaluacionByIdUseCase,
    getPromptsUC: GetPromptsByEvaluatorIdUseCase,
    getEvalsByUserUC: GetEvaluacionesByUserUseCase,
    updateEvalUC: UpdateEvaluacionUseCase,
    deleteNormsUC: deleteEthicalRulesByEvaluationIdUseCase,

    /* updateApiKey: UpdateEvaluacionUseCase, */
  ) {
    this.pipelineUC = new EvaluatePipelineUseCase(
      getEvalByIdUC,
      getEvalsByUserUC,
      getPromptsUC,
      generateLLMUC,
      deleteNormsUC,
      createNormsUC,
      updateEvalUC,
    );
  }

  /** Primera evaluación */
  public evaluate = async (req: Request, res: Response) => {
    try {
      console.log("En el controlador ---------------------->", req.body); 
      await this.pipelineUC.execute({
        evaluatorId: req.user!.id,
        evaluationId: req.body.evaluationId,
        cleanNormsBefore: false,
      });
      res.json({ success: true, message: 'Evaluación procesada con éxito' });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message ?? 'Error' });
    }
  };

  /** Re-evaluación */
  public reEvaluate = async (req: Request, res: Response) => {
    try {
      await this.pipelineUC.execute({
        evaluatorId: req.user!.id,
        evaluationId: req.body.evaluationId,
        cleanNormsBefore: true,
      });
      res.json({ success: true, message: 'Re-evaluación exitosa' });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message ?? 'Error' });
    }
  };


}
