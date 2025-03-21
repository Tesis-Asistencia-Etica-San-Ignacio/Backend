export interface BaseCase {
    
    id: string,
    uid: string,
    nombre_proyecto: string,
    introduccion: string,
    estado: string,
    fecha?: Date,
    instituciones?: string,
    info_general?: string, 
  }

  export type Case = BaseCase;
  