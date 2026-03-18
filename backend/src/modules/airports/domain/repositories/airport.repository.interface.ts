import { Airport } from '../entities/airport.entity';

export const AIRPORT_REPOSITORY = Symbol('AIRPORT_REPOSITORY');

export interface IAirportRepository {
  findAll(): Promise<Airport[]>;
  findByCode(code: string): Promise<Airport | null>;
  findById(id: string): Promise<Airport | null>;
}
