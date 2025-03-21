import { Type, Static } from '@sinclair/typebox';

// Esquema para crear una Evaluacion
export const CreateEvaluacionSchema = Type.Object({
  uid: Type.String({ pattern: '^[0-9a-fA-F]{24}$' }), // Representa un ObjectId como string
  fundanet: Type.String(),
  file: Type.String(),
  fecha_inicial: Type.String({ format: 'date-time' }),
  fecha_final: Type.String({ format: 'date-time' }),
  evaluacion: Type.String(),
  estado: Type.String(),
  tipo_error: Type.String(),
  aprobado: Type.Boolean(),
  correo_estudiante: Type.String(),
  // createdAt y updatedAt son manejados por Mongoose automáticamente
});

export type CreateEvaluacionDto = Static<typeof CreateEvaluacionSchema>;

// Esquema para actualizar una Evaluacion (todos los campos opcionales)
export const UpdateEvaluacionSchema = Type.Partial(CreateEvaluacionSchema);
export type UpdateEvaluacionDto = Static<typeof UpdateEvaluacionSchema>;

// Esquema para la respuesta de Evaluacion (excluyendo campos sensibles si los hubiera)
export const EvaluacionResponseSchema = Type.Object({
  id: Type.String(),
  uid: Type.String(),
  fundanet: Type.String(),
  file: Type.String(),
  fecha_inicial: Type.String({ format: 'date-time' }),
  fecha_final: Type.String({ format: 'date-time' }),
  evaluacion: Type.String(),
  estado: Type.String(),
  tipo_error: Type.String(),
  aprobado: Type.Boolean(),
  correo_estudiante: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});
export type EvaluacionResponseDto = Static<typeof EvaluacionResponseSchema>;

// Esquema para una lista de evaluaciones
export const EvaluacionesListSchema = Type.Object({
  evaluaciones: Type.Array(EvaluacionResponseSchema),
});
export type EvaluacionesListDto = Static<typeof EvaluacionesListSchema>;
