import React from 'react';

export function Tabs({
  tabs,
  active,
  onChange,
  className = '',
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-1 bg-[#F4EFE9] rounded-xl p-1 ${className}`}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            active === t.id ? 'bg-white text-[#241A1C] shadow-sm' : 'text-[#6F6467] hover:text-[#241A1C]',
          ].join(' ')}
        >
          {t.label}
          {typeof t.count === 'number' && <span className="ml-1.5 opacity-60">({t.count})</span>}
        </button>
      ))}
    </div>
  );
}

export function Stepper({
  steps,
  activeIndex,
  onStepClick,
}: {
  steps: string[];
  activeIndex: number;
  onStepClick?: (i: number) => void;
}) {
  return (
    <div className="flex items-center w-full">
      {steps.map((label, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <React.Fragment key={label}>
            <button
              onClick={() => onStepClick?.(i)}
              disabled={!onStepClick || i > activeIndex}
              className="flex flex-col items-center gap-2 group disabled:cursor-default"
            >
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 border',
                  done ? 'bg-[#482337] border-[#482337] text-white' : active ? 'bg-white border-[#482337] text-[#482337]' : 'bg-white border-[#E9E1D8] text-[#9A8F91]',
                ].join(' ')}
              >
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${active ? 'text-[#241A1C]' : 'text-[#9A8F91]'}`}>{label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-[1.5px] mx-2 mb-5 transition-colors duration-300 ${i < activeIndex ? 'bg-[#482337]' : 'bg-[#E9E1D8]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
