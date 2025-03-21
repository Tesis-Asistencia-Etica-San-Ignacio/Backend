import { Schema, model, Document, Types } from "mongoose";

export interface CaseDocument extends Document {
  _id: Types.ObjectId;
  uid: Types.ObjectId;
  nombre_proyecto: string;
  fecha?: Date;
  instituciones?: string;
  introduccion: string;
  info_general?: string;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}

const CaseSchema = new Schema<CaseDocument>(
  {
    uid: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    nombre_proyecto: { type: String, required: true },
    fecha: { type: Date },
    instituciones: { type: String },
    introduccion: { type: String, required: true },
    info_general: { type: String },
    estado: { type: String, required: true },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

export const CaseModel = model<CaseDocument>("Case", CaseSchema);
