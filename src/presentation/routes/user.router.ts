// src/presentation/routes/user.router.ts
import { Router } from 'express';
import { UserController } from '../../presentation';
import { UserRepository } from '../../infrastructure/database/repositories';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../application';

const router = Router();

// Instanciamos el repositorio
const userRepository = new UserRepository();

// Instanciamos los casos de uso
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Instanciamos el controlador con los casos de uso inyectados
const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
);

// Definimos las rutas y asignamos los métodos del controlador
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
