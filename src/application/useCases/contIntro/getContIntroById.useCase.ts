import { ContIntro, IContIntroRepository } from '../../../domain';

export class GetContIntroByIdUseCase {
    constructor(private readonly contIntroRepository: IContIntroRepository) {}
  
    public async execute(id: string): Promise<ContIntro | null> {
      return this.contIntroRepository.findById(id);
    }
  }