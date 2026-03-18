import { Achievement, AchievementId } from '../entities/achievement.entity';

export const ACHIEVEMENT_REPOSITORY = Symbol('ACHIEVEMENT_REPOSITORY');

export interface IAchievementRepository {
  findAll(): Promise<Achievement[]>;
  findById(id: AchievementId): Promise<Achievement | null>;
  save(achievement: Achievement): Promise<Achievement>;
}
