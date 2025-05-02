import mongoose from '../../../infrastructure/database/database';
import { readPdfContent } from '../../../shared/utils/fileProcessor';
import { getAnalysisPrompt } from '../../prompts/analisis.prompt';
import { parseJson } from '../../../shared/utils/jsonParser';

import {
    GetEvaluacionByIdUseCase,
    GetEvaluacionesByUserUseCase,
    GetPromptsByEvaluatorIdUseCase,
    GenerateCompletionUseCase,
    deleteEthicalRulesByEvaluationIdUseCase,
    CreateEthicalRulesUseCase,
    UpdateEvaluacionUseCase,
    getFileByNameBuffer,
} from '../../index';

interface EvaluatePipelineDto {
    evaluatorId: string;
    evaluationId: string;
    cleanNormsBefore: boolean;
    // false → primera evaluación
}

export class EvaluatePipelineUseCase {
    constructor(
        private readonly getEvalById: GetEvaluacionByIdUseCase,
        private readonly getEvalsByUser: GetEvaluacionesByUserUseCase,
        private readonly getPrompts: GetPromptsByEvaluatorIdUseCase,
        private readonly generateLLM: GenerateCompletionUseCase,
        private readonly deleteNorms: deleteEthicalRulesByEvaluationIdUseCase,
        private readonly createNorms: CreateEthicalRulesUseCase,
        private readonly updateEval: UpdateEvaluacionUseCase,
    ) { }

    public async execute(dto: EvaluatePipelineDto): Promise<void> {
        const { evaluatorId, evaluationId, cleanNormsBefore } = dto;

        /* 1 ─ Verificar que la evaluación pertenece al usuario */
        const evalsUser = await this.getEvalsByUser.execute(evaluatorId);
        const exists = evalsUser.some(e => e.id.toString() === evaluationId);
        if (!exists) throw new Error('Evaluación no encontrada para el usuario');

        /* 2 ─ Traer evaluación y validar estado */
        const evaluation = await this.getEvalById.execute(evaluationId);
        if (!evaluation) throw new Error('Evaluación no encontrada');
        if (!cleanNormsBefore && evaluation.estado !== 'PENDIENTE')
            throw new Error('La evaluación ya fue procesada');
        if (cleanNormsBefore &&
            !(evaluation.estado === 'EN CURSO' || evaluation.estado === 'EVALUADO'))
            throw new Error('Solo se puede re-evaluar si la evaluación está EN CURSO o EVALUADO');

        /* 3 ─ Obtener archivo desde MinIO */
        const fileName = evaluation.file.split('/').pop() || '';
        const fileBuffer = await getFileByNameBuffer(fileName);
        const fileContent = fileName.endsWith('.pdf')
            ? await readPdfContent(fileBuffer)
            : fileBuffer.toString();

        /* 4 ─ Obtener prompts personalizados del evaluador */
        const prompts = await this.getPrompts.execute(evaluatorId);
        if (!prompts) throw new Error('Prompts no encontrados para el evaluador');

        const { system, user } = getAnalysisPrompt(fileContent, prompts);

        /* 5 ─ Ejecutar modelo LLM */
        const completion = await this.generateLLM.execute(
            [
                { role: 'system', content: system },
                { role: 'user', content: user },
            ],
            {
                model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                /* 
                meta-llama/llama-4-scout-17b-16e-instruct
                llama-3.3-70b-versatile
                llama-3.1-8b-instant
                deepseek-r1-distill-llama-70b
                meta-llama/llama-4-maverick-17b-128e-instruct
                mistral-saba-24b
                meta-llama/llama-4-scout-17b-16e-instruct
                 */
                temperature: 0.2,
                response_format: { type: 'json_object' },
            },
        );
        const raw = completion.choices[0]?.message?.content;
        /* console.log('raw', raw); */
        if (!raw) throw new Error('Sin respuesta del modelo');
        const parsed = parseJson(raw);
        if (typeof parsed !== 'object' || !parsed.analysis)
            throw new Error('Formato JSON inválido');

        /* 6 ─ Lógica principal sin transacción */
        if (cleanNormsBefore) {
            await this.deleteNorms.execute(evaluation.id);
        }
        await this.createNorms.crearNormasEticasBase(evaluation.id, parsed.analysis,);
        await this.updateEval.execute(evaluation.id, { estado: 'EN CURSO' });
    }
}
