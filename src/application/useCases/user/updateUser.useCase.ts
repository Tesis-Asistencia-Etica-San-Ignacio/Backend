import { User, IUserRepository } from '../../../domain';
import { UpdateUserDto } from '../../../application';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(id: string, data: UpdateUserDto): Promise<User | null> {
    return this.userRepository.update(id, data);
  }
}
