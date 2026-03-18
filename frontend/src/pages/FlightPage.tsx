import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFlightSession } from '@/features/flight/application/use-cases/useFlightSession';
import { useFlightTimer } from '@/features/flight/application/use-cases/useFlightTimer';
import { useFlightAirports } from '@/features/flight/application/use-cases/useFlightAirports';
import { useAmbientSound } from '@/features/flight/application/use-cases/useAmbientSound';
import FlightMap from '@/features/flight/presentation/components/FlightMap';
import AmbientSoundPicker from '@/features/flight/presentation/components/AmbientSoundPicker';
import Toast from '@/shared/components/Toast';
import { useToast } from '@/shared/hooks/useToast';
import { achievementsApi } from '@/shared/api/achievements.api';

const SEAT_LABEL: Record<string, string> = {
  economy: 'ECONOMY',
  business: 'BUSINESS',
  first: 'FIRST CLASS',
};

export default function FlightPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const { session, complete, abandon } = useFlightSession(sessionId!);
  const { current: ambientType, setCurrent: setAmbientType } = useAmbientSound();

  // 세션 완료 후 achievements 체크
  const checkAchievements = useCallback(async () => {
    const newlyUnlocked = await achievementsApi.check();
    newlyUnlocked.forEach((a) => {
      addToast(`🏅 ${a.name} 달성!`, 'achievement');
    });
  }, [addToast]);

  // 타이머 만료 → 자동 완료
  const handleExpire = useCallback(async () => {
    await complete();
    addToast('✈ 착륙 완료! 수고하셨습니다', 'success');
    await checkAchievements();
    setTimeout(() => navigate('/logbook'), 2000);
  }, [complete, addToast, checkAchievements, navigate]);

  const { timer, stop } = useFlightTimer(session?.plannedDuration ?? 0, handleExpire);

  const { departure, arrival } = useFlightAirports(
    session?.departureAirportId ?? '',
    session?.arrivalAirportId ?? '',
  );

  // 세션이 이미 완료/포기 상태면 타이머 정지
  useEffect(() => {
    if (session?.status !== 'in_progress') stop();
  }, [session?.status, stop]);

  const handleComplete = async () => {
    stop();
    await complete();
    addToast('✈ 착륙 완료! 수고하셨습니다', 'success');
    await checkAchievements();
    setTimeout(() => navigate('/logbook'), 1500);
  };

  const handleAbandon = async () => {
    stop();
    await abandon();
    navigate('/');
  };

  if (!session || !departure || !arrival) {
    return (
      <div className="w-screen h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="text-white/20 text-xs tracking-[0.3em] animate-pulse">LOADING</div>
      </div>
    );
  }

  const mm = String(Math.floor(timer.remainingSeconds / 60)).padStart(2, '0');
  const ss = String(timer.remainingSeconds % 60).padStart(2, '0');
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - timer.progressPercent / 100);

  return (
    <div className="relative w-screen h-screen bg-[#060d1a] overflow-hidden">
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* 글로브 전체 배경 */}
      <div className="absolute inset-0 flex items-center justify-center scale-110">
        <FlightMap
          departureLat={departure.latitude}
          departureLng={departure.longitude}
          arrivalLat={arrival.latitude}
          arrivalLng={arrival.longitude}
          departureLabel={`${departure.city} (${departure.code})`}
          arrivalLabel={`${arrival.city} (${arrival.code})`}
          progress={timer.progressPercent}
        />
      </div>

      {/* 상단 */}
      <div className="absolute top-0 inset-x-0 pt-14 flex flex-col items-center
                      bg-gradient-to-b from-[#060d1a] via-[#060d1a]/60 to-transparent pb-16">
        <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-5">In Flight</p>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-extralight text-white tracking-widest">{departure.code}</div>
            <div className="text-white/40 text-xs mt-1 tracking-wider">{departure.city}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-white/20 text-xs tracking-widest">✈</div>
            <div className="relative w-20 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-blue-400 rounded-full transition-all duration-1000"
                style={{ width: `${timer.progressPercent}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extralight text-white tracking-widest">{arrival.code}</div>
            <div className="text-white/40 text-xs mt-1 tracking-wider">{arrival.city}</div>
          </div>
        </div>
        <div className="mt-3 text-white/20 text-[10px] tracking-[0.3em]">
          {SEAT_LABEL[session.seatClass]}
        </div>
      </div>

      {/* 하단 */}
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-14
                      bg-gradient-to-t from-[#060d1a] via-[#060d1a]/70 to-transparent pt-24">
        {/* 원형 타이머 */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-8">
          <svg className="absolute inset-0 -rotate-90" width="144" height="144">
            <circle cx="72" cy="72" r={radius} fill="none"
              stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            <circle cx="72" cy="72" r={radius} fill="none"
              stroke="rgba(96,165,250,0.8)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="text-center">
            <div className="text-3xl font-thin text-white tabular-nums tracking-widest">
              {mm}:{ss}
            </div>
            <div className="text-white/30 text-[10px] tracking-[0.3em] mt-0.5">REMAINING</div>
          </div>
        </div>

        <AmbientSoundPicker current={ambientType} onChange={setAmbientType} />

        <div className="flex gap-3 mt-4">
          <button onClick={handleAbandon}
            className="px-7 py-2.5 rounded-full border border-white/15 text-white/40
                       text-xs tracking-[0.15em] uppercase hover:border-white/30 hover:text-white/70
                       transition-all duration-300">
            Cancel
          </button>
          <button onClick={handleComplete}
            className="px-7 py-2.5 rounded-full bg-blue-500/90 text-white
                       text-xs tracking-[0.15em] uppercase hover:bg-blue-400
                       transition-all duration-300 shadow-lg shadow-blue-500/20">
            Land
          </button>
        </div>
      </div>
    </div>
  );
}
