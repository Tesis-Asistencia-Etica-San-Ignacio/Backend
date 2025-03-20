import { User } from '../../domain';

export interface IUserRepository {
  findAll(filter?: { type?: string; email?: string }): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(data: Omit<User, 'id'>): Promise<User>;
  update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
