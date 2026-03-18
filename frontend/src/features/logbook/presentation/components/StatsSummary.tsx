import { OverallStatisticsDto } from '@/shared/api/statistics.api';

interface Props {
  statistics: OverallStatisticsDto;
}

export default function StatsSummary({ statistics }: Props) {
  const hours = Math.floor(statistics.totalFocusMinutes / 60);
  const mins = statistics.totalFocusMinutes % 60;

  const items = [
    { label: 'Flights', value: statistics.completedSessions },
    { label: 'Focus Time', value: hours > 0 ? `${hours}h ${mins}m` : `${mins}m` },
    { label: 'Miles', value: statistics.totalMilesEarned },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center">
          <div className="text-2xl font-light text-white tabular-nums">{item.value}</div>
          <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
