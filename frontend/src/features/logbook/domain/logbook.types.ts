import { SessionDto } from '@/shared/api/sessions.api';

export interface LogbookEntry extends SessionDto {
  departureName: string;
  arrivalName: string;
}
