import { IUserRepository, User } from '../../../domain';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
