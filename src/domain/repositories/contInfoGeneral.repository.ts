import { ContInfoGeneral } from '../../domain';

export interface IContInfoGeneralRepository {
  findAll(): Promise<ContInfoGeneral[]>;
  findById(id: string): Promise<ContInfoGeneral | null>; 
  create(data: Partial<Omit<ContInfoGeneral, 'id'>>): Promise<ContInfoGeneral>
  update(id: string, data: Partial<Omit<ContInfoGeneral, 'id'>>): Promise<ContInfoGeneral | null>; 
  delete(id: string): Promise<boolean>; 
}
