import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { SeatClass } from '../../domain/entities/session.entity';

export class CreateSessionDto {
  @IsString()
  departureAirportId: string;

  @IsString()
  arrivalAirportId: string;

  @IsEnum(SeatClass)
  seatClass: SeatClass;

  @IsInt()
  @Min(15)
  @Max(120)
  plannedDuration: number;
}
