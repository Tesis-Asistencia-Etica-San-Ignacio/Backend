import { Request, Response, NextFunction } from 'express';
import {
  CreateEvaluacionUseCase,
  GetAllEvaluacionsUseCase,
  GetEvaluacionByIdUseCase,
  UpdateEvaluacionUseCase,
  DeleteEvaluacionUseCase,
  CreateEvaluacionDto, 
  UpdateEvaluacionDto
} from '../../application';


export class EvaluacionController {
  constructor(
    private readonly createEvaluacionUseCase: CreateEvaluacionUseCase,
    private readonly getAllEvaluacionsUseCase: GetAllEvaluacionsUseCase,
    private readonly getEvaluacionByIdUseCase: GetEvaluacionByIdUseCase,
    private readonly updateEvaluacionUseCase: UpdateEvaluacionUseCase,
    private readonly deleteEvaluacionUseCase: DeleteEvaluacionUseCase
  ) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const evaluaciones = await this.getAllEvaluacionsUseCase.execute();
      res.status(200).json(evaluaciones);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const evaluacion = await this.getEvaluacionByIdUseCase.execute(id);
      if (!evaluacion) {
        res.status(404).json({ message: 'Evaluacion not found' });
      } else {
        res.status(200).json(evaluacion);
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newEvaluacion = await this.createEvaluacionUseCase.execute(req.body as CreateEvaluacionDto);
      res.status(201).json(newEvaluacion);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedEvaluacion = await this.updateEvaluacionUseCase.execute(id, req.body as UpdateEvaluacionDto);
      if (!updatedEvaluacion) {
        res.status(404).json({ message: 'Evaluacion not found' });
      } else {
        res.status(200).json(updatedEvaluacion);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteEvaluacionUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Evaluacion not found' });
      } else {
        res.status(200).json({ message: 'Evaluacion deleted successfully' });
      }
    } catch (error) {
      next(error);
    }
  };
}
