// application/usecases/ethicalRules/updateEthicalRule.useCase.ts
import { IEthicalNormRepository } from "../../../domain";
import { UpdateEthicalNormDto, EthicalNormResponseDto } from "../../dtos";

export class UpdateEthicalRuleUseCase {
  constructor(private readonly repository: IEthicalNormRepository) {}

  public async execute(
    id: string,
    data: UpdateEthicalNormDto
  ): Promise<EthicalNormResponseDto | null> {
    if (data.status === "APROBADO" && data.justification) {
      throw new Error("Las normas aprobadas no requieren justificación");
    }
    return this.repository.update(id, data);
  }
}