import { User } from '../entities/user.entity';
import { UserResponseDto } from '../../application';
 

export interface IUserRepository {
  findAll(): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto | null>;
  create(data: Partial<Omit<User, "id">>): Promise<User>
  update(id: string, data: Partial<Omit<User, 'id'>>): Promise<UserResponseDto | null>;
  delete(id: string): Promise<boolean>;
}
