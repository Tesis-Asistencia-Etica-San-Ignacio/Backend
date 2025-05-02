import { IEthicalNormRepository } from "../../../domain";
import { EthicalNormSeed } from "../../../types/ethicalNorm";

export class CreateEthicalRulesUseCase {
  constructor(private readonly ethicalNormRepository: IEthicalNormRepository) { }

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
            justification: norma.justification,
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