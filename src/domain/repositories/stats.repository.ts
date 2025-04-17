import { EvaluationStatsDto } from '../../application/dtos/stats/evaluationStats.dto'

export interface IStatsRepository {
    aggregateEvaluationStats(from: Date, to: Date): Promise<EvaluationStatsDto>
}