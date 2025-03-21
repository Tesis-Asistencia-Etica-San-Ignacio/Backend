import { ContIntroModel } from '../../../infrastructure';
import { ContIntro, IContIntroRepository } from '../../../domain';

export class ContIntroRepository implements IContIntroRepository {
  public async findAll(filter?: { codigo_sujeto?: string }): Promise<ContIntro[]> {
    const query: Record<string, unknown> = {};

    if (filter?.codigo_sujeto) query.codigo_sujeto = filter.codigo_sujeto;

    const results = await ContIntroModel.find(query);
    return results.map((doc) => ({
      id: doc._id.toString(),
      instituciones: doc.instituciones,
      codigo_sujeto: doc.codigo_sujeto,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  public async findById(id: string): Promise<ContIntro | null> {
    const doc = await ContIntroModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      instituciones: doc.instituciones,
      codigo_sujeto: doc.codigo_sujeto,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async create(data: Omit<ContIntro, 'id'>): Promise<ContIntro> {
    const doc = await ContIntroModel.create(data);
    return {
      id: doc._id.toString(),
      ...data,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async update(id: string, data: Partial<Omit<ContIntro, 'id'>>): Promise<ContIntro | null> {
    const doc = await ContIntroModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      instituciones: doc.instituciones,
      codigo_sujeto: doc.codigo_sujeto,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await ContIntroModel.findByIdAndDelete(id);
    return result !== null;
  }
}
