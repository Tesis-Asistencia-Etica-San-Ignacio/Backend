import { IContInfoGeneralRepository, ContInfoGeneral } from '../../../domain';
import { CreateContInfoGeneralDto } from '../../../application';

export class CreateContInfoGeneralUseCase {
  constructor(private readonly contInfoGeneralRepository: IContInfoGeneralRepository) {}

  public async execute(data: CreateContInfoGeneralDto): Promise<ContInfoGeneral> {
    return this.contInfoGeneralRepository.create(data);
  }
}
