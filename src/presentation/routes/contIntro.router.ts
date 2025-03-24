import { Router } from 'express';
import { ContIntroController } from '../../presentation';
import { ContIntroRepository } from '../../infrastructure';
import {
  CreateContIntroUseCase,
  GetAllContIntrosUseCase,
  GetContIntroByIdUseCase,
  UpdateContIntroUseCase,
  DeleteContIntroUseCase,
} from '../../application';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

const router = Router();

const contIntroRepository = new ContIntroRepository();
const createContIntroUseCase = new CreateContIntroUseCase(contIntroRepository);
const getAllContIntrosUseCase = new GetAllContIntrosUseCase(contIntroRepository);
const getContIntroByIdUseCase = new GetContIntroByIdUseCase(contIntroRepository);
const updateContIntroUseCase = new UpdateContIntroUseCase(contIntroRepository);
const deleteContIntroUseCase = new DeleteContIntroUseCase(contIntroRepository);

const contIntroController = new ContIntroController(
  createContIntroUseCase,
  getAllContIntrosUseCase,
  getContIntroByIdUseCase,
  updateContIntroUseCase,
  deleteContIntroUseCase
);

router.get('/', validateRoleMiddleware(['EVALUADOR']), contIntroController.getAll);
router.get('/:id', validateRoleMiddleware(['EVALUADOR']), contIntroController.getById);
router.post('/', validateRoleMiddleware(['EVALUADOR']), contIntroController.create);
router.patch('/:id', validateRoleMiddleware(['EVALUADOR']), contIntroController.update);
router.delete('/:id', validateRoleMiddleware(['EVALUADOR']), contIntroController.delete);

export default router;
