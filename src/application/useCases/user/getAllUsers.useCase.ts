import { IUserRepository, User } from '../../../domain';
import { UserResponseDto } from '../../../application';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(): Promise<UserResponseDto[]> {
    return this.userRepository.findAll();
  }
}

