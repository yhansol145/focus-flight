export class Airport {
  constructor(
    public readonly id: string,
    public readonly code: string,    // IATA 코드 (e.g. ICN, JFK)
    public readonly name: string,    // 공항명
    public readonly city: string,
    public readonly country: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}
