// application/dtos/ethicalNorm.dto.ts
import { Type, Static } from "@sinclair/typebox";

export const EthicalNormStatusEnum = Type.Union([
  Type.Literal("APROBADO"),
  Type.Literal("NO_APROBADO"),
]);

export const CreateEthicalNormSchema = Type.Object({
  evaluationId: Type.String(),
  description: Type.String(),
  status: EthicalNormStatusEnum,
  justification: Type.Optional(Type.String()),
  codeNumber: Type.Number(),
});

export type CreateEthicalNormDto = Static<typeof CreateEthicalNormSchema>;

export const UpdateEthicalNormSchema = Type.Partial(CreateEthicalNormSchema);
export type UpdateEthicalNormDto = Static<typeof UpdateEthicalNormSchema>;

export const EthicalNormResponseSchema = Type.Object({
  id: Type.String(),
  evaluationId: Type.String(),
  description: Type.String(),
  status: EthicalNormStatusEnum,
  justification: Type.Optional(Type.String()),
  codeNumber: Type.Number(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type EthicalNormResponseDto = Static<typeof EthicalNormResponseSchema>;