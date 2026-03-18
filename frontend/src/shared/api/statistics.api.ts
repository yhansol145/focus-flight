import apiClient from './client';

export interface OverallStatisticsDto {
  totalSessions: number;
  completedSessions: number;
  totalFocusMinutes: number;
  totalMilesEarned: number;
}

export interface HeatmapEntryDto {
  date: string;
  count: number;
  focusMinutes: number;
}

export const statisticsApi = {
  getOverall: () => apiClient.get<OverallStatisticsDto>('/statistics').then((r) => r.data),
  getHeatmap: () => apiClient.get<HeatmapEntryDto[]>('/statistics/heatmap').then((r) => r.data),
};
