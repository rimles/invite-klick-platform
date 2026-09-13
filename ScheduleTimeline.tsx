import React from 'react';
import type { ScheduleItem } from '../../types';

export function ScheduleTimeline({ items, accent = '#482337' }: { items: ScheduleItem[]; accent?: string }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: `${accent}30` }} />
      <div className="space-y-7">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <span
              className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-[var(--event-surface,white)]"
              style={{ borderColor: accent }}
            />
            <p className="text-xs font-semibold tracking-wide" style={{ color: accent }}>{item.time}</p>
            <p className="font-serif text-lg mt-0.5" style={{ color: 'var(--event-text, #241A1C)' }}>{item.title}</p>
            {item.description && <p className="text-sm mt-1 opacity-70" style={{ color: 'var(--event-text, #6F6467)' }}>{item.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
