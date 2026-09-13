import React from 'react';
import { useEvent } from '../../lib/store';
import { Link } from '../../lib/router';
import { ScheduleTimeline } from '../../components/ui/ScheduleTimeline';
import { IconChevronLeft } from '../../components/icons';
import { themeToCssVars } from '../../theme/tokens';

export function GuestSchedule({ slug }: { slug: string }) {
  const event = useEvent(slug);
  if (!event) return null;
  const theme = event.theme;

  return (
    <div style={{ background: theme.background, color: theme.text, ...themeToCssVars(theme) }} className="min-h-screen">
      <div className="max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 flex items-center h-14 px-4 backdrop-blur-md" style={{ background: `${theme.surface}CC` }}>
          <Link to={`/invite/${event.slug}`} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: theme.text }}>
            <IconChevronLeft size={18} />
          </Link>
          <p className="font-serif text-base ml-1">Schedule</p>
        </div>
        <div className="px-6 pt-8">
          <ScheduleTimeline items={event.schedule} accent={theme.primary} />
        </div>
      </div>
    </div>
  );
}
