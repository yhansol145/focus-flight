import { useNavigate } from 'react-router-dom';
import { useLogbook } from '@/features/logbook/application/use-cases/useLogbook';
import StatsSummary from '@/features/logbook/presentation/components/StatsSummary';
import Heatmap from '@/features/logbook/presentation/components/Heatmap';
import SessionList from '@/features/logbook/presentation/components/SessionList';

export default function LogbookPage() {
  const navigate = useNavigate();
  const { sessions, statistics, heatmap, isLoading } = useLogbook();

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="text-white/20 text-xs tracking-[0.3em] animate-pulse">LOADING</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1a] px-6 py-14">
      <div className="max-w-sm mx-auto flex flex-col gap-8">

        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-sm hover:text-white/60 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-white/60 text-[11px] tracking-[0.4em] uppercase">Logbook</h1>
          <div className="w-10" />
        </div>

        {/* 통계 */}
        {statistics && <StatsSummary statistics={statistics} />}

        {/* 히트맵 */}
        <Heatmap data={heatmap} />

        {/* 세션 리스트 */}
        <SessionList sessions={sessions} />
      </div>
    </div>
  );
}
