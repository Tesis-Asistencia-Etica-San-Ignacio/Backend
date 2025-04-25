import {
  Evaluacion,
  IEvaluacionRepository,
  IEthicalNormRepository,
} from "../../../domain";
import { CreateEvaluacionDto } from "../..";
import path from "path";
import fs from "fs";
import { EthicalNormSeed } from "../../../types/ethicalNorm";

export class CreateEvaluacionUseCase {
  constructor(
    private readonly evaluacionRepository: IEvaluacionRepository,
    private readonly ethicalNormRepository: IEthicalNormRepository
  ) {}

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

  public async crearNormasEticasBase(evaluacionId: string, normasData: EthicalNormSeed[]): Promise<void> {
    try {
      const normasTransformadas = normasData.map((norma: any) => ({
        ...norma,
        status: norma.status ? "APROBADO" : "NO_APROBADO"
      }));

      if (!normasTransformadas || !Array.isArray(normasTransformadas)) {
        throw new Error('Formato de normas inválido');
      }
        
      await Promise.all(
        normasTransformadas.map((norma: EthicalNormSeed) => 
          this.ethicalNormRepository.create({
            evaluationId: evaluacionId,
            description: norma.description,
            status: norma.status,
            codeNumber: norma.codeNumber,
            justification: norma.justificacion,
            cita: norma.cita
          })
        )
      );
    } catch (error) {
      console.error('Error creando normas éticas base:', error);
      throw new Error('No se pudieron crear las normas éticas asociadas');
    }
  }
}


