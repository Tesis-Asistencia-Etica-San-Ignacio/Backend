import { IPromtRepository } from '../../../domain';
import { PromtResponseDto } from '../../../application';

export class GetAllPromtsUseCase {
  constructor(private readonly promtRepository: IPromtRepository) {}

  public async execute(): Promise<PromtResponseDto[]> {
    return this.promtRepository.findAll();
  }
}
