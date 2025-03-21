import { IPromtRepository } from '../../../domain';

export class DeletePromtUseCase {
  constructor(private readonly promtRepository: IPromtRepository) {}

  public async execute(id: string): Promise<boolean> {
    return this.promtRepository.delete(id);
  }
}
