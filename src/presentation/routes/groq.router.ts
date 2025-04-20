import { Router } from "express";
import { generateCompletionController, processEvaluationController } from "../controllers/groq.controller";
import multer from "multer";

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // Límite de 10MB
      files: 1 // Solo permite 1 archivo
    }
  });

router.post("/completion", upload.single("file"), generateCompletionController);
router.post("/analisis", processEvaluationController);

export default router;