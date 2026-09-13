import React from 'react';
import { useEvent } from '../../lib/store';
import { Link } from '../../lib/router';
import { GalleryGrid } from '../../components/ui/GalleryGrid';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { IconChevronLeft, IconUpload } from '../../components/icons';

export function GuestGallery({ slug }: { slug: string }) {
  const event = useEvent(slug);
  const [tab, setTab] = React.useState('all');
  const showToast = useToast();
  if (!event) return null;
  const theme = event.theme;

  const filtered = tab === 'all' ? event.gallery : event.gallery.filter((m) => m.category.toLowerCase() === tab);

  return (
    <div style={{ background: theme.background, color: theme.text }} className="min-h-screen">
      <div className="max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 flex items-center h-14 px-4 backdrop-blur-md" style={{ background: `${theme.surface}CC` }}>
          <Link to={`/invite/${event.slug}`} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ color: theme.text }}>
            <IconChevronLeft size={18} />
          </Link>
          <p className="font-serif text-base ml-1">Gallery</p>
        </div>
        <div className="px-5 pt-5 flex items-center justify-between">
          <Tabs
            tabs={[{ id: 'all', label: 'All' }, { id: 'official', label: 'Official' }, { id: 'guests', label: 'Guests' }]}
            active={tab}
            onChange={setTab}
          />
        </div>
        {event.settings.allowGuestUploads && (
          <div className="px-5 mt-4">
            <Button fullWidth variant="outline" icon={<IconUpload size={15} />} onClick={() => showToast('Photo uploaded — thanks for sharing!')}>
              Upload Your Photos
            </Button>
          </div>
        )}
        <div className="px-5 pt-5">
          <GalleryGrid items={filtered} />
        </div>
      </div>
    </div>
  );
}
