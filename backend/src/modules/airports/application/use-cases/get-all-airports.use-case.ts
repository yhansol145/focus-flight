import { Inject, Injectable } from '@nestjs/common';
import { IAirportRepository, AIRPORT_REPOSITORY } from '../../domain/repositories/airport.repository.interface';
import { Airport } from '../../domain/entities/airport.entity';

@Injectable()
export class GetAllAirportsUseCase {
  constructor(
    @Inject(AIRPORT_REPOSITORY)
    private readonly airportRepository: IAirportRepository,
  ) {}

  async execute(): Promise<Airport[]> {
    return this.airportRepository.findAll();
  }
}
