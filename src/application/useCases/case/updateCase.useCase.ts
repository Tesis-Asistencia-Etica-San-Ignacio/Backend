import { Case } from "../../../domain/entities/case.entity";
import { ICaseRepository } from "../../../domain/repositories/case.repository";

export class UpdateCaseUseCase {
  constructor(private readonly caseRepository: ICaseRepository) {}

  public async execute(
    id: string,
    data: Partial<Omit<Case, 'id'>>,
  ): Promise<Case | null> {
    return this.caseRepository.update(id, data);
  }
}
