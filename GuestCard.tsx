import React from 'react';
import type { Guest } from '../../types';
import { StatusBadge, Pill } from './Badge';
import { IconEdit, IconTrash, IconQR } from '../icons';

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export function GuestRow({
  guest,
  onEdit,
  onDelete,
  onQR,
}: {
  guest: Guest;
  onEdit?: () => void;
  onDelete?: () => void;
  onQR?: () => void;
}) {
  return (
    <tr className="border-b border-[#F0EAE3] last:border-0 hover:bg-[#FBF8F5] transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#F1D9DD] text-[#7A2E42] text-xs font-semibold flex items-center justify-center shrink-0">
            {initials(guest.name)}
          </span>
          <div>
            <p className="text-sm font-medium text-[#241A1C]">{guest.name}</p>
            <p className="text-xs text-[#9A8F91]">{guest.email || guest.phone || '—'}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-[#6F6467]">{guest.group}</td>
      <td className="py-3 px-4">
        <StatusBadge status={guest.rsvp} />
      </td>
      <td className="py-3 px-4 text-sm text-[#6F6467]">
        {guest.tableId ? `${guest.tableId.toUpperCase()} · Seat ${guest.seat ?? '-'}` : '—'}
      </td>
      <td className="py-3 px-4">
        {guest.accessType === 'VIP' && <Pill tone="gold">VIP</Pill>}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-end gap-1">
          <button onClick={onQR} className="w-7 h-7 rounded-full flex items-center justify-center text-[#6F6467] hover:bg-[#F4EFE9]"><IconQR size={14} /></button>
          <button onClick={onEdit} className="w-7 h-7 rounded-full flex items-center justify-center text-[#6F6467] hover:bg-[#F4EFE9]"><IconEdit size={14} /></button>
          <button onClick={onDelete} className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A4A4A] hover:bg-[#FBF3F3]"><IconTrash size={14} /></button>
        </div>
      </td>
    </tr>
  );
}
