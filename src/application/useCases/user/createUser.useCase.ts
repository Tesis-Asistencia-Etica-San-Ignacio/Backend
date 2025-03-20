import { IUserRepository, User } from '../../../domain';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: Omit<User, 'id'>): Promise<User> {
    // Lógica adicional, como encriptación de contraseña, se puede agregar aquí.
    return this.userRepository.create(data);
  }
}
