import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetAllAchievementsUseCase } from '../application/use-cases/get-all-achievements.use-case';
import { CheckAchievementsUseCase } from '../application/use-cases/check-achievements.use-case';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(
    private readonly getAllAchievements: GetAllAchievementsUseCase,
    private readonly checkAchievements: CheckAchievementsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: '전체 뱃지 목록 조회 (잠금/해제 여부 포함)' })
  findAll() {
    return this.getAllAchievements.execute();
  }

  @Post('check')
  @ApiOperation({ summary: '달성 조건 확인 후 신규 뱃지 해제' })
  check() {
    return this.checkAchievements.execute();
  }
}
