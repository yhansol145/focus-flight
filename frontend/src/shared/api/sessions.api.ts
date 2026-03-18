import apiClient from './client';

export type SeatClass = 'economy' | 'business' | 'first';
export type SessionStatus = 'in_progress' | 'completed' | 'abandoned';

export interface SessionDto {
  id: string;
  departureAirportId: string;
  arrivalAirportId: string;
  seatClass: SeatClass;
  plannedDuration: number;
  status: SessionStatus;
  startedAt: string;
  completedAt: string | null;
  milesEarned: number;
}

export interface CreateSessionRequest {
  departureAirportId: string;
  arrivalAirportId: string;
  seatClass: SeatClass;
  plannedDuration: number;
}

export const sessionsApi = {
  create: (body: CreateSessionRequest) => apiClient.post<SessionDto>('/sessions', body).then((r) => r.data),
  getAll: () => apiClient.get<SessionDto[]>('/sessions').then((r) => r.data),
  getById: (id: string) => apiClient.get<SessionDto>(`/sessions/${id}`).then((r) => r.data),
  complete: (id: string) => apiClient.patch<SessionDto>(`/sessions/${id}/complete`).then((r) => r.data),
  abandon: (id: string) => apiClient.patch<SessionDto>(`/sessions/${id}/abandon`).then((r) => r.data),
};
