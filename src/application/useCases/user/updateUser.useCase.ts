import { IUserRepository, User } from '../../../domain';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    id: string,
    data: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> {
    return this.userRepository.update(id, data);
  }
}
