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

router.get('/', contIntroController.getAll);
router.get('/:id', contIntroController.getById);
router.post('/', contIntroController.create);
router.patch('/:id', contIntroController.update);
router.delete('/:id', contIntroController.delete);

export default router;
