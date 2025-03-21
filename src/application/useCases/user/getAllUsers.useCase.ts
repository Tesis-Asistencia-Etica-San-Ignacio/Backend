import { IUserRepository, User } from '../../../domain';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

