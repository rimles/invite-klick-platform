import React from 'react';
import { Link } from '../../lib/router';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { GuestBottomNav } from '../../components/guest/GuestNav';
import { StatusBadge } from '../../components/ui/Badge';
import { useAppData } from '../../lib/store';
import { currentGuestUser } from '../../data/mockData';
import { IconCalendar, IconEye, IconMapPin } from '../../components/icons';
import { useToast } from '../../components/ui/Toast';

function formatGuestDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}

export function GuestDashboard() {
  const { events } = useAppData();
  const [tab, setTab] = React.useState('upcoming');
  const showToast = useToast();

  const upcoming = events.filter((e) => new Date(e.date).getTime() >= Date.now() - 86400000);
  const past = events.filter((e) => new Date(e.date).getTime() < Date.now() - 86400000);
  const saved: typeof events = [];

  const list = tab === 'upcoming' ? upcoming : tab === 'past' ? past : saved;

  return (
    <div className="min-h-screen bg-[#FBF8F5] pb-24">
      <div className="max-w-md mx-auto">
        <div className="px-5 pt-8 pb-5">
          <p className="font-serif text-2xl text-[#241A1C]">Hi, {currentGuestUser.name.split(' ')[0]} 👋</p>
          <p className="text-sm text-[#6F6467] mt-1">Here are your invitations.</p>
        </div>

        <div className="px-5">
          <Tabs
            tabs={[
              { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
              { id: 'past', label: 'Past', count: past.length },
              { id: 'saved', label: 'Saved', count: saved.length },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>

        <div className="px-5 mt-5 space-y-4">
          {list.length ? list.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-[#E9E1D8] overflow-hidden">
              <div className="h-24 relative" style={{ background: `linear-gradient(155deg, ${e.coverGradient[0]}, ${e.coverGradient[1]})` }}>
                <div className="absolute top-2.5 right-3">
                  <span className="text-[10px] font-medium bg-white/90 px-2.5 py-1 rounded-full text-[#241A1C]">
                    {tab === 'past' ? 'Attended' : 'You’re Invited'}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3.5">
                  <p className="font-serif text-white text-base">{e.title}</p>
                  <p className="text-white/75 text-[11px]">{e.subtitle}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-[#6F6467] mb-1">
                  <IconCalendar size={13} /> {formatGuestDate(e.date)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#9A8F91] mb-3">
                  <IconMapPin size={13} /> {e.city}, {e.country}
                </div>
                <div className="flex gap-2">
                  {tab !== 'past' && (
                    <Link to={`/invite/${e.slug}/rsvp`} className="flex-1 text-center text-sm font-medium py-2.5 rounded-xl text-white" style={{ background: e.theme.primary }}>
                      Respond Now
                    </Link>
                  )}
                  <Link to={`/invite/${e.slug}`} className="flex-1 text-center text-sm font-medium py-2.5 rounded-xl bg-[#F4EFE9] text-[#241A1C] flex items-center justify-center gap-1.5">
                    <IconEye size={14} /> View Details
                  </Link>
                </div>
                <button
                  onClick={() => showToast('Added to your calendar')}
                  className="w-full text-center text-xs font-medium py-2 mt-2 text-[#9A8F91] hover:text-[#241A1C]"
                >
                  + Add to Calendar
                </button>
              </div>
            </div>
          )) : (
            <p className="text-center text-sm text-[#9A8F91] py-12">Nothing here yet.</p>
          )}
        </div>
      </div>
      <GuestBottomNav />
    </div>
  );
}
