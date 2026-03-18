import apiClient from './client';

export interface AirportDto {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export const airportsApi = {
  getAll: () => apiClient.get<AirportDto[]>('/airports').then((r) => r.data),
  getByCode: (code: string) => apiClient.get<AirportDto>(`/airports/${code}`).then((r) => r.data),
};
