import { Router } from 'express';
import { PromtController } from '../../presentation';
import { PromtRepository } from '../../infrastructure/database/repositories';
import { CreatePromtUseCase, GetAllPromtsUseCase, GetPromtByIdUseCase, UpdatePromtUseCase, DeletePromtUseCase } from '../../application';

const router = Router();

const promtRepository = new PromtRepository();

const createPromtUseCase = new CreatePromtUseCase(promtRepository);
const getAllPromtsUseCase = new GetAllPromtsUseCase(promtRepository);
const getPromtByIdUseCase = new GetPromtByIdUseCase(promtRepository);
const updatePromtUseCase = new UpdatePromtUseCase(promtRepository);
const deletePromtUseCase = new DeletePromtUseCase(promtRepository);

const promtController = new PromtController(
  createPromtUseCase,
  getAllPromtsUseCase,
  getPromtByIdUseCase,
  updatePromtUseCase,
  deletePromtUseCase
);

router.get('/', promtController.getAll);
router.get('/:id', promtController.getById);
router.post('/', promtController.create);
router.patch('/:id', promtController.update);
router.delete('/:id', promtController.delete);

export default router;
