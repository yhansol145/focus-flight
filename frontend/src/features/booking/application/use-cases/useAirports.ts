import { useEffect, useState } from 'react';
import { AirportDto, airportsApi } from '@/shared/api/airports.api';

export function useAirports() {
  const [airports, setAirports] = useState<AirportDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    airportsApi.getAll()
      .then(setAirports)
      .finally(() => setIsLoading(false));
  }, []);

  return { airports, isLoading };
}
