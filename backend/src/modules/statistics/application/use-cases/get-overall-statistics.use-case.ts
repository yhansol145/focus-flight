import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository, SESSION_REPOSITORY } from '../../../sessions/domain/repositories/session.repository.interface';
import { SessionStatus } from '../../../sessions/domain/entities/session.entity';
import { OverallStatistics } from '../../domain/entities/statistics.entity';

@Injectable()
export class GetOverallStatisticsUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(): Promise<OverallStatistics> {
    const sessions = await this.sessionRepository.findAll();
    const completed = sessions.filter((s) => s.status === SessionStatus.COMPLETED);

    return new OverallStatistics(
      sessions.length,
      completed.length,
      completed.reduce((sum, s) => sum + s.plannedDuration, 0),
      completed.reduce((sum, s) => sum + s.milesEarned, 0),
    );
  }
}
