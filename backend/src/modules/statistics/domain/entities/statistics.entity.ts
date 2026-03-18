export class OverallStatistics {
  constructor(
    public readonly totalSessions: number,
    public readonly completedSessions: number,
    public readonly totalFocusMinutes: number,
    public readonly totalMilesEarned: number,
  ) {}
}

export class HeatmapEntry {
  constructor(
    public readonly date: string, // YYYY-MM-DD
    public readonly count: number,
    public readonly focusMinutes: number,
  ) {}
}
