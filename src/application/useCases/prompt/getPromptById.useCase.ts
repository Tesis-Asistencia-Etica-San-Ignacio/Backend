import { IPromtRepository } from '../../../domain';
import { PromtResponseDto } from '../../../application';

export class GetPromtByIdUseCase {
  constructor(private readonly promtRepository: IPromtRepository) {}

  public async execute(id: string): Promise<PromtResponseDto | null> {
    return this.promtRepository.findById(id);
  }
}
