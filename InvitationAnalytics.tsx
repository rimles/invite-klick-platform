import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { MetricCard } from '../../components/ui/MetricCard';
import { Card } from '../../components/ui/Card';
import { useEvent, useGuests } from '../../lib/store';
import { Link } from '../../lib/router';
import { IconChevronLeft, IconUsers, IconCheck, IconClock, IconX } from '../../components/icons';
import type { RSVPStatus } from '../../types';

const statusMeta: { id: RSVPStatus; label: string; color: string }[] = [
  { id: 'attending', label: 'Attending', color: '#2F6B3F' },
  { id: 'checked-in', label: 'Checked In', color: '#33538A' },
  { id: 'pending', label: 'Pending', color: '#C9A44C' },
  { id: 'invited', label: 'Invited (no response)', color: '#9A8F91' },
  { id: 'declined', label: 'Declined', color: '#9A4A4A' },
];

export function InvitationAnalytics({ id }: { id: string }) {
  const event = useEvent(id);
  const guests = useGuests(id);

  if (!event) {
    return (
      <CreatorShell>
        <p className="text-[#6F6467]">Invitation not found.</p>
      </CreatorShell>
    );
  }

  const total = guests.length || 1;
  const counts = statusMeta.map((s) => ({ ...s, count: guests.filter((g) => g.rsvp === s.id).length }));
  const attending = guests.filter((g) => g.rsvp === 'attending' || g.rsvp === 'checked-in').length;
  const groupCounts: Record<string, number> = {};
  guests.forEach((g) => { groupCounts[g.group] = (groupCounts[g.group] || 0) + 1; });

  return (
    <CreatorShell>
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/dashboard/invitations/${event.id}`} className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E9E1D8] text-[#241A1C] hover:bg-[#F4EFE9]">
          <IconChevronLeft size={16} />
        </Link>
        <h1 className="font-serif text-2xl text-[#241A1C]">{event.title} — Analytics</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={<IconUsers size={18} />} value={guests.length} label="Guests Invited" tone="blush" />
        <MetricCard icon={<IconCheck size={18} />} value={attending} label="Confirmed Attending" tone="sage" />
        <MetricCard icon={<IconClock size={18} />} value={counts.find((c) => c.id === 'pending')?.count ?? 0} label="Awaiting Response" tone="gold" />
        <MetricCard icon={<IconX size={18} />} value={counts.find((c) => c.id === 'declined')?.count ?? 0} label="Declined" tone="lilac" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-5">RSVP Breakdown</p>
          <div className="space-y-4">
            {counts.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-[#241A1C]">{c.label}</span>
                  <span className="text-[#9A8F91]">{c.count}</span>
                </div>
                <div className="h-2 rounded-full bg-[#F4EFE9] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(c.count / total) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-5">Guests by Group</p>
          <div className="space-y-4">
            {Object.entries(groupCounts).map(([group, count]) => (
              <div key={group}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-[#241A1C]">{group}</span>
                  <span className="text-[#9A8F91]">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-[#F4EFE9] overflow-hidden">
                  <div className="h-full rounded-full bg-[#7A2E42] transition-all duration-500" style={{ width: `${(count / total) * 100}%` }} />
                </div>
              </div>
            ))}
            {!Object.keys(groupCounts).length && <p className="text-sm text-[#9A8F91]">No guests yet.</p>}
          </div>
        </Card>
      </div>
    </CreatorShell>
  );
}
