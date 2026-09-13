import React from 'react';
import type { MediaItem } from '../../types';
import { IconImage } from '../icons';

export function GalleryGrid({ items }: { items: MediaItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E9E1D8] py-12 flex flex-col items-center text-center">
        <IconImage size={28} className="text-[#9A8F91] mb-2" />
        <p className="text-sm text-[#9A8F91]">No photos yet — be the first to share a memory.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((m) => (
        <div
          key={m.id}
          className="aspect-square rounded-xl relative overflow-hidden group cursor-pointer"
          style={{ background: `linear-gradient(155deg, ${m.gradient[0]}, ${m.gradient[1]})` }}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
          <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="text-white text-xs font-medium drop-shadow">{m.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
