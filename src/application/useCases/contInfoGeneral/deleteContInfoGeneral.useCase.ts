import { IContInfoGeneralRepository } from '../../../domain';

export class DeleteContInfoGeneralUseCase {
  constructor(private readonly contInfoGeneralRepository: IContInfoGeneralRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.contInfoGeneralRepository.delete(id);
  }
}
