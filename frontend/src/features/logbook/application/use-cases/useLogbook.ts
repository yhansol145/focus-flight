import { useEffect, useState } from 'react';
import { SessionDto, sessionsApi } from '@/shared/api/sessions.api';
import { OverallStatisticsDto, HeatmapEntryDto, statisticsApi } from '@/shared/api/statistics.api';

export function useLogbook() {
  const [sessions, setSessions] = useState<SessionDto[]>([]);
  const [statistics, setStatistics] = useState<OverallStatisticsDto | null>(null);
  const [heatmap, setHeatmap] = useState<HeatmapEntryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      sessionsApi.getAll(),
      statisticsApi.getOverall(),
      statisticsApi.getHeatmap(),
    ])
      .then(([s, stats, heat]) => {
        setSessions(s);
        setStatistics(stats);
        setHeatmap(heat);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { sessions, statistics, heatmap, isLoading };
}
