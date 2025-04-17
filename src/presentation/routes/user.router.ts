import { Router } from 'express';
import { UserController } from '../../presentation';
import { UserRepository, PromptRepository } from '../../infrastructure/database/repositories';
import {
  CreateEvaluatorUseCase,
  CreateInvestigatorUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../application';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';


const router = Router();

const userRepository = new UserRepository();
const promptRepository = new PromptRepository(); // Asegúrate de que este repositorio esté definido y exportado correctamente

const createEvaluatorUseCase = new CreateEvaluatorUseCase(userRepository, promptRepository);
const createInvestigatorUseCase = new CreateInvestigatorUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createEvaluatorUseCase,
  createInvestigatorUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
);

router.get('/', validateRoleMiddleware(['EVALUADOR', 'INVESTIGADOR']), userController.getAll);
router.get('/:id', validateRoleMiddleware(['EVALUADOR', 'INVESTIGADOR']), userController.getById);
router.post('/evaluador', validateRoleMiddleware(['EVALUADOR']), userController.createEvaluator);

// Registro de investigador es público
router.post('/investigador', userController.createInvestigator);

router.patch('/:id', validateRoleMiddleware(['EVALUADOR', 'INVESTIGADOR']), userController.update);
router.delete('/:id', validateRoleMiddleware(['EVALUADOR', 'INVESTIGADOR']), userController.delete);

export default router;
