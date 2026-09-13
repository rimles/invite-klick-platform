import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { MetricCard } from '../../components/ui/MetricCard';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { InvitationStatusBadge } from '../../components/ui/Badge';
import { Link } from '../../lib/router';
import { dashboardMetrics, recentActivity, currentUser } from '../../data/mockData';
import { useAppData } from '../../lib/store';
import {
  IconMail, IconUsers, IconCheck, IconCalendar, IconPlus, IconGallery,
  IconUpload, IconArrowRight, IconEdit,
} from '../../components/icons';

function formatDashboardDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}
function daysUntil(iso: string) {
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
  if (diff < 0) return 'Past';
  if (diff === 0) return 'Today';
  if (diff < 60) return `In ${diff} day${diff === 1 ? '' : 's'}`;
  const months = Math.round(diff / 30);
  return `In ${months} month${months === 1 ? '' : 's'}`;
}

export function Dashboard() {
  const { events } = useAppData();
  const recent = events.slice(0, 4);
  const upcoming = [...events]
    .filter((e) => new Date(e.date).getTime() > Date.now() - 86400000)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <CreatorShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">Good morning, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="text-[#6F6467] mt-1 text-sm sm:text-base">Here's what's happening with your invitations.</p>
        </div>
        <Link to="/dashboard/invitations/new">
          <Button size="lg" icon={<IconPlus size={17} />}>Create Invitation</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard icon={<IconMail size={18} />} value={dashboardMetrics.totalInvitations} label="Total Invitations" tone="blush" />
        <MetricCard icon={<IconUsers size={18} />} value={dashboardMetrics.totalGuests.toLocaleString()} label="Total Guests" tone="gold" />
        <MetricCard icon={<IconCheck size={18} />} value={`${dashboardMetrics.totalRSVPs} (${dashboardMetrics.rsvpRate}%)`} label="RSVPs" tone="sage" />
        <MetricCard icon={<IconCalendar size={18} />} value={dashboardMetrics.upcomingEvents} label="Upcoming Events" tone="lilac" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-[#241A1C]">Recent Invitations</h2>
              <Link to="/dashboard/invitations" className="text-sm font-medium text-[#7A2E42] flex items-center gap-1">
                View all <IconArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recent.map((e) => {
                const pct = Math.round((e.stats.rsvpCount / e.stats.totalGuests) * 100);
                return (
                  <Link key={e.id} to={`/dashboard/invitations/${e.id}`} className="block bg-white rounded-2xl border border-[#E9E1D8] overflow-hidden group hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_rgba(72,35,55,0.18)] transition-all duration-200">
                    <div className="h-24 relative" style={{ background: `linear-gradient(155deg, ${e.coverGradient[0]}, ${e.coverGradient[1]})` }}>
                      <div className="absolute bottom-2.5 left-3.5">
                        <p className="font-serif text-white text-base leading-tight">{e.title}</p>
                        <p className="text-white/75 text-[11px]">{e.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <p className="text-xs text-[#9A8F91] mb-2">{formatDashboardDate(e.date)} · {e.city}, {e.country}</p>
                      <div className="flex items-center justify-between text-xs text-[#6F6467] mb-2">
                        <span>{e.stats.totalGuests} guests</span>
                        <span className="font-medium text-[#2F6B3F]">{pct}% RSVP</span>
                      </div>
                      <div className="w-full mt-1 h-1.5 rounded-full bg-[#F4EFE9] overflow-hidden">
                        <div className="h-full rounded-full bg-[#482337]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-xl text-[#241A1C] mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <QuickAction icon={<IconMail size={18} />} title="Create Invitation" subtitle="Start from scratch" to="/dashboard/invitations/new" />
              <QuickAction icon={<IconGallery size={18} />} title="Browse Templates" subtitle="Find your perfect style" to="/dashboard/templates" />
              <QuickAction icon={<IconUsers size={18} />} title="Guest List" subtitle="Add & manage guests" to="/dashboard/guests" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-[#241A1C]">Upcoming Events</h2>
              <Link to="/dashboard/invitations" className="text-xs font-medium text-[#7A2E42]">View all</Link>
            </div>
            <div className="space-y-4">
              {upcoming.map((e) => (
                <Link key={e.id} to={`/dashboard/invitations/${e.id}`} className="flex items-center gap-3 group">
                  <span
                    className="w-11 h-11 rounded-xl shrink-0"
                    style={{ background: `linear-gradient(155deg, ${e.coverGradient[0]}, ${e.coverGradient[1]})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#241A1C] truncate group-hover:text-[#7A2E42]">{e.title} {e.subtitle}</p>
                    <p className="text-xs text-[#9A8F91]">{formatDashboardDate(e.date)} · {e.stats.totalGuests} guests</p>
                  </div>
                  <InvitationStatusBadge status={e.status} />
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="font-serif text-lg text-[#241A1C] mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#F4EFE9] text-[#7A2E42] flex items-center justify-center shrink-0 mt-0.5">
                    {a.icon === 'rsvp' && <IconCheck size={14} />}
                    {a.icon === 'photo' && <IconGallery size={14} />}
                    {a.icon === 'guest' && <IconUsers size={14} />}
                    {a.icon === 'design' && <IconEdit size={14} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-[#241A1C] leading-snug">{a.message}</p>
                    <p className="text-xs text-[#9A8F91] mt-0.5">{a.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(155deg,#482337,#7A2E42)' }}
          >
            <IconUpload size={20} className="text-white/70 mb-3" />
            <p className="font-serif text-white text-lg leading-snug">Workspace</p>
            <p className="text-white/70 text-xs mt-1.5 leading-relaxed">Your creativity has no limits. Make every moment special.</p>
          </div>
        </div>
      </div>
    </CreatorShell>
  );
}

function QuickAction({ icon, title, subtitle, to }: { icon: React.ReactNode; title: string; subtitle: string; to: string }) {
  return (
    <Link to={to} className="bg-white rounded-2xl border border-[#E9E1D8] p-4 flex items-center gap-3 hover:border-[#482337]/30 hover:-translate-y-0.5 transition-all duration-200">
      <span className="w-10 h-10 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#241A1C]">{title}</p>
        <p className="text-xs text-[#9A8F91]">{subtitle}</p>
      </div>
    </Link>
  );
}
