import { Router } from "express";
import {  GroqController } from "../controllers/groq.controller";
import multer from "multer";
import { CreateEvaluacionUseCase, GenerateCompletionUseCase, GetEvaluacionByIdUseCase  } from "../../application";
import { EthicalNormRepository, EvaluacionRepository } from '../../infrastructure';


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

const createEvaluacionUseCase = new CreateEvaluacionUseCase(evaluacionRepository, ethicalNormRepository);
const generateCompletionUseCase = new GenerateCompletionUseCase();
const getEvaluacionByIdUseCase = new GetEvaluacionByIdUseCase(evaluacionRepository);

const groqController = new GroqController(createEvaluacionUseCase, generateCompletionUseCase, getEvaluacionByIdUseCase);

router.post("/completion", upload.single("file"), groqController.generateCompletionController);
router.post("/analisis", groqController.processEvaluationController);

export default router;