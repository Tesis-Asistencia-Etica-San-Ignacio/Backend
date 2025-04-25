// infrastructure/database/models/ethicalNorm.model.ts
import { Schema, model, Document, Types } from "mongoose";

// 1. Definir la interfaz del documento
export interface EthicalNormDocument extends Document {
  _id: Types.ObjectId;
  evaluationId: Types.ObjectId;
  description: string;
  status: "APROBADO" | "NO_APROBADO";
  justification: string;
  cita: string;
  codeNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Crear el esquema
const EthicalNormSchema = new Schema<EthicalNormDocument>(
  {
    evaluationId: { 
      type: Schema.Types.ObjectId, 
      required: true,
      ref: "Evaluation" // Referencia a la colección de evaluaciones
    },
    description: { 
      type: String, 
      required: true,
      minlength: [10, "La descripción debe tener al menos 10 caracteres"]
    },
    status: {
      type: String,
      enum: {
        values: ["APROBADO", "NO_APROBADO"],
        message: "Estado inválido. Valores permitidos: APROBADO, NO_APROBADO"
      },
      required: [true, "El estado es requerido"]
    },
    justification: { 
      type: String,
      maxlength: [1000, "La justificación no puede exceder los 1000 caracteres"]
    },
    codeNumber: { 
      type: String, 
      required: true,
      unique: false
    },
    cita: { 
      type: String, 
      required: false
    }
  },
  {
    timestamps: true // Genera automáticamente createdAt y updatedAt
  }
);

// 3. Crear índice compuesto para búsquedas frecuentes
EthicalNormSchema.index({ evaluationId: 1, status: 1 });

// 4. Middleware de validación previo a guardar
EthicalNormSchema.pre("save", function(next) {
  if (this.justification && this.status === "NO_APROBADO") {
    this.justification = ""; // Limpiar justificación si está aprobada
  }
  next();
});

// 5. Exportar el modelo
export const EthicalNorm = model<EthicalNormDocument>(
  "EthicalNorm", 
  EthicalNormSchema
);