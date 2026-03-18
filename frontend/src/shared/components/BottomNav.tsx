import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/',             icon: '✈',  label: 'Fly' },
  { path: '/logbook',      icon: '📋', label: 'Log' },
  { path: '/achievements', icon: '🏅', label: 'Awards' },
  { path: '/profile',      icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // FlightPage에서는 숨김
  if (location.pathname.startsWith('/flight')) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 flex justify-around items-center
                    bg-[#060d1a]/90 border-t border-white/[0.06] backdrop-blur-md
                    pb-6 pt-3 z-50">
      {NAV_ITEMS.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <span className={`text-lg transition-all ${active ? 'scale-110' : 'opacity-30'}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase transition-all
              ${active ? 'text-white' : 'text-white/25'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
