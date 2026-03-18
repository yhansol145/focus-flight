import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetAllAirportsUseCase } from '../application/use-cases/get-all-airports.use-case';
import { GetAirportByCodeUseCase } from '../application/use-cases/get-airport-by-code.use-case';

@ApiTags('airports')
@Controller('airports')
export class AirportsController {
  constructor(
    private readonly getAllAirports: GetAllAirportsUseCase,
    private readonly getAirportByCode: GetAirportByCodeUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: '전체 공항 목록 조회' })
  findAll() {
    return this.getAllAirports.execute();
  }

  @Get(':code')
  @ApiOperation({ summary: 'IATA 코드로 공항 조회' })
  findByCode(@Param('code') code: string) {
    return this.getAirportByCode.execute(code.toUpperCase());
  }
}
