import { useState } from 'react';
import { BookingForm, BookingStep } from '../../domain/booking.types';
import { sessionsApi } from '@/shared/api/sessions.api';

const INITIAL_FORM: BookingForm = {
  departureAirportId: '',
  arrivalAirportId: '',
  seatClass: 'economy',
  plannedDuration: 25,
};

export function useBookingForm() {
  const [step, setStep] = useState<BookingStep>('route');
  const [form, setForm] = useState<BookingForm>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const updateForm = (patch: Partial<BookingForm>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const nextStep = () => {
    const steps: BookingStep[] = ['route', 'duration', 'seat', 'confirm'];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const prevStep = () => {
    const steps: BookingStep[] = ['route', 'duration', 'seat', 'confirm'];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await sessionsApi.create(form);
      return session;
    } catch (e) {
      const message = e instanceof Error ? e.message : '세션 생성에 실패했습니다';
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { step, form, isLoading, error, updateForm, nextStep, prevStep, submit };
}
