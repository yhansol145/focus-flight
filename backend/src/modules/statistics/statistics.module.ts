import { Module } from '@nestjs/common';
import { StatisticsController } from './presentation/statistics.controller';
import { GetOverallStatisticsUseCase } from './application/use-cases/get-overall-statistics.use-case';
import { GetHeatmapUseCase } from './application/use-cases/get-heatmap.use-case';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  controllers: [StatisticsController],
  providers: [
    GetOverallStatisticsUseCase,
    GetHeatmapUseCase,
  ],
})
export class StatisticsModule {}
