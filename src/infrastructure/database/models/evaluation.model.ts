import { Schema, model, Document, Types } from 'mongoose';

export interface EvaluacionDocument extends Document {
  _id: Types.ObjectId;
  uid: Types.ObjectId;
  fundanet: string;
  file: string;
  fecha_inicial: Date;
  fecha_final: Date;
  evaluacion: string;
  estado: string;
  tipo_error: string;
  aprobado: boolean;
  correo_estudiante: string;
  createdAt: Date;
  updatedAt: Date;
}

const EvaluacionSchema = new Schema<EvaluacionDocument>(
  {
    uid: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    fundanet: { type: String, required: true },
    file: { type: String, required: true },
    fecha_inicial: { type: Date, required: true },
    fecha_final: { type: Date, required: true },
    evaluacion: { type: String, required: true },
    estado: { type: String, required: true },
    tipo_error: { type: String, required: true },
    aprobado: { type: Boolean, required: true },
    correo_estudiante: { type: String, required: true },
  },
  {
    timestamps: true, // Maneja createdAt y updatedAt automáticamente
  }
);

export const EvaluacionModel = model<EvaluacionDocument>('Evaluaciones', EvaluacionSchema);
