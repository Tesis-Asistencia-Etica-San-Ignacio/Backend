import { IContIntroRepository, ContIntro } from '../../../domain';
import { CreateContIntroDto } from '../../../application';

export class CreateContIntroUseCase {
  constructor(private readonly contIntroRepository: IContIntroRepository) {}

  public async execute(data: CreateContIntroDto): Promise<ContIntro> {
    return this.contIntroRepository.create(data);
  }
}
