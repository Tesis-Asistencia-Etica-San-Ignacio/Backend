import { Request, Response, NextFunction } from "express";

import { GetAllCasesUseCase, GetCaseByIdUseCase, UpdateCaseUseCase, DeleteCaseUseCase, CreateCaseUseCase } from "../../application/useCases/case";
import { Types } from "mongoose";

export class CaseController {
  constructor(
    private readonly createCaseUseCase: CreateCaseUseCase,
    private readonly getAllCasesUseCase: GetAllCasesUseCase,
    private readonly getCaseByIdUseCase: GetCaseByIdUseCase,
    private readonly updateCaseUseCase: UpdateCaseUseCase,
    private readonly deleteCaseUseCase: DeleteCaseUseCase
  ) {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
        const cases = await this.getAllCasesUseCase.execute();
        res.status(200).json(cases);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Unknown error occurred" });
        }
      }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const caseData = await this.getCaseByIdUseCase.execute(id);
      if (!caseData) {
        res.status(404).json({ message: "Caso no encontrado" });
      } else {
        res.status(200).json(caseData);
      }
    } catch (error) {
      next(error);
    }
  };
  
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { uid, ...rest } = req.body;
  
      if (!Types.ObjectId.isValid(uid)) {
        res.status(400).json({ success: false, message: "UID no válido" });
        return;
      }
  
      const newCase = await this.createCaseUseCase.execute({
        uid: new Types.ObjectId(uid), // Convertimos uid a ObjectId
        ...rest,
      });
  
      res.status(201).json({ success: true, data: newCase });
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedCase = await this.updateCaseUseCase.execute(id, req.body);
      if (!updatedCase) {
        res.status(404).json({ message: "Caso no encontrado" });
      } else {
        res.status(200).json(updatedCase);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteCaseUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: "Caso no encontrado" });
      } else {
        res.status(200).json({ message: "Caso eliminado correctamente" });
      }
    } catch (error) {
      next(error);
    }
  };
}
