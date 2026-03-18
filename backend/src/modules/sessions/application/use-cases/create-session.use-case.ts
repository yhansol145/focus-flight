import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository, SESSION_REPOSITORY } from '../../domain/repositories/session.repository.interface';
import { Session } from '../../domain/entities/session.entity';
import { CreateSessionDto } from '../dto/create-session.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(dto: CreateSessionDto): Promise<Session> {
    const session = Session.create({
      id: randomUUID(),
      departureAirportId: dto.departureAirportId,
      arrivalAirportId: dto.arrivalAirportId,
      seatClass: dto.seatClass,
      plannedDuration: dto.plannedDuration,
    });
    return this.sessionRepository.save(session);
  }
}
