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

router.get('/', contInfoGeneralController.getAll);
router.get('/:id', contInfoGeneralController.getById);
router.post('/', contInfoGeneralController.create);
router.patch('/:id', contInfoGeneralController.update);
router.delete('/:id', contInfoGeneralController.delete);

export default router;
