import { Case } from "../../../domain/entities/case.entity";
import { ICaseRepository } from "../../../domain/repositories/case.repository";

export class GetCaseByIdUseCase {
  constructor(private readonly caseRepository: ICaseRepository) {}

  public async execute(id: string): Promise<Case | null> {
    return this.caseRepository.findById(id);
  }
}
