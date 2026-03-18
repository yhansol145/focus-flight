import { SeatClass } from '@/shared/api/sessions.api';

export interface BookingForm {
  departureAirportId: string;
  arrivalAirportId: string;
  seatClass: SeatClass;
  plannedDuration: number;
}

export type BookingStep = 'route' | 'duration' | 'seat' | 'confirm';
