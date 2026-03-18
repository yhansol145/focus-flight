import { useEffect, useRef, useState, useCallback } from 'react';
import { FlightTimer } from '../../domain/flight.types';

export function useFlightTimer(plannedDuration: number, onExpire?: () => void) {
  const totalSeconds = plannedDuration * 60;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    expiredRef.current = false;
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next >= totalSeconds && !expiredRef.current) {
          expiredRef.current = true;
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          onExpireRef.current?.();
        }
        return Math.min(next, totalSeconds);
      });
    }, 1000);
    return stop;
  }, [totalSeconds, stop]);

  const remaining = totalSeconds - elapsedSeconds;

  const timer: FlightTimer = {
    totalSeconds,
    elapsedSeconds,
    remainingSeconds: Math.max(remaining, 0),
    progressPercent: totalSeconds > 0 ? (elapsedSeconds / totalSeconds) * 100 : 0,
    isExpired: remaining <= 0,
  };

  return { timer, stop };
}
