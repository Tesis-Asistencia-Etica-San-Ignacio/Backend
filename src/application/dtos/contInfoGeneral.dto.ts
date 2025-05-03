import { Type, Static } from '@sinclair/typebox';

// Esquema para crear un cont_info_general
export const CreateContInfoGeneralSchema = Type.Object({
  cid : Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  problema: Type.String(),
  objetivo: Type.String(),
  def_estudio: Type.String(),
  riesgos: Type.String(),
  beneficios: Type.String(),
  confidencialidad: Type.String(),
  p_alternativos: Type.String(),
  compromiso_info: Type.String(),
  ob_financiera: Type.String(),
  duracion: Type.String(),
  afectaciones: Type.String(),
  patrocinador: Type.String(),
  compania_seguro: Type.String(),
  dir_seguro: Type.String(),
  genero_doctor: Type.String(),
  nombre_doctor: Type.String(),
  cel_doctor: Type.String(),
  nombre_dir_inv: Type.String(),
  contacto_dir_inv: Type.String(),
  createdAt: Type.Optional(Type.Date()),
  updatedAt: Type.Optional(Type.Date()),
});

// Tipo para la creación de un cont_info_general
export type CreateContInfoGeneralDto = Static<typeof CreateContInfoGeneralSchema>;

// Esquema para la actualización parcial de un cont_info_general
export const UpdateContInfoGeneralSchema = Type.Partial(CreateContInfoGeneralSchema);
export type UpdateContInfoGeneralDto = Static<typeof UpdateContInfoGeneralSchema>;

export const ContInfoGeneralResponseSchema = Type.Object({
  id: Type.String(),
  cid : Type.String({ pattern: '^[0-9a-fA-F]{24}$' }),
  problema: Type.String(),
  objetivo: Type.String(),
  def_estudio: Type.String(),
  riesgos: Type.String(),
  beneficios: Type.String(),
  confidencialidad: Type.String(),
  p_alternativos: Type.String(),
  compromiso_info: Type.String(),
  ob_financiera: Type.String(),
  duracion: Type.String(),
  afectaciones: Type.String(),
  patrocinador: Type.String(),
  compania_seguro: Type.String(),
  dir_seguro: Type.String(),
  genero_doctor: Type.String(),
  nombre_doctor: Type.String(),
  cel_doctor: Type.String(),
  nombre_dir_inv: Type.String(),
  contacto_dir_inv: Type.String(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});

// Tipo para la respuesta de cont_info_general
export type ContInfoGeneralResponseDto = Static<typeof ContInfoGeneralResponseSchema>;

// Esquema para una lista de cont_info_general
export const ContInfoGeneralsListSchema = Type.Object({
  cont_info_generals: Type.Array(ContInfoGeneralResponseSchema),
});
export type ContInfoGeneralsListDto = Static<typeof ContInfoGeneralsListSchema>;
