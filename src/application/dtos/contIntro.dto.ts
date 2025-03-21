import { Type, Static } from '@sinclair/typebox';

// Esquema para crear un cont_intro
export const CreateContIntroSchema = Type.Object({
  instituciones: Type.String(),
  codigo_sujeto: Type.String(),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
});

export type CreateContIntroDto = Static<typeof CreateContIntroSchema>;


export const UpdateContIntroSchema = Type.Partial(CreateContIntroSchema);
export type UpdateContIntroDto = Static<typeof UpdateContIntroSchema>;


export const ContIntroResponseSchema = Type.Object({
  id: Type.String(),
  instituciones: Type.String(),
  codigo_sujeto: Type.String(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
export type ContIntroResponseDto = Static<typeof ContIntroResponseSchema>;


export const ContIntroListSchema = Type.Object({
  cont_intro: Type.Array(ContIntroResponseSchema),
});
export type ContIntroListDto = Static<typeof ContIntroListSchema>;
