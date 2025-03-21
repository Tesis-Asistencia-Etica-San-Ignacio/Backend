import { IPromtRepository } from '../../../domain';
import { CreatePromtDto, PromtResponseDto } from '../../../application';

export class CreatePromtUseCase {
  constructor(private readonly promtRepository: IPromtRepository) {}

  public async execute(data: CreatePromtDto): Promise<PromtResponseDto> {
    const promt = await this.promtRepository.create(data);
    return promt;
  }
}
