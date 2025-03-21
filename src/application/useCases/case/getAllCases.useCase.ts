import { Case } from "../../../domain/entities/case.entity";
import { ICaseRepository } from "../../../domain/repositories/case.repository";

export class GetAllCasesUseCase {
  constructor(private readonly caseRepository: ICaseRepository) {}

  public async execute(filter?: {
    type?: string;
    email?: string;
  }): Promise<Case[]> {
    return this.caseRepository.findAll(filter);
  }
}
