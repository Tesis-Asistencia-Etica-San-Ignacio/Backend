export interface CreateCaseDTO {
    uid: string;
    nombre_proyecto: string;
    fecha?: Date;
    instituciones?: string;
    introduccion: string;
    info_general?: string;
    Estado: string;
  }