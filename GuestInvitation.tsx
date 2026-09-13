import React from 'react';
import { useEvent } from '../../lib/store';
import { Link } from '../../lib/router';
import { CountdownTimer } from '../../components/ui/CountdownTimer';
import { ScheduleTimeline } from '../../components/ui/ScheduleTimeline';
import { GalleryGrid } from '../../components/ui/GalleryGrid';
import { MusicPlayer } from '../../components/ui/MusicPlayer';
import { EmptyState } from '../../components/ui/EmptyState';
import { musicLibrary } from '../../data/mockData';
import { themeToCssVars } from '../../theme/tokens';
import {
  IconCalendar, IconClock, IconMapPin, IconHeart, IconGallery,
  IconChevronDown, IconArrowRight, IconMail,
} from '../../components/icons';

export function GuestInvitation({ slug }: { slug: string }) {
  const event = useEvent(slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F5]">
        <EmptyState title="Invitation not found" description="This invitation link may be invalid or expired." />
      </div>
    );
  }

  const theme = event.theme;
  const guestName = 'John';

  return (
    <div style={{ background: theme.background, color: theme.text, ...themeToCssVars(theme) } as React.CSSProperties} className="min-h-screen">
      <div className="max-w-md mx-auto">
        {/* HERO */}
        <div
          className="relative min-h-[70vh] flex flex-col justify-end p-7 pb-10"
          style={{ background: `linear-gradient(175deg, ${theme.primary}E6, ${theme.primary})` }}
        >
          <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 25% 15%, rgba(255,255,255,0.3), transparent 55%)` }} />
          <p className="relative text-white/60 text-[11px] tracking-[0.25em] uppercase text-center">
            {event.occasion === 'wedding' ? 'Two souls, one journey' : event.subtitle}
          </p>
          <p className="relative font-serif text-white text-4xl text-center mt-4 leading-tight">{event.title}</p>
          <p className="relative text-white/75 text-sm text-center mt-2 uppercase tracking-widest">{event.subtitle}</p>
          <div className="relative flex items-center justify-center gap-3 mt-5">
            <span className="text-white/80 text-xs font-medium border border-white/25 rounded-full px-3 py-1">
              {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase()}
            </span>
            <span className="text-white font-serif text-lg">{new Date(event.date).getDate()}</span>
            <span className="text-white/80 text-xs font-medium border border-white/25 rounded-full px-3 py-1">
              {new Date(event.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
            </span>
          </div>
          <p className="relative text-white/70 text-xs text-center mt-2">{event.city}, {event.country}</p>
          <div className="relative mt-7">
            <CountdownTimer date={`${event.date}T16:00:00`} />
          </div>
          {event.quote && <p className="relative italic font-serif text-white/70 text-sm text-center mt-8">"{event.quote}"</p>}
          <div className="relative flex justify-center mt-6 gap-1.5 text-white/50 text-[11px] items-center">
            <span>Scroll to explore</span>
            <IconChevronDown size={13} className="animate-bounce" />
          </div>
        </div>

        {/* QUICK NAV */}
        <div className="flex items-center justify-around px-2 py-4 border-b" style={{ borderColor: `${theme.muted}20`, background: theme.surface }}>
          {[
            ['Details', IconCalendar],
            ['Schedule', IconClock],
            ['Location', IconMapPin],
            ['Gallery', IconGallery],
            ['RSVP', IconHeart],
          ].map(([label, Icon]: any) => (
            <a key={label} href={`#section-${label.toLowerCase()}`} className="flex flex-col items-center gap-1 text-[10px] font-medium" style={{ color: theme.muted }}>
              <Icon size={17} />
              {label}
            </a>
          ))}
        </div>

        {/* DETAILS */}
        <div id="section-details" className="p-6" style={{ background: theme.surface }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: theme.primary }}>Event Details</p>
          <p className="leading-relaxed text-sm opacity-80 mb-5">{event.description}</p>
          <div className="space-y-3 text-sm">
            <Detail icon={<IconCalendar size={15} />} label={new Date(event.date).toDateString()} theme={theme} />
            <Detail icon={<IconClock size={15} />} label={event.time} theme={theme} />
            <Detail icon={<IconMapPin size={15} />} label={`${event.venue}, ${event.city}`} theme={theme} />
            {event.dressCode && <Detail icon={<IconHeart size={15} />} label={`Dress code: ${event.dressCode}`} theme={theme} />}
          </div>
        </div>

        {/* SCHEDULE */}
        <div id="section-schedule" className="p-6 border-t" style={{ borderColor: `${theme.muted}15`, background: theme.background }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-5" style={{ color: theme.primary }}>Schedule</p>
          <ScheduleTimeline items={event.schedule} accent={theme.primary} />
        </div>

        {/* LOCATION */}
        <div id="section-location" className="p-6 border-t" style={{ borderColor: `${theme.muted}15`, background: theme.surface }}>
          <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: theme.primary }}>Location</p>
          <div className="rounded-2xl h-32 flex items-center justify-center mb-3" style={{ background: `${theme.primary}0F` }}>
            <IconMapPin size={24} style={{ color: theme.primary }} />
          </div>
          <p className="text-sm font-medium">{event.venue}</p>
          <p className="text-xs opacity-60 mt-0.5">{event.address}, {event.city}, {event.country}</p>
        </div>

        {/* GALLERY */}
        <div id="section-gallery" className="p-6 border-t" style={{ borderColor: `${theme.muted}15`, background: theme.background }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.primary }}>Gallery</p>
            <Link to={`/invite/${event.slug}/gallery`} className="text-xs font-medium flex items-center gap-1" style={{ color: theme.primary }}>
              See all <IconArrowRight size={12} />
            </Link>
          </div>
          <GalleryGrid items={event.gallery.slice(0, 3)} />
        </div>

        {/* MUSIC */}
        {event.musicTrackId && (
          <div className="p-6 border-t" style={{ borderColor: `${theme.muted}15`, background: theme.surface }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: theme.primary }}>Our Song</p>
            <MusicPlayer track={musicLibrary.find((m) => m.id === event.musicTrackId)} accent={theme.primary} />
          </div>
        )}

        {/* RSVP CTA */}
        <div id="section-rsvp" className="p-6 border-t" style={{ borderColor: `${theme.muted}15`, background: theme.background }}>
          <div className="rounded-2xl p-6 text-center" style={{ background: theme.primary }}>
            <p className="text-white/70 text-xs uppercase tracking-widest mb-2">Hello, {guestName}</p>
            <p className="font-serif text-white text-xl mb-4">You're invited to celebrate with us</p>
            <Link to={`/invite/${event.slug}/rsvp`} className="inline-flex items-center gap-2 bg-white text-sm font-medium px-6 py-3 rounded-xl" style={{ color: theme.primary }}>
              RSVP Now <IconArrowRight size={15} />
            </Link>
          </div>
          {event.contactName && (
            <p className="text-center text-xs opacity-50 mt-5 flex items-center justify-center gap-1.5">
              <IconMail size={12} /> Questions? Contact {event.contactName}{event.contactPhone ? ` · ${event.contactPhone}` : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ icon, label, theme }: { icon: React.ReactNode; label: string; theme: any }) {
  return (
    <div className="flex items-center gap-2.5">
      <span style={{ color: theme.primary }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
