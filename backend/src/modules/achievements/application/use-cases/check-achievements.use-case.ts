import { Inject, Injectable } from '@nestjs/common';
import { IAchievementRepository, ACHIEVEMENT_REPOSITORY } from '../../domain/repositories/achievement.repository.interface';
import { ISessionRepository, SESSION_REPOSITORY } from '../../../sessions/domain/repositories/session.repository.interface';
import { SessionStatus, SeatClass } from '../../../sessions/domain/entities/session.entity';
import { Achievement, AchievementId } from '../../domain/entities/achievement.entity';

@Injectable()
export class CheckAchievementsUseCase {
  constructor(
    @Inject(ACHIEVEMENT_REPOSITORY)
    private readonly achievementRepository: IAchievementRepository,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(): Promise<Achievement[]> {
    const sessions = await this.sessionRepository.findAll();
    const completed = sessions.filter((s) => s.status === SessionStatus.COMPLETED);
    const totalMiles = completed.reduce((sum, s) => sum + s.milesEarned, 0);

    const conditions: Record<AchievementId, boolean> = {
      [AchievementId.FIRST_FLIGHT]:   completed.length >= 1,
      [AchievementId.FREQUENT_FLYER]: completed.length >= 10,
      [AchievementId.GLOBE_TROTTER]:  completed.length >= 50,
      [AchievementId.CENTURY]:        totalMiles >= 100,
      [AchievementId.MARATHON]:       completed.some((s) => s.plannedDuration >= 120),
      [AchievementId.FIRST_CLASS]:    completed.some((s) => s.seatClass === SeatClass.FIRST),
    };

    const newlyUnlocked: Achievement[] = [];

    for (const [id, met] of Object.entries(conditions) as [AchievementId, boolean][]) {
      if (!met) continue;
      const achievement = await this.achievementRepository.findById(id);
      if (achievement && !achievement.isUnlocked) {
        const unlocked = await this.achievementRepository.save(achievement.unlock());
        newlyUnlocked.push(unlocked);
      }
    }

    return newlyUnlocked;
  }
}
