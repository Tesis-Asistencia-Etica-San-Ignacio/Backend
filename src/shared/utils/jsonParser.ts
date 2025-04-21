export function parseJson<T = any>(jsonString: string): T {
    try {
      // Eliminar caracteres especiales y espacios innecesarios
      const cleanedString = jsonString
        .replace(/\\n/g, '')
        .replace(/\\"/g, '"')
        .trim();
  
      return JSON.parse(cleanedString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Formato de respuesta inválido');
    }
  }