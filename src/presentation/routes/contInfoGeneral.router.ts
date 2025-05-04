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

router.get('/', validateRoleMiddleware(['INVESTIGADOR']), contInfoGeneralController.getAll);
router.get('/:id', validateRoleMiddleware(['INVESTIGADOR']), contInfoGeneralController.getById);
router.post('/', validateRoleMiddleware(['INVESTIGADOR']), contInfoGeneralController.create);
router.patch('/:id', validateRoleMiddleware(['INVESTIGADOR']), contInfoGeneralController.update);
router.delete('/:id', validateRoleMiddleware(['INVESTIGADOR']), contInfoGeneralController.delete);

export default router;
