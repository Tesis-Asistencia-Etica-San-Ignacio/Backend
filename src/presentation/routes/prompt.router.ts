import { Router } from 'express';
import { PromtController } from '../../presentation';
import { PromtRepository } from '../../infrastructure/database/repositories';
import { CreatePromtUseCase, GetAllPromtsUseCase, GetPromtByIdUseCase, UpdatePromtUseCase, DeletePromtUseCase } from '../../application';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

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

router.get('/', validateRoleMiddleware(['EVALUADOR']), promtController.getAll);
router.get('/:id', validateRoleMiddleware(['EVALUADOR']), promtController.getById);
router.post('/', validateRoleMiddleware(['EVALUADOR']), promtController.create);
router.patch('/:id', validateRoleMiddleware(['EVALUADOR']), promtController.update);
router.delete('/:id', validateRoleMiddleware(['EVALUADOR']), promtController.delete);

export default router;
