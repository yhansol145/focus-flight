import { SessionDto } from '@/shared/api/sessions.api';

interface Props {
  sessions: SessionDto[];
}

const STATUS_STYLE: Record<string, string> = {
  completed: 'text-blue-400',
  abandoned: 'text-white/20',
  in_progress: 'text-yellow-400',
};

const SEAT_LABEL: Record<string, string> = {
  economy: 'ECO',
  business: 'BIZ',
  first: 'FST',
};

export default function SessionList({ sessions }: Props) {
  const sorted = [...sessions].reverse();

  if (sorted.length === 0) {
    return (
      <div className="text-center py-12 text-white/20 text-sm tracking-wider">
        아직 비행 기록이 없습니다
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-1">Flight Log</p>
      {sorted.map((s) => (
        <div key={s.id}
          className="flex items-center justify-between bg-white/[0.03] border border-white/[0.07]
                     rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] tracking-widest font-mono ${STATUS_STYLE[s.status]}`}>
              {s.status === 'completed' ? '✈' : s.status === 'abandoned' ? '✕' : '…'}
            </span>
            <div>
              <div className="text-sm text-white font-light">{s.plannedDuration}분</div>
              <div className="text-[10px] text-white/30 mt-0.5">
                {new Date(s.startedAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-400 font-light">
              {s.status === 'completed' ? `+${s.milesEarned} mi` : '—'}
            </div>
            <div className="text-[10px] text-white/20 mt-0.5">{SEAT_LABEL[s.seatClass]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
