import apiClient from './client';

export interface AchievementDto {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  unlockedAt: string | null;
}

export const achievementsApi = {
  getAll: () => apiClient.get<AchievementDto[]>('/achievements').then((r) => r.data),
  check: () => apiClient.post<AchievementDto[]>('/achievements/check').then((r) => r.data),
};
