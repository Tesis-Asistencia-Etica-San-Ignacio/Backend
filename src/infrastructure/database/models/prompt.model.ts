import { Schema, model, Document, Types } from 'mongoose';

export interface PromtDocument extends Document {
  _id: Types.ObjectId;
  nombre: string;
  texto: string;
  version: number;
  descripcion: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PromtSchema = new Schema<PromtDocument>(
  {
    nombre: { type: String, required: true },
    texto: { type: String, required: true },
    version: { type: Number, required: true },
    descripcion: { type: String, required: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Esto agrega los campos createdAt y updatedAt automáticamente
  }
);

export const PromtModel = model<PromtDocument>('Promts', PromtSchema);
