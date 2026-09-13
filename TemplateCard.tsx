import React from 'react';
import type { Template } from '../../types';
import { Pill } from './Badge';
import { Button } from './Button';

export function TemplateCard({
  template,
  eventTitle,
  onUse,
  selected,
}: {
  template: Template;
  eventTitle?: string;
  onUse: () => void;
  selected?: boolean;
}) {
  return (
    <div
      className={[
        'rounded-2xl border overflow-hidden bg-white transition-all duration-200 group',
        selected ? 'border-[#482337] ring-2 ring-[#482337]/15' : 'border-[#E9E1D8] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_rgba(72,35,55,0.2)]',
      ].join(' ')}
    >
      <div
        className="h-40 flex items-end p-4 relative"
        style={{ background: `linear-gradient(160deg, ${template.gradient[0]}, ${template.gradient[1]})` }}
      >
        <div className="absolute top-3 right-3">
          <Pill tone={template.tier === 'Premium' ? 'gold' : 'neutral'} className={template.tier === 'Premium' ? '' : 'bg-white/85 text-[#6F6467]'}>
            {template.tier}
          </Pill>
        </div>
        <p className="font-serif text-white text-lg leading-tight drop-shadow-sm">{eventTitle || 'Your Names'}</p>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="font-medium text-sm text-[#241A1C]">{template.name}</p>
          <p className="text-xs text-[#9A8F91] mt-0.5">{template.category}</p>
        </div>
        <Button size="sm" variant={selected ? 'primary' : 'outline'} onClick={onUse}>
          {selected ? 'Selected' : 'Use Template'}
        </Button>
      </div>
    </div>
  );
}
