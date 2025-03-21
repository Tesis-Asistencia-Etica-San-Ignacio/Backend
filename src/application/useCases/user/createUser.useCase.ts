import { User, IUserRepository } from '../../../domain';
import { CreateUserDto } from '../../../application';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }
}
