import { model, Schema, Document, Types } from 'mongoose';

export interface ContInfoGeneralDocument extends Document {
  _id: Types.ObjectId;
  problema: string;
  objetivo: string;
  def_estudio: string;
  riesgos: string;
  beneficios: string;
  confidencialidad: string;
  p_alternativos: string;
  compromiso_info: string;
  ob_financiera: string;
  duracion: string;
  afectaciones: string;
  patrocinador: string;
  compania_seguro: string;
  dir_seguro: string;
  genero_doctor: string;
  nombre_doctor: string;
  cel_doctor: string;
  nombre_dir_inv: string;
  contacto_dir_inv: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContInfoGeneralSchema = new Schema<ContInfoGeneralDocument>({
  problema: { type: String, required: true },
  objetivo: { type: String, required: true },
  def_estudio: { type: String, required: true },
  riesgos: { type: String, required: true },
  beneficios: { type: String, required: true },
  confidencialidad: { type: String, required: true },
  p_alternativos: { type: String, required: true },
  compromiso_info: { type: String, required: true },
  ob_financiera: { type: String, required: true },
  duracion: { type: String, required: true },
  afectaciones: { type: String, required: true },
  patrocinador: { type: String, required: true },
  compania_seguro: { type: String, required: true },
  dir_seguro: { type: String, required: true },
  genero_doctor: { type: String, required: true },
  nombre_doctor: { type: String, required: true },
  cel_doctor: { type: String, required: true },
  nombre_dir_inv: { type: String, required: true },
  contacto_dir_inv: { type: String, required: true },
}, {
  timestamps: true, // Para manejar createdAt y updatedAt automáticamente
});

export const ContInfoGeneralModel = model<ContInfoGeneralDocument>('ContInfoGeneral', ContInfoGeneralSchema);
