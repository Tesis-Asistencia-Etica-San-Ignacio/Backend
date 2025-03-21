import { ContIntro } from '../../domain';

export interface IContIntroRepository {
  findAll(): Promise<ContIntro[]>;
  findById(id: string): Promise<ContIntro | null>;
  create(data: Partial<Omit<ContIntro, 'id'>>): Promise<ContIntro>
  update(id: string, data: Partial<Omit<ContIntro, 'id'>>): Promise<ContIntro | null>;
  delete(id: string): Promise<boolean>;
}
