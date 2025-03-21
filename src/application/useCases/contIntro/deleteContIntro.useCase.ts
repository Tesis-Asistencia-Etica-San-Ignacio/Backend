import { IContIntroRepository } from '../../../domain';

export class DeleteContIntroUseCase {
    constructor(private readonly contIntroRepository: IContIntroRepository) {}
  
    public async execute(id: string): Promise<boolean> {
      return this.contIntroRepository.delete(id);
    }
  }