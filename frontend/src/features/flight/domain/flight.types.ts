export interface FlightTimer {
  totalSeconds: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  progressPercent: number;
  isExpired: boolean;
}
