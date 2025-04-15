// domain/entities/ethicalNorm.entity.ts
export type EthicalNormStatus = "APROBADO" | "NO_APROBADO";

export interface EthicalNorm {
  id: string;
  evaluationId: string;
  description: string;
  status: EthicalNormStatus;
  justification?: string;
  codeNumber: number;
  createdAt: Date;
  updatedAt: Date;
}