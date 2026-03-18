import { BookingForm } from '../../domain/booking.types';
import { SeatClass } from '@/shared/api/sessions.api';

interface Props {
  form: BookingForm;
  onChange: (patch: Partial<BookingForm>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SEATS: { value: SeatClass; label: string; multiplier: string; desc: string }[] = [
  { value: 'economy',  label: 'Economy',     multiplier: '×1.0',  desc: '기본 집중 모드' },
  { value: 'business', label: 'Business',    multiplier: '×1.5',  desc: '마일 1.5배 적립' },
  { value: 'first',    label: 'First Class', multiplier: '×2.0',  desc: '마일 2배 적립' },
];

export default function SeatStep({ form, onChange, onNext, onPrev }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Step 3 / 4</p>
        <h2 className="text-2xl font-light text-white">좌석 등급을 선택하세요</h2>
      </div>

      <div className="flex flex-col gap-3">
        {SEATS.map((seat) => (
          <button
            key={seat.value}
            onClick={() => onChange({ seatClass: seat.value })}
            className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all
              ${form.seatClass === seat.value
                ? 'border-blue-500 bg-blue-500/10 text-white'
                : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
              }`}
          >
            <div className="text-left">
              <div className="text-sm font-medium">{seat.label}</div>
              <div className="text-xs text-white/40 mt-0.5">{seat.desc}</div>
            </div>
            <span className={`text-sm font-mono ${form.seatClass === seat.value ? 'text-blue-400' : 'text-white/30'}`}>
              {seat.multiplier}
            </span>
          </button>
        ))}
      </div>

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
