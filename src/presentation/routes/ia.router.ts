import { Router } from "express";
import { IAController } from "../controllers/ia.controller";
import multer from "multer";
import {
  CreateEvaluacionUseCase, 
  GenerateCompletionUseCase, 
  GetEvaluacionByIdUseCase, 
  GetPromptsByEvaluatorIdUseCase,
  GetEvaluacionesByUserUseCase,
  UpdateEvaluacionUseCase,
} from "../../application";
import { EthicalNormRepository, EvaluacionRepository, PromptRepository } from '../../infrastructure';
import { validateRoleMiddleware } from "../middleware/jwtMiddleware";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Límite de 10MB
    files: 1 // Solo permite 1 archivo
  }
});

const evaluacionRepository = new EvaluacionRepository();
const ethicalNormRepository = new EthicalNormRepository();
const promptRepository = new PromptRepository();

const createEvaluacionUseCase = new CreateEvaluacionUseCase(evaluacionRepository, ethicalNormRepository);
const generateCompletionUseCase = new GenerateCompletionUseCase();
const getEvaluacionByIdUseCase = new GetEvaluacionByIdUseCase(evaluacionRepository);
const getPromptsByEvaluatorIdUseCase = new GetPromptsByEvaluatorIdUseCase(promptRepository);
const getEvaluacionesByUserUseCase = new GetEvaluacionesByUserUseCase(evaluacionRepository);
const updateEvaluacionUseCase = new UpdateEvaluacionUseCase(evaluacionRepository);

const groqController = new IAController(createEvaluacionUseCase, 
  generateCompletionUseCase, 
  getEvaluacionByIdUseCase, 
  getPromptsByEvaluatorIdUseCase,
  getEvaluacionesByUserUseCase,
  updateEvaluacionUseCase
);

router.post("/completion", upload.single("file"), groqController.generateCompletionController);
router.post("/analisis", validateRoleMiddleware(["EVALUADOR"]), groqController.processEvaluationController);

export default router;