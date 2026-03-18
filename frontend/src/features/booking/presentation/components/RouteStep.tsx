import { AirportDto } from '@/shared/api/airports.api';
import { BookingForm } from '../../domain/booking.types';

interface Props {
  airports: AirportDto[];
  form: BookingForm;
  onChange: (patch: Partial<BookingForm>) => void;
  onNext: () => void;
}

export default function RouteStep({ airports, form, onChange, onNext }: Props) {
  const isValid =
    form.departureAirportId &&
    form.arrivalAirportId &&
    form.departureAirportId !== form.arrivalAirportId;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Step 1 / 4</p>
        <h2 className="text-2xl font-light text-white">어디서 어디로 가시나요?</h2>
      </div>

      <div className="flex flex-col gap-4">
        <AirportSelect
          label="출발"
          airports={airports}
          value={form.departureAirportId}
          exclude={form.arrivalAirportId}
          onChange={(id) => onChange({ departureAirportId: id })}
        />
        <div className="flex items-center justify-center text-white/20 text-xl">↓</div>
        <AirportSelect
          label="도착"
          airports={airports}
          value={form.arrivalAirportId}
          exclude={form.departureAirportId}
          onChange={(id) => onChange({ arrivalAirportId: id })}
        />
      </div>

      <button
        disabled={!isValid}
        onClick={onNext}
        className="w-full py-3 rounded-full bg-blue-500 text-white text-sm tracking-wide
                   hover:bg-blue-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        다음
      </button>
    </div>
  );
}

function AirportSelect({
  label, airports, value, exclude, onChange,
}: {
  label: string;
  airports: AirportDto[];
  value: string;
  exclude: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-white/40 tracking-widest uppercase">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
                   text-sm appearance-none cursor-pointer hover:border-white/30 transition-all
                   focus:outline-none focus:border-blue-500"
      >
        <option value="" className="bg-[#0c1a2e]">공항 선택</option>
        {airports
          .filter((a) => a.id !== exclude)
          .map((a) => (
            <option key={a.id} value={a.id} className="bg-[#0c1a2e]">
              {a.city} ({a.code}) — {a.name}
            </option>
          ))}
      </select>
    </div>
  );
}
