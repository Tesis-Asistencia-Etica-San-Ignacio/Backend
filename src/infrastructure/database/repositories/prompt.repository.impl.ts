import { PromtModel } from '../..';
import { IPromtRepository, Promt } from '../../../domain';
import { PromtResponseDto, CreatePromtDto, UpdatePromtDto } from '../../../application';

export class PromtRepository implements IPromtRepository {
  public async findAll(): Promise<PromtResponseDto[]> {
    const results = await PromtModel.find({});
    return results.map((doc) => ({
      id: doc._id.toString(),
      nombre: doc.nombre,
      texto: doc.texto,
      version: doc.version,
      descripcion: doc.descripcion,
      activo: doc.activo,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findById(id: string): Promise<PromtResponseDto | null> {
    const doc = await PromtModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      nombre: doc.nombre,
      texto: doc.texto,
      version: doc.version,
      descripcion: doc.descripcion,
      activo: doc.activo,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async create(data: Omit<CreatePromtDto, 'id'>): Promise<PromtResponseDto> {
    const doc = await PromtModel.create(data);
    return {
      id: doc._id.toString(),
      nombre: doc.nombre,
      texto: doc.texto,
      version: doc.version,
      descripcion: doc.descripcion,
      activo: doc.activo,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async update(id: string, data: Partial<Omit<UpdatePromtDto, 'id'>>): Promise<PromtResponseDto | null> {
    const doc = await PromtModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      nombre: doc.nombre,
      texto: doc.texto,
      version: doc.version,
      descripcion: doc.descripcion,
      activo: doc.activo,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await PromtModel.findByIdAndDelete(id);
    return result !== null;
  }
}
