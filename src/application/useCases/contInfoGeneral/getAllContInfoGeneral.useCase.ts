import { IContInfoGeneralRepository, ContInfoGeneral } from '../../../domain';

export class GetAllContInfoGeneralsUseCase {
  constructor(private readonly contInfoGeneralRepository: IContInfoGeneralRepository) {}

  public async execute(): Promise<ContInfoGeneral[]> {
    return this.contInfoGeneralRepository.findAll();
  }
}
