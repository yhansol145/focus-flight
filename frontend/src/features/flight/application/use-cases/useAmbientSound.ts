import { useEffect, useRef, useState } from 'react';

export type AmbientType = 'cabin' | 'rain' | 'ocean' | 'forest' | 'off';

const SOUND_URLS: Record<Exclude<AmbientType, 'off'>, string> = {
  cabin:  'https://www.soundjay.com/transportation/airplane-cabin-1.mp3',
  rain:   'https://www.soundjay.com/nature/rain-01.mp3',
  ocean:  'https://www.soundjay.com/nature/waves-1.mp3',
  forest: 'https://www.soundjay.com/nature/forest-birds-1.mp3',
};

export const AMBIENT_LABELS: Record<AmbientType, string> = {
  off:    '🔇 Off',
  cabin:  '✈ Cabin',
  rain:   '🌧 Rain',
  ocean:  '🌊 Ocean',
  forest: '🌲 Forest',
};

export function useAmbientSound() {
  const [current, setCurrent] = useState<AmbientType>('off');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (current === 'off') return;

    const audio = new Audio(SOUND_URLS[current]);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {}); // 자동재생 정책 무시
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [current]);

  // 페이지 이탈 시 정지
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return { current, setCurrent };
}
