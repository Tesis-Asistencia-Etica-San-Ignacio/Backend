// application/usecases/ethicalRules/getEthicalRulesByEvaluation.useCase.ts
import { IEthicalNormRepository } from "../../../domain";
import { EthicalNormResponseDto } from "../../dtos";

export class GetEthicalRulesByEvaluationUseCase {
  constructor(private readonly repository: IEthicalNormRepository) {}

  public async execute(evaluationId: string): Promise<EthicalNormResponseDto[]> {
    return this.repository.findByEvaluationId(evaluationId);
  }
}