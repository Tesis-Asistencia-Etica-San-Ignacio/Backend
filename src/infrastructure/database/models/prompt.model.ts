import { Schema, model, Document, Types } from 'mongoose';

export interface PromptDocument extends Document {
  _id: Types.ObjectId;
  uid: Types.ObjectId;
  nombre: string;
  texto: string;
  //version: number;
  descripcion: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const promptSchema = new Schema<PromptDocument>(
  {
    uid: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    nombre: { type: String, required: true },
    texto: { type: String, required: true },
    //version: { type: Number, required: true },
    descripcion: { type: String, required: true },
    activo: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Esto agrega los campos createdAt y updatedAt automáticamente
  }
);

export const promptModel = model<PromptDocument>('prompts', promptSchema);
