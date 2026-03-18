import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISessionRepository, SESSION_REPOSITORY } from '../../domain/repositories/session.repository.interface';
import { Session } from '../../domain/entities/session.entity';

@Injectable()
export class GetSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(id: string): Promise<Session> {
    const session = await this.sessionRepository.findById(id);
    if (!session) throw new NotFoundException(`Session ${id} not found`);
    return session;
  }
}
