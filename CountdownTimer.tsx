import React from 'react';

function useCountdown(target: string) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function CountdownTimer({ date, textColor = '#FFFFFF' }: { date: string; textColor?: string }) {
  const { days, hours, minutes, seconds } = useCountdown(date);
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <p className="font-serif text-2xl sm:text-3xl tabular-nums" style={{ color: textColor }}>
            {String(u.value).padStart(2, '0')}
          </p>
          <p className="text-[10px] uppercase tracking-widest mt-1 opacity-70" style={{ color: textColor }}>{u.label}</p>
        </div>
      ))}
    </div>
  );
}
