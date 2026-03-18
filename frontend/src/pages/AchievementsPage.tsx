import { useNavigate } from 'react-router-dom';
import { useAchievements } from '@/features/achievements/application/use-cases/useAchievements';
import AchievementCard from '@/features/achievements/presentation/components/AchievementCard';

export default function AchievementsPage() {
  const navigate = useNavigate();
  const { achievements, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="text-white/20 text-xs tracking-[0.3em] animate-pulse">LOADING</div>
      </div>
    );
  }

  const unlocked = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="min-h-screen bg-[#060d1a] px-6 py-14">
      <div className="max-w-sm mx-auto flex flex-col gap-6">

        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-sm hover:text-white/60 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-white/60 text-[11px] tracking-[0.4em] uppercase">Achievements</h1>
          <div className="w-10" />
        </div>

        {/* 진행률 */}
        <div className="text-center py-2">
          <div className="text-3xl font-light text-white">{unlocked}
            <span className="text-white/20 text-lg"> / {achievements.length}</span>
          </div>
          <div className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-1">Unlocked</div>
          <div className="w-full h-0.5 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${(unlocked / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 뱃지 리스트 */}
        <div className="flex flex-col gap-2.5">
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
