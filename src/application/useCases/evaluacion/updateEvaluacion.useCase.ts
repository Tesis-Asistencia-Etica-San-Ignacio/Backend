import { IEvaluacionRepository,Evaluacion } from '../../../domain';
import { UpdateEvaluacionDto } from '../../../application';

export class UpdateEvaluacionUseCase {
  constructor(private readonly evaluacionRepository: IEvaluacionRepository) {}

  public async execute(id: string, data: UpdateEvaluacionDto): Promise<Evaluacion | null> {
    const evaluacion = await this.evaluacionRepository.update(id, data);
    if (evaluacion) {
      return {
        ...evaluacion,
        fecha_inicial: new Date(evaluacion.fecha_inicial),
        fecha_final: new Date(evaluacion.fecha_final),
        createdAt: new Date(evaluacion.createdAt),
        updatedAt: new Date(evaluacion.updatedAt),
      };
    }
    return null;
  }
}
