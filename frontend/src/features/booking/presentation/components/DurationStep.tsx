import { BookingForm } from '../../domain/booking.types';

interface Props {
  form: BookingForm;
  onChange: (patch: Partial<BookingForm>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PRESETS = [15, 25, 45, 60, 90, 120];

export default function DurationStep({ form, onChange, onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Step 2 / 4</p>
        <h2 className="text-2xl font-light text-white">얼마나 집중할까요?</h2>
      </div>

      {/* 현재 선택값 */}
      <div className="text-center">
        <span className="text-7xl font-thin text-white tabular-nums">{form.plannedDuration}</span>
        <span className="text-white/40 ml-2 text-lg">분</span>
      </div>

      {/* 프리셋 */}
      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((min) => (
          <button
            key={min}
            onClick={() => onChange({ plannedDuration: min })}
            className={`py-3 rounded-xl text-sm font-light transition-all
              ${form.plannedDuration === min
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'
              }`}
          >
            {min}분
          </button>
        ))}
      </div>

      {/* 슬라이더 */}
      <input
        type="range"
        min={15}
        max={120}
        step={5}
        value={form.plannedDuration}
        onChange={(e) => onChange({ plannedDuration: Number(e.target.value) })}
        className="w-full accent-blue-500"
      />

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex-1 py-3 rounded-full border border-white/20 text-white/50
                     text-sm hover:border-white/40 hover:text-white/80 transition-all"
        >
          이전
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-full bg-blue-500 text-white text-sm
                     hover:bg-blue-400 transition-all"
        >
          다음
        </button>
      </div>
    </div>
  );
}
