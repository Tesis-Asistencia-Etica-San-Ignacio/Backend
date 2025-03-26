import { User, IUserRepository } from '../../../domain';
import { CreateUserDto } from '../..';
import bcrypt from 'bcryptjs';
import config from '../../../infrastructure/config';


export class CreateEvaluatorUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, config.jwt.saltRounds);

    const userWithHashedPassword: CreateUserDto = {
      ...data,
      type: 'EVALUADOR',
      password: hashedPassword,
    };

    return this.userRepository.create(userWithHashedPassword);
  }
}

export class CreateInvestigatorUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, config.jwt.saltRounds);

    const userWithHashedPassword: CreateUserDto = {
      ...data,
      type: 'INVESTIGADOR',
      password: hashedPassword,
    };

    return this.userRepository.create(userWithHashedPassword);
  }
}

