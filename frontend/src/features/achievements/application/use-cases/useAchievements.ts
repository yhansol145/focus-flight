import { useEffect, useState } from 'react';
import { AchievementDto, achievementsApi } from '@/shared/api/achievements.api';

export function useAchievements() {
  const [achievements, setAchievements] = useState<AchievementDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    achievementsApi.getAll()
      .then(setAchievements)
      .finally(() => setIsLoading(false));
  }, []);

  return { achievements, isLoading };
}
