import { Schema, model, Document, Types } from 'mongoose';

export interface ContIntroDocument extends Document {
  _id: Types.ObjectId;
  instituciones: string;
  codigo_sujeto: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContIntroSchema = new Schema<ContIntroDocument>({
  instituciones: { type: String, required: true },
  codigo_sujeto: { type: String, required: true },
}, {
  timestamps: true, // Esto automáticamente agrega createdAt y updatedAt
});

export const ContIntroModel = model<ContIntroDocument>('ContIntro', ContIntroSchema);
