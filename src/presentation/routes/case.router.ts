import express from "express";
import { CaseController } from "../controllers/case.controller";
import { CreateCaseUseCase } from "../../application/useCases/case/createCase.useCase";
import { GetAllCasesUseCase } from "../../application/useCases/case/getAllCases.useCase";
import { DeleteCaseUseCase, GetCaseByIdUseCase, UpdateCaseUseCase } from "../../application/useCases/case";
import { CaseRepository } from "../../infrastructure/database/repositories/case.repository.impl";
import { validateRoleMiddleware } from "../middleware/jwtMiddleware";

const router = express.Router();

const caseRepository = new CaseRepository();

const createCaseUseCase = new CreateCaseUseCase(caseRepository);
const deleteCaseUseCase = new DeleteCaseUseCase(caseRepository);
const getCaseByIdUseCase = new GetCaseByIdUseCase(caseRepository);
const updateCaseUseCase = new UpdateCaseUseCase(caseRepository);
const getAllCasesUseCase = new GetAllCasesUseCase(caseRepository);

const caseController = new CaseController(createCaseUseCase, getAllCasesUseCase, getCaseByIdUseCase, updateCaseUseCase, deleteCaseUseCase);

router.post("/", validateRoleMiddleware(['INVESTIGADOR']),caseController.create);
router.get("/", validateRoleMiddleware(['INVESTIGADOR']),   caseController.getAll);
router.get("/:id", validateRoleMiddleware(['INVESTIGADOR']), caseController.getById);
router.patch("/:id", validateRoleMiddleware(['INVESTIGADOR']), caseController.update);
router.delete("/:id", validateRoleMiddleware(['INVESTIGADOR']), caseController.delete);

export default router;