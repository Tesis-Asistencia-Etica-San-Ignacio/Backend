// src/cache/pdfCache.ts
/**
 * Clave: evaluationId
 * Valor: Buffer con el PDF generado
 */
const pdfCache = new Map<string, Buffer>();

export default pdfCache;
