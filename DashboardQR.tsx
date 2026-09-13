import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Link } from '../../lib/router';
import { useAppData } from '../../lib/store';
import { IconQR, IconChevronRight } from '../../components/icons';

export function DashboardQR() {
  const { events, guestsByEvent } = useAppData();
  return (
    <CreatorShell>
      <div className="mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">QR &amp; Check-in</h1>
        <p className="text-[#6F6467] mt-1 text-sm">Choose an event to open its check-in scanner.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {events.map((e) => {
          const guests = guestsByEvent[e.id] || [];
          const checkedIn = guests.filter((g) => g.rsvp === 'checked-in').length;
          return (
            <Link key={e.id} to={`/dashboard/invitations/${e.id}/qr`} className="bg-white rounded-2xl border border-[#E9E1D8] p-5 flex items-center gap-4 hover:border-[#482337]/30 hover:-translate-y-0.5 transition-all duration-200">
              <span className="w-12 h-12 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center shrink-0"><IconQR size={20} /></span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#241A1C]">{e.title}</p>
                <p className="text-xs text-[#9A8F91] mt-0.5">{checkedIn} of {guests.length} checked in</p>
              </div>
              <IconChevronRight size={16} className="text-[#9A8F91]" />
            </Link>
          );
        })}
      </div>
    </CreatorShell>
  );
}
