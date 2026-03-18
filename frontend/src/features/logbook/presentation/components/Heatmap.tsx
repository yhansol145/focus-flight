import { HeatmapEntryDto } from '@/shared/api/statistics.api';

interface Props {
  data: HeatmapEntryDto[];
}

function getLast84Days(): string[] {
  const days: string[] = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function getIntensity(count: number): string {
  if (count === 0) return 'bg-white/5';
  if (count === 1) return 'bg-blue-900/70';
  if (count === 2) return 'bg-blue-700/80';
  if (count === 3) return 'bg-blue-500/90';
  return 'bg-blue-400';
}

export default function Heatmap({ data }: Props) {
  const days = getLast84Days();
  const countMap = new Map(data.map((d) => [d.date, d.count]));

  return (
    <div>
      <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3">Activity</p>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {days.map((date) => {
          const count = countMap.get(date) ?? 0;
          return (
            <div
              key={date}
              title={`${date}: ${count} sessions`}
              className={`aspect-square rounded-sm ${getIntensity(count)} transition-colors`}
            />
          );
        })}
      </div>
    </div>
  );
}
