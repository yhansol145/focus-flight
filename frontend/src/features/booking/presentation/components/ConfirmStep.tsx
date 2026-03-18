import { AirportDto } from '@/shared/api/airports.api';
import { BookingForm } from '../../domain/booking.types';

interface Props {
  airports: AirportDto[];
  form: BookingForm;
  isLoading: boolean;
  onConfirm: () => void;
  onPrev: () => void;
}

const SEAT_LABEL: Record<string, string> = {
  economy: 'Economy',
  business: 'Business',
  first: 'First Class',
};

const MILES_MULTIPLIER: Record<string, number> = {
  economy: 1.0,
  business: 1.5,
  first: 2.0,
};

export default function ConfirmStep({ airports, form, isLoading, onConfirm, onPrev }: Props) {
  const departure = airports.find((a) => a.id === form.departureAirportId);
  const arrival = airports.find((a) => a.id === form.arrivalAirportId);
  const estimatedMiles = Math.round(form.plannedDuration * MILES_MULTIPLIER[form.seatClass]);

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Step 4 / 4</p>
        <h2 className="text-2xl font-light text-white">탑승권 확인</h2>
      </div>

      {/* 보딩패스 */}
      <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* 상단 */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-3xl font-light text-white">{departure?.code}</div>
              <div className="text-xs text-white/40 mt-1">{departure?.city}</div>
            </div>
            <div className="flex flex-col items-center gap-1 text-white/20">
              <div className="text-xs tracking-widest">✈</div>
              <div className="w-16 h-px bg-white/20" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-white">{arrival?.code}</div>
              <div className="text-xs text-white/40 mt-1">{arrival?.city}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-white/30 uppercase tracking-wider mb-1">좌석</div>
              <div className="text-sm text-white">{SEAT_LABEL[form.seatClass]}</div>
            </div>
            <div>
              <div className="text-xs text-white/30 uppercase tracking-wider mb-1">집중 시간</div>
              <div className="text-sm text-white">{form.plannedDuration}분</div>
            </div>
            <div>
              <div className="text-xs text-white/30 uppercase tracking-wider mb-1">예상 마일</div>
              <div className="text-sm text-blue-400">+{estimatedMiles}</div>
            </div>
          </div>
        </div>

        {/* 점선 구분선 */}
        <div className="flex items-center px-2 my-1">
          <div className="w-4 h-4 rounded-full bg-[#060d1a] -ml-2" />
          <div className="flex-1 border-t border-dashed border-white/10 mx-1" />
          <div className="w-4 h-4 rounded-full bg-[#060d1a] -mr-2" />
        </div>

        {/* 하단 */}
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <div className="text-xs text-white/30 uppercase tracking-wider mb-1">출발</div>
            <div className="text-sm text-white">{departure?.name}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/30 uppercase tracking-wider mb-1">도착</div>
            <div className="text-sm text-white">{arrival?.name}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          disabled={isLoading}
          className="flex-1 py-3 rounded-full border border-white/20 text-white/50
                     text-sm hover:border-white/40 hover:text-white/80 transition-all
                     disabled:opacity-30"
        >
          이전
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-3 rounded-full bg-blue-500 text-white text-sm
                     hover:bg-blue-400 transition-all disabled:opacity-50"
        >
          {isLoading ? '탑승 중...' : '✈ 탑승'}
        </button>
      </div>
    </div>
  );
}
