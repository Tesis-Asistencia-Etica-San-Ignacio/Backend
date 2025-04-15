export interface Evaluacion {
    id: string;                // Convertido desde _id de MongoDB
    uid: string;               // ObjectId en la BD, pero string en la capa de dominio
    id_fundanet: string;
    file: string;
    fecha_inicial: Date;
    fecha_final: Date;
    estado: string;
    tipo_error: string;
    aprobado: boolean;
    correo_estudiante: string;
    createdAt: Date;           // Manejado por timestamps de Mongoose
    updatedAt: Date;           // Manejado por timestamps de Mongoose
  }
  