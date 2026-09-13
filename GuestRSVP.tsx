import React from 'react';
import { useEvent, useAppData } from '../../lib/store';
import { Link } from '../../lib/router';
import { RSVPForm } from '../../components/ui/RSVPForm';
import { IconChevronLeft } from '../../components/icons';

export function GuestRSVP({ slug }: { slug: string }) {
  const event = useEvent(slug);
  if (!event) return null;
  const theme = event.theme;

  return (
    <div style={{ background: theme.background, color: theme.text }} className="min-h-screen">
      <div className="max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 flex items-center h-14 px-4 backdrop-blur-md" style={{ background: `${theme.surface}CC` }}>
          <Link to={`/invite/${event.slug}`} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: theme.text }}>
            <IconChevronLeft size={18} />
          </Link>
          <p className="font-serif text-base ml-1">{event.title}</p>
        </div>
        <div className="px-5 pt-6 pb-2 text-center">
          <p className="text-xs uppercase tracking-widest opacity-50">RSVP</p>
          <p className="font-serif text-2xl mt-1">{event.title}</p>
          <p className="text-xs opacity-60 mt-1">{new Date(event.date).toDateString()} · {event.venue}</p>
        </div>
        <div className="px-5 pt-6">
          <RSVPForm theme={theme} guestName="John Mensah" />
        </div>
      </div>
    </div>
  );
}
