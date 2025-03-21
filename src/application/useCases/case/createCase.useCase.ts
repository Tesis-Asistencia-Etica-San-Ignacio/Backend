import { Case } from '../../../domain/entities/case.entity';
import { ICaseRepository } from '../../../domain/repositories/case.repository';

export class CreateCaseUseCase {
  constructor(private readonly caseRepository: ICaseRepository) {}

  public async execute(data: Omit<Case, 'id'>): Promise<Case> {
    return this.caseRepository.create(data);
  }
}