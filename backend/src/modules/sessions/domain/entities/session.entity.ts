export enum SeatClass {
  ECONOMY = 'economy',
  BUSINESS = 'business',
  FIRST = 'first',
}

export enum SessionStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

const MILES_MULTIPLIER: Record<SeatClass, number> = {
  [SeatClass.ECONOMY]: 1.0,
  [SeatClass.BUSINESS]: 1.5,
  [SeatClass.FIRST]: 2.0,
};

export class Session {
  constructor(
    public readonly id: string,
    public readonly departureAirportId: string,
    public readonly arrivalAirportId: string,
    public readonly seatClass: SeatClass,
    public readonly plannedDuration: number, // 분 단위
    public readonly status: SessionStatus,
    public readonly startedAt: Date,
    public readonly completedAt: Date | null,
    public readonly milesEarned: number,
  ) {}

  static create(params: {
    id: string;
    departureAirportId: string;
    arrivalAirportId: string;
    seatClass: SeatClass;
    plannedDuration: number;
  }): Session {
    return new Session(
      params.id,
      params.departureAirportId,
      params.arrivalAirportId,
      params.seatClass,
      params.plannedDuration,
      SessionStatus.IN_PROGRESS,
      new Date(),
      null,
      0,
    );
  }

  complete(): Session {
    const miles = Math.round(this.plannedDuration * MILES_MULTIPLIER[this.seatClass]);
    return new Session(
      this.id,
      this.departureAirportId,
      this.arrivalAirportId,
      this.seatClass,
      this.plannedDuration,
      SessionStatus.COMPLETED,
      this.startedAt,
      new Date(),
      miles,
    );
  }

  abandon(): Session {
    return new Session(
      this.id,
      this.departureAirportId,
      this.arrivalAirportId,
      this.seatClass,
      this.plannedDuration,
      SessionStatus.ABANDONED,
      this.startedAt,
      new Date(),
      0,
    );
  }
}
