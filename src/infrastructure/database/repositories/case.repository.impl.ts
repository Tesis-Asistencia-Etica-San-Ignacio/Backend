import { Case } from '../../../domain/entities/case.entity';
import { ICaseRepository } from '../../../domain/repositories/case.repository';
import { CaseModel } from '../models/case.model';

export class CaseRepository implements ICaseRepository {
  public async findAll(): Promise<Case[]> {
    const results = await CaseModel.find();
    return results.map((doc) => ({
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      nombre_proyecto: doc.nombre_proyecto,
      fecha: doc.fecha,
      instituciones: doc.instituciones,
      introduccion: doc.introduccion,
      info_general: doc.info_general,
      estado: doc.estado,
    }));
  }

  public async findById(id: string): Promise<Case | null> {
    const doc = await CaseModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      nombre_proyecto: doc.nombre_proyecto,
      fecha: doc.fecha,
      instituciones: doc.instituciones,
      introduccion: doc.introduccion,
      info_general: doc.info_general,
      estado: doc.estado,
    };
  }

  public async create(data: Omit<Case, "id">): Promise<Case> {
    const doc = await CaseModel.create(data);
    return {
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      nombre_proyecto: doc.nombre_proyecto,
      fecha: doc.fecha,
      instituciones: doc.instituciones,
      introduccion: doc.introduccion,
      info_general: doc.info_general,
      estado: doc.estado,
    };
  }

  public async update(id: string, data: Partial<Omit<Case, "id">>): Promise<Case | null> {
    const doc = await CaseModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      nombre_proyecto: doc.nombre_proyecto,
      fecha: doc.fecha,
      instituciones: doc.instituciones,
      introduccion: doc.introduccion,
      info_general: doc.info_general,
      estado: doc.estado,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const doc = await CaseModel.findByIdAndDelete(id);
    return doc !== null;
  }
}