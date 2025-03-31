import { Router } from 'express';
import { UserController } from '../../presentation';
import { UserRepository } from '../../infrastructure/database/repositories';
import {
  CreateEvaluatorUseCase,
  CreateInvestigatorUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../application';


const router = Router();

const userRepository = new UserRepository();

const createEvaluatorUseCase = new CreateEvaluatorUseCase(userRepository);
const createInvestigatorUseCase = new CreateInvestigatorUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createInvestigatorUseCase,
  createEvaluatorUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
);

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/evaluador', userController.createEvaluator);
router.post('/investigador', userController.createInvestigator);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
