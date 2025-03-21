import { ContInfoGeneralModel } from '../../../infrastructure';
import { ContInfoGeneral, IContInfoGeneralRepository } from '../../../domain';

export class ContInfoGeneralRepository implements IContInfoGeneralRepository {
  public async findAll(): Promise<ContInfoGeneral[]> {
    const results = await ContInfoGeneralModel.find({});
    return results.map((doc) => ({
      id: doc._id.toString(),
      problema: doc.problema,
      objetivo: doc.objetivo,
      def_estudio: doc.def_estudio,
      riesgos: doc.riesgos,
      beneficios: doc.beneficios,
      confidencialidad: doc.confidencialidad,
      p_alternativos: doc.p_alternativos,
      compromiso_info: doc.compromiso_info,
      ob_financiera: doc.ob_financiera,
      duracion: doc.duracion,
      afectaciones: doc.afectaciones,
      patrocinador: doc.patrocinador,
      compania_seguro: doc.compania_seguro,
      dir_seguro: doc.dir_seguro,
      genero_doctor: doc.genero_doctor,
      nombre_doctor: doc.nombre_doctor,
      cel_doctor: doc.cel_doctor,
      nombre_dir_inv: doc.nombre_dir_inv,
      contacto_dir_inv: doc.contacto_dir_inv,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  public async findById(id: string): Promise<ContInfoGeneral | null> {
    const doc = await ContInfoGeneralModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      problema: doc.problema,
      objetivo: doc.objetivo,
      def_estudio: doc.def_estudio,
      riesgos: doc.riesgos,
      beneficios: doc.beneficios,
      confidencialidad: doc.confidencialidad,
      p_alternativos: doc.p_alternativos,
      compromiso_info: doc.compromiso_info,
      ob_financiera: doc.ob_financiera,
      duracion: doc.duracion,
      afectaciones: doc.afectaciones,
      patrocinador: doc.patrocinador,
      compania_seguro: doc.compania_seguro,
      dir_seguro: doc.dir_seguro,
      genero_doctor: doc.genero_doctor,
      nombre_doctor: doc.nombre_doctor,
      cel_doctor: doc.cel_doctor,
      nombre_dir_inv: doc.nombre_dir_inv,
      contacto_dir_inv: doc.contacto_dir_inv,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async create(data: Omit<ContInfoGeneral, 'id'>): Promise<ContInfoGeneral> {
    const doc = await ContInfoGeneralModel.create(data);
    return {
      id: doc._id.toString(),
      problema: doc.problema,
      objetivo: doc.objetivo,
      def_estudio: doc.def_estudio,
      riesgos: doc.riesgos,
      beneficios: doc.beneficios,
      confidencialidad: doc.confidencialidad,
      p_alternativos: doc.p_alternativos,
      compromiso_info: doc.compromiso_info,
      ob_financiera: doc.ob_financiera,
      duracion: doc.duracion,
      afectaciones: doc.afectaciones,
      patrocinador: doc.patrocinador,
      compania_seguro: doc.compania_seguro,
      dir_seguro: doc.dir_seguro,
      genero_doctor: doc.genero_doctor,
      nombre_doctor: doc.nombre_doctor,
      cel_doctor: doc.cel_doctor,
      nombre_dir_inv: doc.nombre_dir_inv,
      contacto_dir_inv: doc.contacto_dir_inv,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async update(
    id: string,
    data: Partial<Omit<ContInfoGeneral, 'id'>>,
  ): Promise<ContInfoGeneral | null> {
    const doc = await ContInfoGeneralModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      problema: doc.problema,
      objetivo: doc.objetivo,
      def_estudio: doc.def_estudio,
      riesgos: doc.riesgos,
      beneficios: doc.beneficios,
      confidencialidad: doc.confidencialidad,
      p_alternativos: doc.p_alternativos,
      compromiso_info: doc.compromiso_info,
      ob_financiera: doc.ob_financiera,
      duracion: doc.duracion,
      afectaciones: doc.afectaciones,
      patrocinador: doc.patrocinador,
      compania_seguro: doc.compania_seguro,
      dir_seguro: doc.dir_seguro,
      genero_doctor: doc.genero_doctor,
      nombre_doctor: doc.nombre_doctor,
      cel_doctor: doc.cel_doctor,
      nombre_dir_inv: doc.nombre_dir_inv,
      contacto_dir_inv: doc.contacto_dir_inv,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await ContInfoGeneralModel.findByIdAndDelete(id);
    return result !== null;
  }
}
