import { Request, Response, NextFunction } from 'express';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../application';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { type, email } = req.query;
      // Verifica que 'type' y 'email' sean strings, de lo contrario se ignoran (undefined)
      const typeString = typeof type === 'string' ? type : undefined;
      const emailString = typeof email === 'string' ? email : undefined;
      // Se ejecuta el caso de uso, el cual ya mapea los timestamps
      const users = await this.getAllUsersUseCase.execute({
        type: typeString,
        email: emailString,
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newUser = await this.createUserUseCase.execute(req.body);
      // La respuesta incluye ahora createdAt y updatedAt
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedUser = await this.updateUserUseCase.execute(id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteUserUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
      }
    } catch (error) {
      next(error);
    }
  };
}
