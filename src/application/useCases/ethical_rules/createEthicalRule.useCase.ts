import { EthicalNorm, IEthicalNormRepository } from "../../../domain";
import { CreateEthicalNormDto } from "../../dtos";  // Adjust the path as needed

export class CreateEthicalRuleUseCase {
  constructor(private readonly repository: IEthicalNormRepository) {}

  public async execute(data: CreateEthicalNormDto): Promise<EthicalNorm> {
    return this.repository.create(data);
  }
}