import { PromtResponseDto, CreatePromtDto, UpdatePromtDto } from '../../application';

export interface IPromtRepository {
  findAll(): Promise<PromtResponseDto[]>;
  findById(id: string): Promise<PromtResponseDto | null>;
  create(data: Omit<CreatePromtDto, 'id'>): Promise<PromtResponseDto>;
  update(id: string, data: Partial<Omit<UpdatePromtDto, 'id'>>): Promise<PromtResponseDto | null>;
  delete(id: string): Promise<boolean>;
}
