import { Router } from 'express';
import { EvaluacionController } from '../controllers';
import { EthicalNormRepository, EvaluacionRepository } from '../../infrastructure';

import {
  CreateEvaluacionUseCase,
  GetAllEvaluacionsUseCase,
  GetEvaluacionByIdUseCase,
  UpdateEvaluacionUseCase,
  DeleteEvaluacionUseCase,
  GetEvaluacionesByUserUseCase,
} from '../../application';

import {validateRoleMiddleware } from '../../presentation/middleware/jwtMiddleware';

const router = Router();

// Instanciamos el repositorio
const evaluacionRepository = new EvaluacionRepository();
const ethicalNormRepository = new EthicalNormRepository(); 

// Instanciamos los casos de uso
const createEvaluacionUseCase = new CreateEvaluacionUseCase(evaluacionRepository, ethicalNormRepository);
const getAllEvaluacionsUseCase = new GetAllEvaluacionsUseCase(evaluacionRepository);
const getEvaluacionByIdUseCase = new GetEvaluacionByIdUseCase(evaluacionRepository);
const updateEvaluacionUseCase = new UpdateEvaluacionUseCase(evaluacionRepository);
const deleteEvaluacionUseCase = new DeleteEvaluacionUseCase(evaluacionRepository, ethicalNormRepository);
const getEvaluacionesByUserUseCase = new GetEvaluacionesByUserUseCase(evaluacionRepository);


// Instanciamos el controlador con los casos de uso
const evaluacionController = new EvaluacionController(
  createEvaluacionUseCase,
  getAllEvaluacionsUseCase,
  getEvaluacionByIdUseCase,
  updateEvaluacionUseCase,
  deleteEvaluacionUseCase,
  getEvaluacionesByUserUseCase,
);

// Definimos las rutas
router.get('/my', validateRoleMiddleware(['EVALUADOR']), evaluacionController.getByUser);
router.get('/:id', validateRoleMiddleware(['INVESTIGADOR', 'EVALUADOR']), evaluacionController.getById);
router.get('/', validateRoleMiddleware(['INVESTIGADOR', 'EVALUADOR']), evaluacionController.getAll);
router.post('/', validateRoleMiddleware(['INVESTIGADOR', 'EVALUADOR']), evaluacionController.create);
router.patch('/:id', validateRoleMiddleware(['INVESTIGADOR', 'EVALUADOR']), evaluacionController.update);
router.delete('/:id', validateRoleMiddleware(['INVESTIGADOR', 'EVALUADOR']), evaluacionController.delete);


export default router;
