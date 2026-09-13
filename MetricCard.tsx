import React from 'react';

export function MetricCard({
  icon,
  value,
  label,
  tone = 'blush',
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  tone?: 'blush' | 'sage' | 'gold' | 'lilac';
}) {
  const tones: Record<string, string> = {
    blush: 'bg-[#F1D9DD] text-[#7A2E42]',
    sage: 'bg-[#E4EAE2] text-[#4B5D45]',
    gold: 'bg-[#EADFCF] text-[#8A6A2A]',
    lilac: 'bg-[#E7E3F2] text-[#5B4E8A]',
  };
  return (
    <div className="bg-white rounded-2xl border border-[#E9E1D8] p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tones[tone]}`}>{icon}</div>
      <div>
        <p className="font-serif text-2xl leading-none text-[#241A1C]">{value}</p>
        <p className="text-sm text-[#6F6467] mt-1.5">{label}</p>
      </div>
    </div>
  );
}
