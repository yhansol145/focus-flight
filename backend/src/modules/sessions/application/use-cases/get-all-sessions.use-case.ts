import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository, SESSION_REPOSITORY } from '../../domain/repositories/session.repository.interface';
import { Session } from '../../domain/entities/session.entity';

@Injectable()
export class GetAllSessionsUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(): Promise<Session[]> {
    return this.sessionRepository.findAll();
  }
}
