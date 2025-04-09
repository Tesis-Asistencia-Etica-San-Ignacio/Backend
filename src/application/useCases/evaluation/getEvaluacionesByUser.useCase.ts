// src/application/useCases/evaluation/GetEvaluacionesByUserUseCase.ts
import { IEvaluacionRepository } from '../../../domain';
import { EvaluacionResponseDto } from '../../../application';

export class GetEvaluacionesByUserUseCase {
  constructor(private readonly evaluacionRepository: IEvaluacionRepository) {}

  public async execute(userId: string): Promise<EvaluacionResponseDto[]> {

    return this.evaluacionRepository.findByUserId(userId);
  }
}