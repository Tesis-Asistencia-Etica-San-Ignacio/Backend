import axios from "axios";
import config from "../../../infrastructure/config";
import { GeminiModel, GeminiApiResponse } from "../../../infrastructure/config/geminiClient";
import { GroqModel, GroqApiResponse } from "../../../infrastructure/config/groqClient";


export class ObtainModelsUseCase {
    constructor() { }
    async execute() {
        try {

            const gemini = await axios.get<GeminiApiResponse>(`https://generativelanguage.googleapis.com/v1/models?key=${config.gemini.apiKey}`);
            const groq = await axios.get<GroqApiResponse>("https://api.groq.com/openai/v1/models", {
                headers: {
                    'Authorization': `Bearer ${config.groq.apiKey}`,
                    'Content-Type': 'application/json'
                  }
            });
    
            const filteredGemini = gemini.data.models.filter((model: GeminiModel) => 
                model.inputTokenLimit > 8192 && 
                model.outputTokenLimit >= 8192 && 
                !model.name.toLowerCase().includes('vision')
            );
            const geminiModelNames = filteredGemini.map(model => model.name.replace('models/', ''));
    
            const filteredGroqModels = groq.data.data.filter((model: GroqModel) => 
                model.context_window > 8192 && 
                model.max_completion_tokens >= 8192 && 
                !model.id.toLowerCase().includes('vision')
            );
            const groqModelIds = filteredGroqModels.map(model => model.id);
    
            return [{ "provider": "gemini", "models": geminiModelNames }, { "provider": "groq", "models": groqModelIds }];
        } catch (error) {
            throw new Error(`Error al obtener los modelos: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
}