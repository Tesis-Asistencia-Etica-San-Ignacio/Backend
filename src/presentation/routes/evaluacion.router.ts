import { Router } from 'express';
import { EvaluacionController } from '../controllers';
import { EvaluacionRepository } from '../../infrastructure';

import {
  CreateEvaluacionUseCase,
  GetAllEvaluacionsUseCase,
  GetEvaluacionByIdUseCase,
  UpdateEvaluacionUseCase,
  DeleteEvaluacionUseCase,
} from '../../application';

const router = Router();

// Instanciamos el repositorio
const evaluacionRepository = new EvaluacionRepository();

// Instanciamos los casos de uso
const createEvaluacionUseCase = new CreateEvaluacionUseCase(evaluacionRepository);
const getAllEvaluacionsUseCase = new GetAllEvaluacionsUseCase(evaluacionRepository);
const getEvaluacionByIdUseCase = new GetEvaluacionByIdUseCase(evaluacionRepository);
const updateEvaluacionUseCase = new UpdateEvaluacionUseCase(evaluacionRepository);
const deleteEvaluacionUseCase = new DeleteEvaluacionUseCase(evaluacionRepository);

// Instanciamos el controlador con los casos de uso
const evaluacionController = new EvaluacionController(
  createEvaluacionUseCase,
  getAllEvaluacionsUseCase,
  getEvaluacionByIdUseCase,
  updateEvaluacionUseCase,
  deleteEvaluacionUseCase
);

// Definimos las rutas
router.get('/', evaluacionController.getAll);
router.get('/:id', evaluacionController.getById);
router.post('/', evaluacionController.create);
router.patch('/:id', evaluacionController.update);
router.delete('/:id', evaluacionController.delete);

export default router;
