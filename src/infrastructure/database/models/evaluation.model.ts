import { Schema, model, Document, Types } from 'mongoose';

export interface EvaluationDocument extends Document {
  _id: Types.ObjectId;
  uid: Types.ObjectId;
  id_fundanet: string;
  file: string;
  fecha_inicial: Date;
  fecha_final: Date;
  estado: string;
  tipo_error: string;
  aprobado: boolean;
  correo_estudiante: string;
  createdAt: Date;
  updatedAt: Date;
}

const EvaluationSchema = new Schema<EvaluationDocument>(
  {
    uid: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    id_fundanet: { type: String, required: true },
    file: { type: String, required: true },
    fecha_inicial: { type: Date, required: true },
    fecha_final: { type: Date, required: true },
    estado: { type: String, required: true },
    tipo_error: { type: String, required: true },
    aprobado: { type: Boolean, required: true },
    correo_estudiante: { type: String, required: true },
  },
  {
    timestamps: true, // Maneja createdAt y updatedAt automáticamente
  }
);

export const EvaluationModel = model<EvaluationDocument>('Evaluaciones', EvaluationSchema);
