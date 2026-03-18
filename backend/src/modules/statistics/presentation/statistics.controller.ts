import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetOverallStatisticsUseCase } from '../application/use-cases/get-overall-statistics.use-case';
import { GetHeatmapUseCase } from '../application/use-cases/get-heatmap.use-case';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly getOverallStatistics: GetOverallStatisticsUseCase,
    private readonly getHeatmap: GetHeatmapUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: '전체 통계 조회 (총 세션, 집중 시간, 마일)' })
  overall() {
    return this.getOverallStatistics.execute();
  }

  @Get('heatmap')
  @ApiOperation({ summary: '히트맵 데이터 조회 (날짜별 세션 수)' })
  heatmap() {
    return this.getHeatmap.execute();
  }
}
