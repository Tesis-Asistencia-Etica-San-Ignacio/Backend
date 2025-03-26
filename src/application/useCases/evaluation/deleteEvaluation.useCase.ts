import { IEvaluacionRepository } from '../../../domain';

export class DeleteEvaluacionUseCase {
  constructor(private readonly evaluacionRepository: IEvaluacionRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.evaluacionRepository.delete(id);
  }
}
