import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ISessionRepository, SESSION_REPOSITORY } from '../../domain/repositories/session.repository.interface';
import { Session, SessionStatus } from '../../domain/entities/session.entity';

@Injectable()
export class AbandonSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(id: string): Promise<Session> {
    const session = await this.sessionRepository.findById(id);
    if (!session) throw new NotFoundException(`Session ${id} not found`);
    if (session.status !== SessionStatus.IN_PROGRESS) {
      throw new BadRequestException('Only in-progress sessions can be abandoned');
    }
    return this.sessionRepository.update(session.abandon());
  }
}
