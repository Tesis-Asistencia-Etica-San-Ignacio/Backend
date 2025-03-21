import { ContIntro, IContIntroRepository } from '../../../domain';

export class GetAllContIntrosUseCase {
    constructor(private readonly contIntroRepository: IContIntroRepository) {}
  
    public async execute(): Promise<ContIntro[]> {
      return this.contIntroRepository.findAll();
    }
  }