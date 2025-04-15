// Crea un archivo types/ethicalNorm.d.ts
export interface EthicalNormSeed {
    description: string;
    status: "APROBADO" | "NO_APROBADO";
    codeNumber: number;
    justification?: string;
  }