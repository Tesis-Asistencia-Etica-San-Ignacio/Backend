export interface CardStatsDto {
    value: number
    previousValue: number
}
export interface EvaluationStatsDto {
    cards: {
        total: CardStatsDto
        aprobados: CardStatsDto
        rechazados: CardStatsDto
        tasaDevolucion: {
            value: number
            previousValue: number
        }
    }
    lineSeries: { date: string; evaluadas: number }[]
    pieSeries: { label: string; value: number }[]
}
