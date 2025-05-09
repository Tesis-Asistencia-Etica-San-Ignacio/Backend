import config from "../../../infrastructure/config";
import fs from 'fs/promises';
import path from 'path';

export class ModifyProviderApiKeyUseCase {
    async execute(provider: string, apiKey: string){
        const envFilePath = path.resolve(process.cwd(), '.env');
        try {
            // Leer el contenido actual del archivo .env
            const currentEnvContent = await fs.readFile(envFilePath, 'utf-8');
            let updatedEnvContent: string;
            let envVarName: string;

            // Determinar qué variable modificar según el proveedor
            if (provider.toLowerCase() === 'gemini') {
                envVarName = 'GEMINI_API_KEY';
            } else if (provider.toLowerCase() === 'groq') {
                envVarName = 'GROQ_API_KEY';
            } else {
                throw new Error(`Proveedor no soportado: ${provider}`);
            }

            // Verificar si la variable ya existe en el archivo
            const regexPattern = new RegExp(`^${envVarName}\\s*=.*$`, 'm');
            
            if (regexPattern.test(currentEnvContent)) {
                // Si existe, reemplazar el valor
                updatedEnvContent = currentEnvContent.replace(
                    regexPattern,
                    `${envVarName} = ${apiKey}`
                );
            } else {
                // Si no existe, añadirla al final del archivo
                updatedEnvContent = `${currentEnvContent}\n${envVarName} = ${apiKey}`;
            }

            // Escribir el contenido actualizado de vuelta al archivo
            await fs.writeFile(envFilePath, updatedEnvContent, 'utf-8');
            
            // Actualizar la configuración en memoria
            if (provider.toLowerCase() === 'gemini') {
                config.gemini.apiKey = apiKey;
            } else if (provider.toLowerCase() === 'groq') {
                config.groq.apiKey = apiKey;
            }

            return provider;
        } catch (error) {
            console.error(`Error al actualizar la API key para ${provider}:`, error);
            throw error;
        }
    }
}