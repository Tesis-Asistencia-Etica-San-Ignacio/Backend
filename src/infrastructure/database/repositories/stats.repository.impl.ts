// src/infrastructure/database/repositories/stats.repository.impl.ts
import { EvaluationModel } from '../models/evaluation.model'
import { IStatsRepository } from '../../../domain/repositories/stats.repository'
import { EvaluationStatsDto } from '../../../application'
import { differenceInCalendarDays, subMonths } from 'date-fns'

export class StatsRepositoryImpl implements IStatsRepository {
    async aggregateEvaluationStats(from: Date, to: Date): Promise<EvaluationStatsDto> {
        // Ajustamos 'from' a la medianoche UTC de ese día,
        // y 'to' a la medianoche UTC del día SIGUIENTE
        const toUtcMidnight = (d: Date) =>
            new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
        from = toUtcMidnight(from)
        to = new Date(Date.UTC(to.getFullYear(), to.getMonth(), to.getDate() + 1))

        // Rango anterior de un mes
        const prevFrom = subMonths(from, 1)
        const prevTo = subMonths(to, 1)

        // Función para agrupar tarjetas
        async function groupCards(f: Date, t: Date) {
            const [agg] = await EvaluationModel.aggregate([
                {
                    $match: {
                        fecha_inicial: { $gte: f, $lt: t }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 },
                        aprobados: { $sum: { $cond: ['$aprobado', 1, 0] } },
                        rechazados: { $sum: { $cond: ['$aprobado', 0, 1] } },
                    }
                }
            ])
            return {
                total: agg?.total ?? 0,
                aprobados: agg?.aprobados ?? 0,
                rechazados: agg?.rechazados ?? 0,
            }
        }

        const nowStats = await groupCards(from, to)
        const prevStats = await groupCards(prevFrom, prevTo)

        // Tasa de devolución
        const tasaNow = nowStats.total ? nowStats.rechazados / nowStats.total : 0
        const tasaPrev = prevStats.total ? prevStats.rechazados / prevStats.total : 0

        // Determinamos el formato de agrupación temporal
        const rangeDays = differenceInCalendarDays(to, from)
        const unit =
            rangeDays <= 45 ? '%Y-%m-%d' :
                rangeDays <= 365 ? '%Y-%V' :
                    '%Y-%m'

        // Serie de líneas — usamos $lt para incluir todo el día final
        const lineSeriesAgg = await EvaluationModel.aggregate([
            {
                $match: {
                    fecha_final: { $gte: from, $lt: to },
                    estado: 'EVALUADO',
                }
            },
            {
                $group: {
                    _id: { bucket: { $dateToString: { format: unit, date: '$fecha_final' } } },
                    evaluadas: { $sum: 1 }
                }
            },
            { $sort: { '_id.bucket': 1 } }
        ])

        return {
            cards: {
                total: {
                    title: 'Total de consentimientos evaluados',
                    value: nowStats.total,
                    previousValue: prevStats.total,
                },
                aprobados: {
                    title: 'Consentimientos aprobados',
                    value: nowStats.aprobados,
                    previousValue: prevStats.aprobados,
                },
                rechazados: {
                    title: 'Consentimientos devueltos',
                    value: nowStats.rechazados,
                    previousValue: prevStats.rechazados,
                },
                tasaDevolucion: {
                    value: tasaNow,
                    previousValue: tasaPrev,
                },
            },
            lineSeries: lineSeriesAgg.map(d => ({
                date: d._id.bucket as string,
                evaluadas: d.evaluadas as number,
            })),
            pieSeries: [
                { label: 'Aprobadas', value: nowStats.aprobados },
                { label: 'Rechazadas', value: nowStats.rechazados }
            ]
        }
    }
}
