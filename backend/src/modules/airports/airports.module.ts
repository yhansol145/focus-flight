import { Module } from '@nestjs/common';
import { AirportsController } from './presentation/airports.controller';
import { GetAllAirportsUseCase } from './application/use-cases/get-all-airports.use-case';
import { GetAirportByCodeUseCase } from './application/use-cases/get-airport-by-code.use-case';
import { AirportInMemoryRepository } from './infrastructure/repositories/airport.in-memory.repository';
import { AIRPORT_REPOSITORY } from './domain/repositories/airport.repository.interface';

@Module({
  controllers: [AirportsController],
  providers: [
    GetAllAirportsUseCase,
    GetAirportByCodeUseCase,
    {
      provide: AIRPORT_REPOSITORY,
      useClass: AirportInMemoryRepository,
    },
  ],
  exports: [AIRPORT_REPOSITORY],
})
export class AirportsModule {}
