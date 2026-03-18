import { AmbientType, AMBIENT_LABELS } from '../../application/use-cases/useAmbientSound';

interface Props {
  current: AmbientType;
  onChange: (type: AmbientType) => void;
}

const TYPES: AmbientType[] = ['off', 'cabin', 'rain', 'ocean', 'forest'];

export default function AmbientSoundPicker({ current, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-3 py-1.5 rounded-full text-[10px] tracking-wider transition-all border
            ${current === type
              ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
              : 'bg-white/[0.03] border-white/10 text-white/30 hover:text-white/50'
            }`}
        >
          {AMBIENT_LABELS[type]}
        </button>
      ))}
    </div>
  );
}
