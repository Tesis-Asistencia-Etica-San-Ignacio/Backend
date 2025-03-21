import { Request, Response, NextFunction } from 'express';
import { CreatePromtUseCase, GetAllPromtsUseCase, GetPromtByIdUseCase, UpdatePromtUseCase, DeletePromtUseCase } from '../../application';

export class PromtController {
  constructor(
    private readonly createPromtUseCase: CreatePromtUseCase,
    private readonly getAllPromtsUseCase: GetAllPromtsUseCase,
    private readonly getPromtByIdUseCase: GetPromtByIdUseCase,
    private readonly updatePromtUseCase: UpdatePromtUseCase,
    private readonly deletePromtUseCase: DeletePromtUseCase,
  ) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const promts = await this.getAllPromtsUseCase.execute();
      res.status(200).json(promts);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const promt = await this.getPromtByIdUseCase.execute(id);
      if (!promt) {
        res.status(404).json({ message: 'Promt no encontrado' });
      } else {
        res.status(200).json(promt);
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newPromt = await this.createPromtUseCase.execute(req.body);
      res.status(201).json(newPromt);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedPromt = await this.updatePromtUseCase.execute(id, req.body);
      if (!updatedPromt) {
        res.status(404).json({ message: 'Promt no encontrado' });
      } else {
        res.status(200).json(updatedPromt);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deletePromtUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Promt no encontrado' });
      } else {
        res.status(200).json({ message: 'Promt eliminado correctamente' });
      }
    } catch (error) {
      next(error);
    }
  };
}
