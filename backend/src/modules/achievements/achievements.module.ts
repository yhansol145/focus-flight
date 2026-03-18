import { Module } from '@nestjs/common';
import { AchievementsController } from './presentation/achievements.controller';
import { GetAllAchievementsUseCase } from './application/use-cases/get-all-achievements.use-case';
import { CheckAchievementsUseCase } from './application/use-cases/check-achievements.use-case';
import { AchievementInMemoryRepository } from './infrastructure/repositories/achievement.in-memory.repository';
import { ACHIEVEMENT_REPOSITORY } from './domain/repositories/achievement.repository.interface';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [SessionsModule],
  controllers: [AchievementsController],
  providers: [
    GetAllAchievementsUseCase,
    CheckAchievementsUseCase,
    {
      provide: ACHIEVEMENT_REPOSITORY,
      useClass: AchievementInMemoryRepository,
    },
  ],
})
export class AchievementsModule {}
