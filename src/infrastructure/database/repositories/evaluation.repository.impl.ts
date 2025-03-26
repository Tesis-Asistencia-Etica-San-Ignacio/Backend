import { EvaluacionModel } from '../..';
import { IEvaluacionRepository } from '../../../domain';
import { CreateEvaluacionDto, UpdateEvaluacionDto, EvaluacionResponseDto } from '../../../application';

export class EvaluacionRepository implements IEvaluacionRepository {
  public async findAll(): Promise<EvaluacionResponseDto[]> {
    const results = await EvaluacionModel.find({});
    return results.map((doc) => ({
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      fundanet: doc.fundanet,
      file: doc.file,
      fecha_inicial: doc.fecha_inicial.toISOString(),
      fecha_final: doc.fecha_final.toISOString(),
      evaluacion: doc.evaluacion,
      estado: doc.estado,
      tipo_error: doc.tipo_error,
      aprobado: doc.aprobado,
      correo_estudiante: doc.correo_estudiante,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }));
  }

  public async findById(id: string): Promise<EvaluacionResponseDto | null> {
    const doc = await EvaluacionModel.findById(id);
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      fundanet: doc.fundanet,
      file: doc.file,
      fecha_inicial: doc.fecha_inicial.toISOString(),
  fecha_final: doc.fecha_final.toISOString(),
      evaluacion: doc.evaluacion,
      estado: doc.estado,
      tipo_error: doc.tipo_error,
      aprobado: doc.aprobado,
      correo_estudiante: doc.correo_estudiante,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async create(data: CreateEvaluacionDto): Promise<EvaluacionResponseDto> {
    const doc = await EvaluacionModel.create(data);
    return {
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      fundanet: doc.fundanet,
      file: doc.file,
      fecha_inicial: doc.fecha_inicial.toISOString(),
  fecha_final: doc.fecha_final.toISOString(),
      evaluacion: doc.evaluacion,
      estado: doc.estado,
      tipo_error: doc.tipo_error,
      aprobado: doc.aprobado,
      correo_estudiante: doc.correo_estudiante,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async update(
    id: string,
    data: UpdateEvaluacionDto
  ): Promise<EvaluacionResponseDto | null> {
    const doc = await EvaluacionModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: doc._id.toString(),
      uid: doc.uid.toString(),
      fundanet: doc.fundanet,
      file: doc.file,
      fecha_inicial: doc.fecha_inicial.toISOString(),
  fecha_final: doc.fecha_final.toISOString(),
      evaluacion: doc.evaluacion,
      estado: doc.estado,
      tipo_error: doc.tipo_error,
      aprobado: doc.aprobado,
      correo_estudiante: doc.correo_estudiante,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }

  public async delete(id: string): Promise<boolean> {
    const result = await EvaluacionModel.findByIdAndDelete(id);
    return result !== null;
  }
}
