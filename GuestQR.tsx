import React from 'react';
import { useEvent, useGuests } from '../../lib/store';
import { Link } from '../../lib/router';
import { QRPassCard } from '../../components/ui/QRPassCard';
import { IconChevronLeft } from '../../components/icons';
import type { Guest } from '../../types';

export function GuestQR({ slug }: { slug: string }) {
  const event = useEvent(slug);
  const guests = useGuests(event?.id || '');
  if (!event) return null;
  const theme = event.theme;

  const guest: Guest =
    guests.find((g) => g.rsvp === 'attending' || g.rsvp === 'checked-in') ||
    guests[0] || {
      id: 'guest-preview',
      eventId: event.id,
      name: 'John Mensah',
      group: 'Guest',
      partyAllowance: 2,
      rsvp: 'invited',
      accessType: 'Standard',
      invitationToken: 'preview',
    };

  return (
    <div style={{ background: theme.background }} className="min-h-screen">
      <div className="max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 flex items-center h-14 px-4 backdrop-blur-md" style={{ background: `${theme.surface}CC`, color: theme.text }}>
          <Link to={`/invite/${event.slug}`} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: theme.text }}>
            <IconChevronLeft size={18} />
          </Link>
          <p className="font-serif text-base ml-1">My QR Pass</p>
        </div>
        <div className="px-5 pt-8">
          <QRPassCard guest={guest} event={event} />
        </div>
      </div>
    </div>
  );
}
