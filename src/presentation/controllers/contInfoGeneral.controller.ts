import { Request, Response, NextFunction } from 'express';
import {
  CreateContInfoGeneralUseCase,
  GetAllContInfoGeneralsUseCase,
  GetContInfoGeneralByIdUseCase,
  UpdateContInfoGeneralUseCase,
  DeleteContInfoGeneralUseCase,
  CreateContInfoGeneralDto, 
  UpdateContInfoGeneralDto
} from '../../application';

export class ContInfoGeneralController {
  constructor(
    private readonly createContInfoGeneralUseCase: CreateContInfoGeneralUseCase,
    private readonly getAllContInfoGeneralsUseCase: GetAllContInfoGeneralsUseCase,
    private readonly getContInfoGeneralByIdUseCase: GetContInfoGeneralByIdUseCase,
    private readonly updateContInfoGeneralUseCase: UpdateContInfoGeneralUseCase,
    private readonly deleteContInfoGeneralUseCase: DeleteContInfoGeneralUseCase,
  ) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contInfoGenerals = await this.getAllContInfoGeneralsUseCase.execute();
      res.status(200).json(contInfoGenerals);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const contInfoGeneral = await this.getContInfoGeneralByIdUseCase.execute(id);
      if (!contInfoGeneral) {
        res.status(404).json({ message: 'ContInfoGeneral not found' });
      } else {
        res.status(200).json(contInfoGeneral);
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Usamos el DTO para crear el cont_info_general
      const newContInfoGeneral = await this.createContInfoGeneralUseCase.execute(req.body as CreateContInfoGeneralDto);
      res.status(201).json(newContInfoGeneral);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedContInfoGeneral = await this.updateContInfoGeneralUseCase.execute(id, req.body as UpdateContInfoGeneralDto);
      if (!updatedContInfoGeneral) {
        res.status(404).json({ message: 'ContInfoGeneral not found' });
      } else {
        res.status(200).json(updatedContInfoGeneral);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteContInfoGeneralUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'ContInfoGeneral not found' });
      } else {
        res.status(200).json({ message: 'ContInfoGeneral deleted successfully' });
      }
    } catch (error) {
      next(error);
    }
  };
}
