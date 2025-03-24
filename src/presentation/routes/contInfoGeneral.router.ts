import { Router } from 'express';
import { ContInfoGeneralController } from '../../presentation';
import { ContInfoGeneralRepository } from '../../infrastructure';
import {
  CreateContInfoGeneralUseCase,
  GetAllContInfoGeneralsUseCase,
  GetContInfoGeneralByIdUseCase,
  UpdateContInfoGeneralUseCase,
  DeleteContInfoGeneralUseCase,
} from '../../application';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

const router = Router();

const contInfoGeneralRepository = new ContInfoGeneralRepository();
const createContInfoGeneralUseCase = new CreateContInfoGeneralUseCase(contInfoGeneralRepository);
const getAllContInfoGeneralsUseCase = new GetAllContInfoGeneralsUseCase(contInfoGeneralRepository);
const getContInfoGeneralByIdUseCase = new GetContInfoGeneralByIdUseCase(contInfoGeneralRepository);
const updateContInfoGeneralUseCase = new UpdateContInfoGeneralUseCase(contInfoGeneralRepository);
const deleteContInfoGeneralUseCase = new DeleteContInfoGeneralUseCase(contInfoGeneralRepository);

const contInfoGeneralController = new ContInfoGeneralController(
  createContInfoGeneralUseCase,
  getAllContInfoGeneralsUseCase,
  getContInfoGeneralByIdUseCase,
  updateContInfoGeneralUseCase,
  deleteContInfoGeneralUseCase
);

router.get('/', validateRoleMiddleware(['EVALUADOR']), contInfoGeneralController.getAll);
router.get('/:id', validateRoleMiddleware(['EVALUADOR']), contInfoGeneralController.getById);
router.post('/', validateRoleMiddleware(['EVALUADOR']), contInfoGeneralController.create);
router.patch('/:id', validateRoleMiddleware(['EVALUADOR']), contInfoGeneralController.update);
router.delete('/:id', validateRoleMiddleware(['EVALUADOR']), contInfoGeneralController.delete);

export default router;
