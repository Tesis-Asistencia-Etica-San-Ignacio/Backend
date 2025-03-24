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

import {validateRoleMiddleware } from '../../presentation/middleware/jwtMiddleware';

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
router.get('/', validateRoleMiddleware(['INVESTIGADOR']), evaluacionController.getAll);
router.get('/:id', validateRoleMiddleware(['INVESTIGADOR']), evaluacionController.getById);
router.post('/', validateRoleMiddleware(['INVESTIGADOR']), evaluacionController.create);
router.patch('/:id', validateRoleMiddleware(['INVESTIGADOR']), evaluacionController.update);
router.delete('/:id', validateRoleMiddleware(['INVESTIGADOR']), evaluacionController.delete);

export default router;
