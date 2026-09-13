import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Button } from '../../components/ui/Button';
import { ComingSoon } from '../../components/ui/EmptyState';
import { useEvent, useGuests } from '../../lib/store';
import { Link } from '../../lib/router';
import { IconChevronLeft, IconPlus, IconSeat } from '../../components/icons';

export function InvitationSeating({ id }: { id: string }) {
  const event = useEvent(id);
  const guests = useGuests(id);

  if (!event) {
    return (
      <CreatorShell>
        <p className="text-[#6F6467]">Invitation not found.</p>
      </CreatorShell>
    );
  }

  return (
    <CreatorShell>
      <div className="flex items-center gap-3 mb-2">
        <Link to={`/dashboard/invitations/${event.id}`} className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E9E1D8] text-[#241A1C] hover:bg-[#F4EFE9]">
          <IconChevronLeft size={16} />
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl text-[#241A1C]">{event.title} — Seating</h1>
        </div>
        <ComingSoon label="Visual drag & drop — Coming Soon" />
        <Button icon={<IconPlus size={15} />} variant="outline">Add Table</Button>
      </div>
      <p className="text-sm text-[#6F6467] mb-6">Organize guests into tables. Visual floor-plan seating is coming in a future update.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {event.tables.map((table) => {
          const assigned = guests.filter((g) => g.tableId === table.id);
          return (
            <div key={table.id} className="bg-white rounded-2xl border border-[#E9E1D8] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center"><IconSeat size={16} /></span>
                  <div>
                    <p className="font-medium text-sm text-[#241A1C]">{table.name}</p>
                    <p className="text-xs text-[#9A8F91]">{assigned.length}/{table.capacity} seats</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {assigned.length ? assigned.map((g) => (
                  <div key={g.id} className="flex items-center justify-between text-sm bg-[#FBF8F5] rounded-lg px-3 py-2">
                    <span className="text-[#241A1C]">{g.name}</span>
                    <span className="text-xs text-[#9A8F91]">Seat {g.seat ?? '—'}</span>
                  </div>
                )) : (
                  <p className="text-xs text-[#9A8F91] py-3 text-center">No guests assigned yet</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CreatorShell>
  );
}
