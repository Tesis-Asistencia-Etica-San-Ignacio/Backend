// application/usecases/ethicalRules/getAllEthicalRules.useCase.ts
import { IEthicalNormRepository } from "../../../domain";
import { EthicalNormResponseDto } from "../../dtos";

export class GetAllEthicalRulesUseCase {
  constructor(private readonly repository: IEthicalNormRepository) {}

  public async execute(): Promise<EthicalNormResponseDto[]> {
    return this.repository.findAll();
  }
}