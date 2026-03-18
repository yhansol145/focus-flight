import { useEffect, useState } from 'react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'achievement' | 'error';
}

interface Props {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: Props) {
  return (
    <div className="fixed top-6 inset-x-0 flex flex-col items-center gap-2 z-[100] pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const styles = {
    success:     'bg-blue-500/90 border-blue-400/50',
    achievement: 'bg-yellow-500/90 border-yellow-400/50',
    error:       'bg-red-500/90 border-red-400/50',
  };

  return (
    <div className={`px-5 py-3 rounded-full border text-white text-xs tracking-wide
                     shadow-lg backdrop-blur-md transition-all duration-300
                     ${styles[toast.type]}
                     ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      {toast.message}
    </div>
  );
}
