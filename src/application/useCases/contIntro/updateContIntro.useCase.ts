import { ContIntro, IContIntroRepository } from '../../../domain';
import { UpdateContIntroDto } from '../../../application';

export class UpdateContIntroUseCase {
  constructor(private readonly contIntroRepository: IContIntroRepository) {}

  public async execute(id: string, data: UpdateContIntroDto): Promise<ContIntro | null> {
    return this.contIntroRepository.update(id, data);
  }
}
