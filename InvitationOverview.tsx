import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { InvitationStatusBadge } from '../../components/ui/Badge';
import { MetricCard } from '../../components/ui/MetricCard';
import { Link } from '../../lib/router';
import { useEvent, useGuests } from '../../lib/store';
import {
  IconEdit, IconUsers, IconQR, IconSeat, IconChart, IconEye, IconMapPin,
  IconCalendar, IconClock, IconCheck, IconEyeOff,
} from '../../components/icons';
import { EmptyState } from '../../components/ui/EmptyState';

export function InvitationOverview({ id }: { id: string }) {
  const event = useEvent(id);
  const guests = useGuests(id);

  if (!event) {
    return (
      <CreatorShell>
        <EmptyState title="Invitation not found" description="This invitation may have been removed." />
      </CreatorShell>
    );
  }

  const pct = event.stats.totalGuests ? Math.round((event.stats.rsvpCount / event.stats.totalGuests) * 100) : 0;

  return (
    <CreatorShell>
      <div
        className="rounded-2xl h-40 sm:h-52 relative overflow-hidden mb-6"
        style={{ background: `linear-gradient(155deg, ${event.coverGradient[0]}, ${event.coverGradient[1]})` }}
      >
        <div className="absolute inset-0 flex items-end justify-between p-6">
          <div>
            <InvitationStatusBadge status={event.status} />
            <p className="font-serif text-white text-2xl sm:text-3xl mt-2">{event.title}</p>
            <p className="text-white/75 text-sm mt-1">{event.subtitle}</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Link to={`/invite/${event.slug}`}>
              <Button variant="secondary" icon={<IconEye size={15} />}>Preview Guest View</Button>
            </Link>
            <Link to={`/dashboard/invitations/${event.id}/edit`}>
              <Button icon={<IconEdit size={15} />}>Edit Design</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid sm:hidden gap-2 mb-6">
        <Link to={`/invite/${event.slug}`}><Button fullWidth variant="secondary" icon={<IconEye size={15} />}>Preview Guest View</Button></Link>
        <Link to={`/dashboard/invitations/${event.id}/edit`}><Button fullWidth icon={<IconEdit size={15} />}>Edit Design</Button></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={<IconUsers size={18} />} value={event.stats.totalGuests} label="Total Guests" tone="blush" />
        <MetricCard icon={<IconCheck size={18} />} value={`${event.stats.rsvpCount} (${pct}%)`} label="RSVPs" tone="sage" />
        <MetricCard icon={<IconCalendar size={18} />} value={new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} label="Event Date" tone="gold" />
        <MetricCard icon={<IconSeat size={18} />} value={event.tables.length} label="Tables" tone="lilac" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Event Details</p>
            <div className="space-y-3 text-sm">
              <DetailRow icon={<IconCalendar size={15} />} text={`${new Date(event.date).toDateString()} · ${event.time}`} />
              <DetailRow icon={<IconMapPin size={15} />} text={`${event.venue}, ${event.city}, ${event.country}`} />
              {event.dressCode && <DetailRow icon={<IconClock size={15} />} text={`Dress code: ${event.dressCode}`} />}
            </div>
            <p className="text-sm text-[#6F6467] mt-4 leading-relaxed">{event.description}</p>
          </Card>

          <Card padded={false}>
            <div className="p-5 pb-0 flex items-center justify-between">
              <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide">Recent Activity</p>
            </div>
            <div className="p-5 space-y-4">
              {event.activity.length ? event.activity.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#482337] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-[#241A1C]">{a.message}</p>
                    <p className="text-xs text-[#9A8F91] mt-0.5">{a.timeAgo}</p>
                  </div>
                </div>
              )) : <p className="text-sm text-[#9A8F91]">No activity yet.</p>}
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <NavCard to={`/dashboard/invitations/${event.id}/guests`} icon={<IconUsers size={17} />} title="Guests" subtitle={`${guests.length} added`} />
          <NavCard to={`/dashboard/invitations/${event.id}/seating`} icon={<IconSeat size={17} />} title="Seating" subtitle={`${event.tables.length} tables`} />
          <NavCard to={`/dashboard/invitations/${event.id}/qr`} icon={<IconQR size={17} />} title="QR & Check-in" subtitle="Simulate scans" />
          <NavCard to={`/dashboard/invitations/${event.id}/analytics`} icon={<IconChart size={17} />} title="Analytics" subtitle="RSVP trends" />
        </div>
      </div>
    </CreatorShell>
  );
}

function DetailRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[#241A1C]">
      <span className="text-[#7A2E42] shrink-0">{icon}</span>
      {text}
    </div>
  );
}

function NavCard({ to, icon, title, subtitle }: { to: string; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 bg-white rounded-2xl border border-[#E9E1D8] p-4 hover:border-[#482337]/30 hover:-translate-y-0.5 transition-all duration-200">
      <span className="w-10 h-10 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-medium text-[#241A1C]">{title}</p>
        <p className="text-xs text-[#9A8F91]">{subtitle}</p>
      </div>
    </Link>
  );
}
