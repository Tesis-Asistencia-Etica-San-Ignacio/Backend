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
    await this.crearNormasEticasBase(evaluacion.id);
    return {
      ...evaluacion,
      fecha_inicial: new Date(evaluacion.fecha_inicial),
      fecha_final: new Date(evaluacion.fecha_final),
      createdAt: new Date(evaluacion.createdAt),
      updatedAt: new Date(evaluacion.updatedAt),
    };
  }

  public async crearNormasEticasBase(evaluacionId: string): Promise<void> {
    try {
      const filePath = path.resolve(
        __dirname, 
        '../../../infrastructure/data/ethicalRulesSeed.json'
      );
      
      // Verificar existencia del archivo
      if (!fs.existsSync(filePath)) {
        throw new Error(`Archivo no encontrado en: ${filePath}`);
      }
  
      const rawData = fs.readFileSync(filePath, 'utf-8');
      
      // Especificar el tipo al parsear
      const normasBase: EthicalNormSeed[] = JSON.parse(rawData);
  
      await Promise.all(
        normasBase.map((norma: EthicalNormSeed) => 
          this.ethicalNormRepository.create({
            evaluationId: evaluacionId,
            description: norma.description,
            status: norma.status,
            codeNumber: norma.codeNumber,
            justification: norma.justification
          })
        )
      );
    } catch (error) {
      console.error('Error creando normas éticas base:', error);
      throw new Error('No se pudieron crear las normas éticas asociadas');
    }
  }
}


