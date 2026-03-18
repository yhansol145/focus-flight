import { useState, useEffect } from 'react';
import { SessionDto, sessionsApi } from '@/shared/api/sessions.api';

export function useFlightSession(sessionId: string) {
  const [session, setSession] = useState<SessionDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sessionsApi.getById(sessionId)
      .then(setSession)
      .finally(() => setIsLoading(false));
  }, [sessionId]);

  const complete = async () => {
    const updated = await sessionsApi.complete(sessionId);
    setSession(updated);
    return updated;
  };

  const abandon = async () => {
    const updated = await sessionsApi.abandon(sessionId);
    setSession(updated);
    return updated;
  };

  return { session, isLoading, complete, abandon };
}
