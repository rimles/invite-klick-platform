import React from 'react';
import type { MusicTrack } from '../../types';
import { IconPlay, IconPause, IconMusic } from '../icons';

export function MusicPlayer({ track, accent = '#482337' }: { track?: MusicTrack; accent?: string }) {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(28);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 1)), 300);
    return () => clearInterval(id);
  }, [playing]);

  if (!track) return null;

  return (
    <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: `${accent}25`, background: `${accent}08` }}>
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
        style={{ background: accent }}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <IconPause size={16} /> : <IconPlay size={16} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--event-text, #241A1C)' }}>{track.title}</p>
        <p className="text-xs opacity-60 truncate" style={{ color: 'var(--event-text, #6F6467)' }}>{track.artist}</p>
        <div className="h-1 rounded-full bg-black/10 mt-1.5 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: accent }} />
        </div>
      </div>
      <IconMusic size={16} className="opacity-40 shrink-0" />
    </div>
  );
}

export function MusicLibraryRow({
  track,
  selected,
  onSelect,
}: {
  track: MusicTrack;
  selected: boolean;
  onSelect: () => void;
}) {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div
      className={[
        'flex items-center gap-3 rounded-xl border p-3 transition-colors duration-150',
        selected ? 'border-[#482337] bg-[#FBF6F3]' : 'border-[#E9E1D8] hover:border-[#482337]/30',
      ].join(' ')}
    >
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F4EFE9] text-[#482337] shrink-0"
      >
        {playing ? <IconPause size={14} /> : <IconPlay size={14} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#241A1C] truncate">{track.title}</p>
        <p className="text-xs text-[#9A8F91] truncate">{track.artist} · {track.category}</p>
      </div>
      <span className="text-xs text-[#9A8F91] mr-2">{track.duration}</span>
      <button
        onClick={onSelect}
        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${selected ? 'bg-[#482337] text-white' : 'bg-[#F4EFE9] text-[#241A1C] hover:bg-[#EADFCF]'}`}
      >
        {selected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}
