import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository, SESSION_REPOSITORY } from '../../../sessions/domain/repositories/session.repository.interface';
import { SessionStatus } from '../../../sessions/domain/entities/session.entity';
import { HeatmapEntry } from '../../domain/entities/statistics.entity';

@Injectable()
export class GetHeatmapUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(): Promise<HeatmapEntry[]> {
    const sessions = await this.sessionRepository.findAll();
    const completed = sessions.filter((s) => s.status === SessionStatus.COMPLETED);

    const map = new Map<string, { count: number; focusMinutes: number }>();

    for (const session of completed) {
      const date = session.startedAt.toISOString().split('T')[0];
      const existing = map.get(date) ?? { count: 0, focusMinutes: 0 };
      map.set(date, {
        count: existing.count + 1,
        focusMinutes: existing.focusMinutes + session.plannedDuration,
      });
    }

    return Array.from(map.entries())
      .map(([date, data]) => new HeatmapEntry(date, data.count, data.focusMinutes))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
