import { User as UserModel } from '../../../infrastructure';
import { User, IUserRepository } from '../../../domain';
import { UpdateUserDto, UserResponseDto } from '../../../application';


export class UserRepository implements IUserRepository {
  public async findAll(): Promise<UserResponseDto[]> {
    const users = await UserModel.find({});
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as UserResponseDto));
  }

  public async findById(id: string): Promise<UserResponseDto | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as UserResponseDto;
  }


  public async create(data: Omit<User, 'id'>): Promise<User> {
    const user = await UserModel.create(data);
    return {
      id: user._id.toString(),
      ...data,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<UpdateUserDto | null> {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) return null;
    return {
      id: user._id.toString(),
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      type: user.type,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as UpdateUserDto;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}
