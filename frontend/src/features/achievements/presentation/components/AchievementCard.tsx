import { AchievementDto } from '@/shared/api/achievements.api';

interface Props {
  achievement: AchievementDto;
}

const ICONS: Record<string, string> = {
  first_flight:   '🛫',
  frequent_flyer: '🎫',
  globe_trotter:  '🌍',
  century:        '💎',
  marathon:       '⏱',
  first_class:    '👑',
};

export default function AchievementCard({ achievement }: Props) {
  return (
    <div className={`flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all
      ${achievement.isUnlocked
        ? 'bg-blue-500/10 border-blue-500/30'
        : 'bg-white/[0.02] border-white/[0.06]'
      }`}>
      <div className={`text-2xl w-10 text-center ${!achievement.isUnlocked && 'grayscale opacity-30'}`}>
        {ICONS[achievement.id] ?? '🏅'}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-light ${achievement.isUnlocked ? 'text-white' : 'text-white/30'}`}>
          {achievement.name}
        </div>
        <div className="text-[11px] text-white/25 mt-0.5 truncate">{achievement.description}</div>
        {achievement.isUnlocked && achievement.unlockedAt && (
          <div className="text-[10px] text-blue-400/70 mt-1">
            {new Date(achievement.unlockedAt).toLocaleDateString('ko-KR')} 달성
          </div>
        )}
      </div>
      {achievement.isUnlocked && (
        <div className="text-blue-400 text-xs">✓</div>
      )}
    </div>
  );
}
