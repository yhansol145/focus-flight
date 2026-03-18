import { Injectable } from '@nestjs/common';
import { ISessionRepository } from '../../domain/repositories/session.repository.interface';
import { Session } from '../../domain/entities/session.entity';

@Injectable()
export class SessionInMemoryRepository implements ISessionRepository {
  private sessions: Map<string, Session> = new Map();

  async findById(id: string): Promise<Session | null> {
    return this.sessions.get(id) ?? null;
  }

  async findAll(): Promise<Session[]> {
    return Array.from(this.sessions.values());
  }

  async save(session: Session): Promise<Session> {
    this.sessions.set(session.id, session);
    return session;
  }

  async update(session: Session): Promise<Session> {
    this.sessions.set(session.id, session);
    return session;
  }
}
