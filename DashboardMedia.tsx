import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { GalleryGrid } from '../../components/ui/GalleryGrid';
import { Select } from '../../components/ui/FormField';
import { useAppData } from '../../lib/store';

export function DashboardMedia() {
  const { events } = useAppData();
  const [eventId, setEventId] = React.useState('all');

  const allMedia = events.flatMap((e) => e.gallery.map((m) => ({ ...m, eventTitle: e.title })));
  const filtered = eventId === 'all' ? allMedia : allMedia.filter((m) => m.eventId === eventId);

  return (
    <CreatorShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">Media Gallery</h1>
          <p className="text-[#6F6467] mt-1 text-sm">Photos across all of your events.</p>
        </div>
        <Select value={eventId} onChange={(e) => setEventId(e.target.value)} className="sm:w-64">
          <option value="all">All events</option>
          {events.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
        </Select>
      </div>
      <GalleryGrid items={filtered} />
    </CreatorShell>
  );
}
