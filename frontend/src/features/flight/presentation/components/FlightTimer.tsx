import { FlightTimer as FlightTimerType } from '../../domain/flight.types';

interface Props {
  timer: FlightTimerType;
  departureCode: string;
  arrivalCode: string;
  seatClass: string;
}

const SEAT_LABEL: Record<string, string> = {
  economy: 'Economy',
  business: 'Business',
  first: 'First Class',
};

export default function FlightTimer({ timer, departureCode, arrivalCode, seatClass }: Props) {
  const minutes = Math.floor(timer.remainingSeconds / 60);
  const seconds = timer.remainingSeconds % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* 출발 → 도착 */}
      <div className="flex items-center gap-3 text-sm text-white/60 tracking-widest uppercase">
        <span>{departureCode}</span>
        <span className="text-white/30">——✈——</span>
        <span>{arrivalCode}</span>
      </div>

      {/* 타이머 */}
      <div className="text-6xl font-thin tracking-widest text-white tabular-nums">
        {timeStr}
      </div>

      {/* 좌석 등급 */}
      <div className="text-xs text-white/40 tracking-widest uppercase">
        {SEAT_LABEL[seatClass] ?? seatClass}
      </div>

      {/* 진행 바 */}
      <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-blue-400 rounded-full transition-all duration-1000"
          style={{ width: `${timer.progressPercent}%` }}
        />
      </div>
    </div>
  );
}
