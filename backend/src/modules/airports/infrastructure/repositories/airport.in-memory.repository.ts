import { Injectable } from '@nestjs/common';
import { IAirportRepository } from '../../domain/repositories/airport.repository.interface';
import { Airport } from '../../domain/entities/airport.entity';

const AIRPORTS: Airport[] = [
  new Airport('1', 'ICN', '인천국제공항', '인천', '대한민국', 37.4602, 126.4407),
  new Airport('2', 'GMP', '김포국제공항', '서울', '대한민국', 37.5583, 126.7906),
  new Airport('3', 'JFK', 'John F. Kennedy International Airport', '뉴욕', '미국', 40.6413, -73.7781),
  new Airport('4', 'LHR', 'Heathrow Airport', '런던', '영국', 51.4700, -0.4543),
  new Airport('5', 'NRT', '나리타국제공항', '도쿄', '일본', 35.7647, 140.3864),
  new Airport('6', 'CDG', 'Charles de Gaulle Airport', '파리', '프랑스', 49.0097, 2.5479),
  new Airport('7', 'DXB', 'Dubai International Airport', '두바이', '아랍에미리트', 25.2532, 55.3657),
  new Airport('8', 'SYD', 'Sydney Kingsford Smith Airport', '시드니', '호주', -33.9399, 151.1753),
];

@Injectable()
export class AirportInMemoryRepository implements IAirportRepository {
  async findAll(): Promise<Airport[]> {
    return AIRPORTS;
  }

  async findByCode(code: string): Promise<Airport | null> {
    return AIRPORTS.find((a) => a.code === code) ?? null;
  }

  async findById(id: string): Promise<Airport | null> {
    return AIRPORTS.find((a) => a.id === id) ?? null;
  }
}
