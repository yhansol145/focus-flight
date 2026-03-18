import { Module } from '@nestjs/common';
import { SessionsController } from './presentation/sessions.controller';
import { CreateSessionUseCase } from './application/use-cases/create-session.use-case';
import { CompleteSessionUseCase } from './application/use-cases/complete-session.use-case';
import { AbandonSessionUseCase } from './application/use-cases/abandon-session.use-case';
import { GetSessionUseCase } from './application/use-cases/get-session.use-case';
import { GetAllSessionsUseCase } from './application/use-cases/get-all-sessions.use-case';
import { SessionInMemoryRepository } from './infrastructure/repositories/session.in-memory.repository';
import { SESSION_REPOSITORY } from './domain/repositories/session.repository.interface';

@Module({
  controllers: [SessionsController],
  providers: [
    CreateSessionUseCase,
    CompleteSessionUseCase,
    AbandonSessionUseCase,
    GetSessionUseCase,
    GetAllSessionsUseCase,
    {
      provide: SESSION_REPOSITORY,
      useClass: SessionInMemoryRepository,
    },
  ],
  exports: [SESSION_REPOSITORY],
})
export class SessionsModule {}
