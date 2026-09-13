import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Button } from '../../components/ui/Button';
import { StatusBadge, Pill } from '../../components/ui/Badge';
import { useEvent, useGuests, useAppData } from '../../lib/store';
import { useToast } from '../../components/ui/Toast';
import { Link } from '../../lib/router';
import { IconChevronLeft, IconQR, IconCheck, IconSearch } from '../../components/icons';

export function InvitationQR({ id }: { id: string }) {
  const event = useEvent(id);
  const guests = useGuests(id);
  const { checkInGuest } = useAppData();
  const showToast = useToast();
  const [query, setQuery] = React.useState('');

  if (!event) {
    return (
      <CreatorShell>
        <p className="text-[#6F6467]">Invitation not found.</p>
      </CreatorShell>
    );
  }

  const filtered = guests.filter((g) => g.name.toLowerCase().includes(query.toLowerCase()));
  const checkedInCount = guests.filter((g) => g.rsvp === 'checked-in').length;

  return (
    <CreatorShell>
      <div className="flex items-center gap-3 mb-2">
        <Link to={`/dashboard/invitations/${event.id}`} className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E9E1D8] text-[#241A1C] hover:bg-[#F4EFE9]">
          <IconChevronLeft size={16} />
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl text-[#241A1C]">{event.title} — QR &amp; Check-in</h1>
          <p className="text-sm text-[#6F6467] mt-0.5">{checkedInCount} of {guests.length} guests checked in</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E9E1D8] p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-28 h-28 rounded-2xl bg-[#F4EFE9] flex items-center justify-center shrink-0">
          <IconQR size={40} className="text-[#482337]" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-serif text-lg text-[#241A1C]">Scanner Simulation</p>
          <p className="text-sm text-[#6F6467] mt-1 max-w-md">
            In production this opens your device camera to scan a guest's QR pass. For this preview, click "Simulate Scan" next to a guest below to validate and check them in.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E9E1D8] px-3.5 py-2.5 mb-4 max-w-sm">
        <IconSearch size={15} className="text-[#9A8F91]" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guest name…" className="bg-transparent outline-none text-sm w-full" />
      </div>

      <div className="bg-white rounded-2xl border border-[#E9E1D8] divide-y divide-[#F0EAE3]">
        {filtered.map((g) => {
          const checkedIn = g.rsvp === 'checked-in';
          return (
            <div key={g.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-[#241A1C]">{g.name}</p>
                <p className="text-xs text-[#9A8F91] mt-0.5">
                  {g.tableId ? `${g.tableId.toUpperCase()} · Seat ${g.seat ?? '-'}` : 'No table assigned'}
                  {g.accessType === 'VIP' && <span className="ml-2"><Pill tone="gold">VIP</Pill></span>}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {checkedIn ? (
                  <div className="text-right">
                    <StatusBadge status="checked-in" />
                    <p className="text-[10px] text-[#9A8F91] mt-1">
                      {g.checkedInAt ? new Date(g.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    icon={<IconCheck size={14} />}
                    onClick={() => { checkInGuest(event.id, g.id); showToast(`${g.name} checked in`); }}
                  >
                    Simulate Scan
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CreatorShell>
  );
}
