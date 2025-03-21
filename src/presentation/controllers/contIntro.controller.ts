import { Request, Response, NextFunction } from 'express';
import {
  CreateContIntroUseCase,
  GetAllContIntrosUseCase,
  GetContIntroByIdUseCase,
  UpdateContIntroUseCase,
  DeleteContIntroUseCase,
  CreateContIntroDto, 
  UpdateContIntroDto
} from '../../application';

export class ContIntroController {
  constructor(
    private readonly createContIntroUseCase: CreateContIntroUseCase,
    private readonly getAllContIntrosUseCase: GetAllContIntrosUseCase,
    private readonly getContIntroByIdUseCase: GetContIntroByIdUseCase,
    private readonly updateContIntroUseCase: UpdateContIntroUseCase,
    private readonly deleteContIntroUseCase: DeleteContIntroUseCase,
  ) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contIntros = await this.getAllContIntrosUseCase.execute();
      res.status(200).json(contIntros);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const contIntro = await this.getContIntroByIdUseCase.execute(id);
      if (!contIntro) {
        res.status(404).json({ message: 'ContIntro not found' });
      } else {
        res.status(200).json(contIntro);
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newContIntro = await this.createContIntroUseCase.execute(req.body as CreateContIntroDto);
      res.status(201).json(newContIntro);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedContIntro = await this.updateContIntroUseCase.execute(id, req.body as UpdateContIntroDto);
      if (!updatedContIntro) {
        res.status(404).json({ message: 'ContIntro not found' });
      } else {
        res.status(200).json(updatedContIntro);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteContIntroUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'ContIntro not found' });
      } else {
        res.status(200).json({ message: 'ContIntro deleted successfully' });
      }
    } catch (error) {
      next(error);
    }
  };
}
