import { IUserRepository, User } from '../../../domain';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(filter?: {
    type?: string;
    email?: string;
  }): Promise<User[]> {
    return this.userRepository.findAll(filter);
  }
}
