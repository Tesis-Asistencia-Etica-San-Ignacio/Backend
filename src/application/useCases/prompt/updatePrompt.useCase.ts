import { IPromtRepository } from '../../../domain';
import { UpdatePromtDto, PromtResponseDto } from '../../../application';

export class UpdatePromtUseCase {
  constructor(private readonly promtRepository: IPromtRepository) {}

  public async execute(id: string, data: UpdatePromtDto): Promise<PromtResponseDto | null> {
    return this.promtRepository.update(id, data);
  }
}
