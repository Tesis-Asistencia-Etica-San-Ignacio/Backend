import { Case } from "../entities/case.entity";

export interface ICaseRepository {
  findAll(filter?: { type?: string; email?: string }): Promise<Case[]>;
  findById(id: string): Promise<Case | null>;
  create(data: Omit<Case, 'id'>): Promise<Case>;
  update(id: string, data: Partial<Omit<Case, 'id'>>): Promise<Case | null>;
  delete(id: string): Promise<boolean>;
}