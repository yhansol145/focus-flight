import { useEffect, useState } from 'react';
import { AirportDto, airportsApi } from '@/shared/api/airports.api';

export function useFlightAirports(departureId: string, arrivalId: string) {
  const [departure, setDeparture] = useState<AirportDto | null>(null);
  const [arrival, setArrival] = useState<AirportDto | null>(null);

  useEffect(() => {
    if (!departureId || !arrivalId) return;
    Promise.all([
      airportsApi.getAll(),
    ]).then(([airports]) => {
      setDeparture(airports.find((a) => a.id === departureId) ?? null);
      setArrival(airports.find((a) => a.id === arrivalId) ?? null);
    });
  }, [departureId, arrivalId]);

  return { departure, arrival };
}
