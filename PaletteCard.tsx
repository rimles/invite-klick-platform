import React from 'react';
import type { EventTheme } from '../../types';
import { IconCheck } from '../icons';

export function PaletteCard({
  theme,
  selected,
  onSelect,
}: {
  theme: EventTheme;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={[
        'text-left rounded-2xl border p-4 transition-all duration-200 w-full',
        selected ? 'border-[#482337] ring-2 ring-[#482337]/15 bg-white' : 'border-[#E9E1D8] bg-white hover:border-[#482337]/30',
      ].join(' ')}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex -space-x-2">
          {[theme.primary, theme.secondary, theme.accent].map((c, i) => (
            <span key={i} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
          ))}
        </div>
        {selected && (
          <span className="w-5 h-5 rounded-full bg-[#482337] text-white flex items-center justify-center">
            <IconCheck size={12} />
          </span>
        )}
      </div>
      <p className="font-medium text-sm text-[#241A1C]">{theme.name}</p>
      <p className="text-xs text-[#9A8F91] mt-0.5">{theme.swatchLabel}</p>
    </button>
  );
}
