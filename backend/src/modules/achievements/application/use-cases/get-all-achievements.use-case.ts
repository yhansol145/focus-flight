import { Inject, Injectable } from '@nestjs/common';
import { IAchievementRepository, ACHIEVEMENT_REPOSITORY } from '../../domain/repositories/achievement.repository.interface';
import { Achievement } from '../../domain/entities/achievement.entity';

@Injectable()
export class GetAllAchievementsUseCase {
  constructor(
    @Inject(ACHIEVEMENT_REPOSITORY)
    private readonly achievementRepository: IAchievementRepository,
  ) {}

  async execute(): Promise<Achievement[]> {
    return this.achievementRepository.findAll();
  }
}
