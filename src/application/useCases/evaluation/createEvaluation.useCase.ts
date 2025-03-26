import { Evaluacion, IEvaluacionRepository } from '../../../domain';
import { CreateEvaluacionDto } from '../..';

export class CreateEvaluacionUseCase {
  constructor(private readonly evaluacionRepository: IEvaluacionRepository) {}

  public async execute(data: CreateEvaluacionDto): Promise<Evaluacion> {
    const evaluacion = await this.evaluacionRepository.create(data);
    return {
      ...evaluacion,
      fecha_inicial: new Date(evaluacion.fecha_inicial),
      fecha_final: new Date(evaluacion.fecha_final),
      createdAt: new Date(evaluacion.createdAt),
      updatedAt: new Date(evaluacion.updatedAt),
    };
  }
}
