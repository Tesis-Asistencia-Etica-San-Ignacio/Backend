
import { IContInfoGeneralRepository, ContInfoGeneral } from '../../../domain';

export class GetContInfoGeneralByIdUseCase {
  constructor(private readonly contInfoGeneralRepository: IContInfoGeneralRepository) {}

  public async execute(id: string): Promise<ContInfoGeneral | null> {
    return this.contInfoGeneralRepository.findById(id);
  }
}
