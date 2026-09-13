import React from 'react';
import type { Guest, InvitationEvent } from '../../types';

function QRPattern({ seed = 1 }: { seed?: number }) {
  // Deterministic pseudo-QR pattern for visual purposes (not a scannable code).
  const size = 9;
  const cells: boolean[] = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < size * size; i++) {
    s = (s * 9301 + 49297) % 233280;
    cells.push(s / 233280 > 0.52);
  }
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${size}, minmax(0,1fr))` }}>
      {cells.map((on, i) => (
        <span key={i} className={`aspect-square rounded-[2px] ${on ? 'bg-[#241A1C]' : 'bg-transparent'}`} />
      ))}
    </div>
  );
}

export function QRPassCard({ guest, event }: { guest: Guest; event: InvitationEvent }) {
  const theme = event.theme;
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl border max-w-sm mx-auto"
      style={{ borderColor: `${theme.primary}25`, background: theme.surface }}
    >
      <div className="p-6 text-center" style={{ background: `linear-gradient(160deg, ${theme.primary}, ${theme.primary}CC)` }}>
        <p className="text-white/70 text-xs tracking-[0.2em] uppercase">Your Pass</p>
        <p className="font-serif text-2xl text-white mt-1">{event.title}</p>
        <p className="text-white/80 text-sm mt-1">Welcome, {guest.name.split(' ')[0]}</p>
      </div>
      <div className="p-6 flex flex-col items-center">
        <div className="p-3 bg-white rounded-2xl border" style={{ borderColor: `${theme.primary}20`, width: 168 }}>
          <QRPattern seed={guest.id.length + guest.name.length} />
        </div>
        <div className="grid grid-cols-3 gap-3 w-full mt-6 text-center">
          <div>
            <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.muted }}>Table</p>
            <p className="font-serif text-lg mt-0.5" style={{ color: theme.text }}>{guest.tableId ? guest.tableId.replace('t', '') : '—'}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.muted }}>Seat</p>
            <p className="font-serif text-lg mt-0.5" style={{ color: theme.text }}>{guest.seat ?? '—'}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide" style={{ color: theme.muted }}>Access</p>
            <p className="font-serif text-lg mt-0.5" style={{ color: theme.text }}>{guest.accessType}</p>
          </div>
        </div>
        <p className="text-xs mt-6 text-center opacity-60" style={{ color: theme.muted }}>
          Scan this code at the venue entrance for fast check-in.
        </p>
      </div>
    </div>
  );
}
