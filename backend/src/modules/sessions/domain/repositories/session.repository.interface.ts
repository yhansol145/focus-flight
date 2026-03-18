import { Session } from '../entities/session.entity';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface ISessionRepository {
  findById(id: string): Promise<Session | null>;
  findAll(): Promise<Session[]>;
  save(session: Session): Promise<Session>;
  update(session: Session): Promise<Session>;
}
