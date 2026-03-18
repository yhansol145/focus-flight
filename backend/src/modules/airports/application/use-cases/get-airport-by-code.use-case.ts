import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAirportRepository, AIRPORT_REPOSITORY } from '../../domain/repositories/airport.repository.interface';
import { Airport } from '../../domain/entities/airport.entity';

@Injectable()
export class GetAirportByCodeUseCase {
  constructor(
    @Inject(AIRPORT_REPOSITORY)
    private readonly airportRepository: IAirportRepository,
  ) {}

  async execute(code: string): Promise<Airport> {
    const airport = await this.airportRepository.findByCode(code);
    if (!airport) {
      throw new NotFoundException(`Airport with code ${code} not found`);
    }
    return airport;
  }
}
