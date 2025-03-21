import express from "express";
import { CaseController } from "../controllers/case.controller";
import { CreateCaseUseCase } from "../../application/useCases/case/createCase.useCase";
import { GetAllCasesUseCase } from "../../application/useCases/case/getAllCases.useCase";
import { DeleteCaseUseCase, GetCaseByIdUseCase, UpdateCaseUseCase } from "../../application/useCases/case";
import { CaseRepository } from "../../infrastructure/database/repositories/case.repository.impl";

const router = express.Router();

const caseRepository = new CaseRepository();

const createCaseUseCase = new CreateCaseUseCase(caseRepository);
const deleteCaseUseCase = new DeleteCaseUseCase(caseRepository);
const getCaseByIdUseCase = new GetCaseByIdUseCase(caseRepository);
const updateCaseUseCase = new UpdateCaseUseCase(caseRepository);
const getAllCasesUseCase = new GetAllCasesUseCase(caseRepository);

const caseController = new CaseController(createCaseUseCase, getAllCasesUseCase, getCaseByIdUseCase, updateCaseUseCase, deleteCaseUseCase);

router.post("/",caseController.create);
router.get("/",   caseController.getAll);
router.get("/:id", caseController.getById);
router.put("/:id", caseController.update);
router.delete("/:id", caseController.delete);

export default router;