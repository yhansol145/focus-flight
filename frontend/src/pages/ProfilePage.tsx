import { useNavigate } from 'react-router-dom';
import { useLogbook } from '@/features/logbook/application/use-cases/useLogbook';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { statistics } = useLogbook();

  const hours = Math.floor((statistics?.totalFocusMinutes ?? 0) / 60);
  const mins = (statistics?.totalFocusMinutes ?? 0) % 60;

  return (
    <div className="min-h-screen bg-[#060d1a] px-6 py-14 pb-24">
      <div className="max-w-sm mx-auto flex flex-col gap-8">

        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-sm hover:text-white/60 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-white/60 text-[11px] tracking-[0.4em] uppercase">Profile</h1>
          <div className="w-10" />
        </div>

        {/* 아바타 */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30
                          flex items-center justify-center text-2xl">
            ✈
          </div>
          <div className="text-white text-sm tracking-wider">Pilot</div>
          <div className="text-white/30 text-xs tracking-widest">
            {statistics?.totalMilesEarned ?? 0} miles
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Flights',   value: statistics?.totalSessions ?? 0 },
            { label: 'Completed',       value: statistics?.completedSessions ?? 0 },
            { label: 'Focus Time',      value: hours > 0 ? `${hours}h ${mins}m` : `${mins}m` },
            { label: 'Miles Earned',    value: statistics?.totalMilesEarned ?? 0 },
          ].map((item) => (
            <div key={item.label}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4">
              <div className="text-xl font-light text-white tabular-nums">{item.value}</div>
              <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* 설정 */}
        <div className="flex flex-col gap-2">
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-1">Settings</p>
          {[
            { label: 'Notifications',  value: 'On' },
            { label: 'Default Sound',  value: 'Cabin' },
            { label: 'Theme',          value: 'Dark' },
          ].map((item) => (
            <div key={item.label}
              className="flex items-center justify-between bg-white/[0.03] border border-white/[0.07]
                         rounded-xl px-4 py-3.5">
              <span className="text-sm text-white/60">{item.label}</span>
              <span className="text-xs text-white/30">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
