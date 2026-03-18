import { Injectable } from '@nestjs/common';
import { IAchievementRepository } from '../../domain/repositories/achievement.repository.interface';
import { Achievement, AchievementId, ACHIEVEMENT_DEFINITIONS } from '../../domain/entities/achievement.entity';

@Injectable()
export class AchievementInMemoryRepository implements IAchievementRepository {
  private achievements: Map<AchievementId, Achievement> = new Map(
    ACHIEVEMENT_DEFINITIONS.map((def) => [
      def.id,
      new Achievement(def.id, def.name, def.description, null),
    ]),
  );

  async findAll(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async findById(id: AchievementId): Promise<Achievement | null> {
    return this.achievements.get(id) ?? null;
  }

  async save(achievement: Achievement): Promise<Achievement> {
    this.achievements.set(achievement.id, achievement);
    return achievement;
  }
}
