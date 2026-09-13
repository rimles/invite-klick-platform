import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { GuestRow } from '../../components/ui/GuestCard';
import { Select } from '../../components/ui/FormField';
import { EmptyState } from '../../components/ui/EmptyState';
import { StatusBadge } from '../../components/ui/Badge';
import { useAppData } from '../../lib/store';
import { useToast } from '../../components/ui/Toast';
import { IconUsers } from '../../components/icons';
import type { RSVPStatus } from '../../types';

export function DashboardGuests() {
  const { events, guestsByEvent, deleteGuest } = useAppData();
  const [eventId, setEventId] = React.useState('all');
  const showToast = useToast();

  const rows = Object.entries(guestsByEvent).flatMap(([evId, guests]) =>
    guests.map((g) => ({ guest: g, eventTitle: events.find((e) => e.id === evId)?.title || evId })),
  );
  const filtered = eventId === 'all' ? rows : rows.filter((r) => r.guest.eventId === eventId);

  return (
    <CreatorShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">Guest Lists</h1>
          <p className="text-[#6F6467] mt-1 text-sm">All guests across every invitation.</p>
        </div>
        <Select value={eventId} onChange={(e) => setEventId(e.target.value)} className="sm:w-64">
          <option value="all">All events</option>
          {events.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
        </Select>
      </div>

      {filtered.length ? (
        <div className="bg-white rounded-2xl border border-[#E9E1D8] overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="text-left text-xs font-semibold text-[#9A8F91] uppercase tracking-wide border-b border-[#F0EAE3]">
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">RSVP</th>
                <th className="py-3 px-4">Seat</th>
                <th className="py-3 px-4">Access</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ guest, eventTitle }) => (
                <tr key={guest.id} className="border-b border-[#F0EAE3] last:border-0 hover:bg-[#FBF8F5] transition-colors">
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-[#241A1C]">{guest.name}</p>
                    <p className="text-xs text-[#9A8F91]">{guest.email || guest.phone || '—'}</p>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#6F6467]">{eventTitle}</td>
                  <td className="py-3 px-4"><StatusBadge status={guest.rsvp} /></td>
                  <td className="py-3 px-4 text-sm text-[#6F6467]">{guest.tableId ? `${guest.tableId.toUpperCase()} · ${guest.seat ?? '-'}` : '—'}</td>
                  <td className="py-3 px-4 text-sm text-[#6F6467]">{guest.accessType}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => { deleteGuest(guest.eventId, guest.id); showToast(`${guest.name} removed`); }}
                      className="text-xs text-[#9A4A4A] hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={<IconUsers size={20} />} title="No guests yet" description="Add guests from an invitation's Guests page." />
      )}
    </CreatorShell>
  );
}
