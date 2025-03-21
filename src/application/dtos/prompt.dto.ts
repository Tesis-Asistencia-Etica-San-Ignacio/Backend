import { Type, Static } from '@sinclair/typebox';

export const CreatePromtSchema = Type.Object({
  nombre: Type.String(),
  texto: Type.String(),
  version: Type.Number(),
  descripcion: Type.String(),
  activo: Type.Boolean({ default: true }),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
});
export type CreatePromtDto = Static<typeof CreatePromtSchema>;

export const UpdatePromtSchema = Type.Partial(CreatePromtSchema);
export type UpdatePromtDto = Static<typeof UpdatePromtSchema>;

export const PromtResponseSchema = Type.Object({
  id: Type.String(),
  nombre: Type.String(),
  texto: Type.String(),
  version: Type.Number(),
  descripcion: Type.String(),
  activo: Type.Boolean(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
export type PromtResponseDto = Static<typeof PromtResponseSchema>;
