import { Router } from 'express';
import { IAController } from '../controllers/ia.controller';
import {
  CreateEthicalRulesUseCase,
  GenerateCompletionUseCase,
  GetEvaluacionByIdUseCase,
  GetPromptsByEvaluatorIdUseCase,
  GetEvaluacionesByUserUseCase,
  UpdateEvaluacionUseCase,
  deleteEthicalRulesByEvaluationIdUseCase,
  ObtainModelsUseCase
} from '../../application';
import {
  EthicalNormRepository,
  EvaluacionRepository,
  PromptRepository,
} from '../../infrastructure';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

const router = Router();

const evaluacionRepo = new EvaluacionRepository();
const ethicalRepo = new EthicalNormRepository();
const promptRepo = new PromptRepository();

const createNormsUC = new CreateEthicalRulesUseCase(ethicalRepo);
const generateLLMUC = new GenerateCompletionUseCase();
const getEvalByIdUC = new GetEvaluacionByIdUseCase(evaluacionRepo);
const getPromptsUC = new GetPromptsByEvaluatorIdUseCase(promptRepo);
const getEvalsByUserUC = new GetEvaluacionesByUserUseCase(evaluacionRepo);
const updateEvalUC = new UpdateEvaluacionUseCase(evaluacionRepo);
const deleteNormsUC = new deleteEthicalRulesByEvaluationIdUseCase(ethicalRepo);
const ObtainModelsUC = new ObtainModelsUseCase();

/* const updateApiKey = new UpdateEvaluacionUseCase(); */


const iaController = new IAController(
  createNormsUC,
  generateLLMUC,
  getEvalByIdUC,
  getPromptsUC,
  getEvalsByUserUC,
  updateEvalUC,
  deleteNormsUC,
  ObtainModelsUC,
  /* updateApiKey, */
);

/* Rutas */
router.get(
  '/models',
  validateRoleMiddleware(['EVALUADOR']),
  iaController.getModels,
);

router.post(
  '/evaluate',
  validateRoleMiddleware(['EVALUADOR']),
  iaController.evaluate,
);

router.post(
  '/re-evaluate',
  validateRoleMiddleware(['EVALUADOR']),
  iaController.reEvaluate,
);

router.patch(
  '/config/apikey',
  validateRoleMiddleware(['ADMIN']),
  
);

export default router;
