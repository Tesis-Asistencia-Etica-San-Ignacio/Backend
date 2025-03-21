import { IContInfoGeneralRepository, ContInfoGeneral } from '../../../domain';
import { UpdateContInfoGeneralDto } from '../../../application';

export class UpdateContInfoGeneralUseCase {
  constructor(private readonly contInfoGeneralRepository: IContInfoGeneralRepository) {}

  public async execute(id: string, data: UpdateContInfoGeneralDto): Promise<ContInfoGeneral | null> {
    return this.contInfoGeneralRepository.update(id, data);
  }
}
