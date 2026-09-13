import React from 'react';
import type { InvitationEvent } from '../../types';
import { InvitationStatusBadge } from './Badge';
import { IconUsers, IconMore } from '../icons';
import { Link } from '../../lib/router';

function formatCardDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function InvitationCard({ event }: { event: InvitationEvent }) {
  const rsvpPct = Math.round((event.stats.rsvpCount / event.stats.totalGuests) * 100);
  return (
    <div className="bg-white rounded-2xl border border-[#E9E1D8] overflow-hidden group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_rgba(72,35,55,0.18)]">
      <Link to={`/dashboard/invitations/${event.id}`}>
        <div
          className="h-32 relative"
          style={{ background: `linear-gradient(155deg, ${event.coverGradient[0]}, ${event.coverGradient[1]})` }}
        >
          <div className="absolute top-3 right-3">
            <InvitationStatusBadge status={event.status} />
          </div>
          <div className="absolute bottom-3 left-4">
            <p className="font-serif text-white text-lg leading-tight drop-shadow">{event.title}</p>
            <p className="text-white/80 text-xs mt-0.5">{event.subtitle}</p>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-[#9A8F91] mb-3">
          <span>{formatCardDate(event.date)}</span>
          <span>{event.city}, {event.country}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#6F6467]">
            <IconUsers size={14} />
            {event.stats.totalGuests} guests
            <span className="mx-1">·</span>
            <span className="text-[#2F6B3F] font-medium">{rsvpPct || 0}% RSVP</span>
          </div>
          <button className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A8F91] hover:bg-[#F4EFE9]">
            <IconMore size={16} />
          </button>
        </div>
        <Link
          to={`/dashboard/invitations/${event.id}`}
          className="mt-3 block text-center text-sm font-medium py-2 rounded-xl bg-[#F4EFE9] text-[#241A1C] hover:bg-[#EADFCF] transition-colors"
        >
          View
        </Link>
      </div>
    </div>
  );
}
