import { useNavigate } from 'react-router-dom';
import { useBookingForm } from '@/features/booking/application/use-cases/useBookingForm';
import { useAirports } from '@/features/booking/application/use-cases/useAirports';
import RouteStep from '@/features/booking/presentation/components/RouteStep';
import DurationStep from '@/features/booking/presentation/components/DurationStep';
import SeatStep from '@/features/booking/presentation/components/SeatStep';
import ConfirmStep from '@/features/booking/presentation/components/ConfirmStep';
import Toast from '@/shared/components/Toast';
import { useToast } from '@/shared/hooks/useToast';

const STEPS = ['route', 'duration', 'seat', 'confirm'] as const;

export default function BookingPage() {
  const navigate = useNavigate();
  const { airports, isLoading: airportsLoading } = useAirports();
  const { step, form, isLoading, error, updateForm, nextStep, prevStep, submit } = useBookingForm();
  const { toasts, addToast, removeToast } = useToast();

  const handleConfirm = async () => {
    try {
      const session = await submit();
      navigate(`/flight/${session.id}`);
    } catch {
      addToast(error ?? '세션 생성에 실패했습니다', 'error');
    }
  };

  const stepIndex = STEPS.indexOf(step);

  if (airportsLoading) {
    return (
      <div className="w-screen h-screen bg-[#060d1a] flex items-center justify-center">
        <div className="text-white/20 text-xs tracking-[0.3em] animate-pulse">LOADING</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060d1a] flex flex-col items-center justify-center px-6 py-12">
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* 로고 */}
      <div className="mb-12 text-center">
        <h1 className="text-white text-base tracking-[0.5em] font-light uppercase">
          Focus Flight
        </h1>
        <p className="text-white/20 text-[10px] tracking-[0.35em] mt-1.5 uppercase">
          Deep Focus Timer
        </p>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i < stepIndex
                ? 'bg-blue-400'
                : i === stepIndex
                ? 'bg-white scale-125'
                : 'bg-white/20'
            }`} />
            {i < STEPS.length - 1 && (
              <div className={`w-6 h-px transition-all duration-500 ${
                i < stepIndex ? 'bg-blue-400/60' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* 카드 */}
      <div className="w-full max-w-sm bg-white/[0.03] border border-white/[0.08] rounded-3xl
                      p-7 backdrop-blur-sm shadow-2xl shadow-black/50">
        {step === 'route' && (
          <RouteStep airports={airports} form={form} onChange={updateForm} onNext={nextStep} />
        )}
        {step === 'duration' && (
          <DurationStep form={form} onChange={updateForm} onNext={nextStep} onPrev={prevStep} />
        )}
        {step === 'seat' && (
          <SeatStep form={form} onChange={updateForm} onNext={nextStep} onPrev={prevStep} />
        )}
        {step === 'confirm' && (
          <ConfirmStep
            airports={airports}
            form={form}
            isLoading={isLoading}
            onConfirm={handleConfirm}
            onPrev={prevStep}
          />
        )}
      </div>
    </div>
  );
}
