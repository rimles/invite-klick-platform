import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { InvitationCard } from '../../components/ui/InvitationCard';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { EmptyState } from '../../components/ui/EmptyState';
import { Link } from '../../lib/router';
import { useAppData } from '../../lib/store';
import { IconPlus, IconMail, IconSearch } from '../../components/icons';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'published', label: 'Published' },
  { id: 'draft', label: 'Drafts' },
];

export function MyInvitations() {
  const { events } = useAppData();
  const [filter, setFilter] = React.useState('all');
  const [query, setQuery] = React.useState('');

  const filtered = events.filter((e) => {
    if (filter !== 'all' && e.status !== filter) return false;
    if (query && !`${e.title} ${e.subtitle}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <CreatorShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">My Invitations</h1>
          <p className="text-[#6F6467] mt-1 text-sm">{events.length} invitations · manage designs, guests and RSVPs.</p>
        </div>
        <Link to="/dashboard/invitations/new">
          <Button icon={<IconPlus size={16} />}>Create Invitation</Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <Tabs tabs={filters} active={filter} onChange={setFilter} />
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E9E1D8] px-3.5 py-2.5 w-full sm:w-64">
          <IconSearch size={15} className="text-[#9A8F91]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search invitations…"
            className="bg-transparent outline-none text-sm w-full placeholder:text-[#9A8F91]"
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((e) => (
            <InvitationCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<IconMail size={22} />}
          title="No invitations found"
          description="Try a different search or create a new invitation."
          action={
            <Link to="/dashboard/invitations/new">
              <Button icon={<IconPlus size={16} />}>Create Invitation</Button>
            </Link>
          }
        />
      )}
    </CreatorShell>
  );
}
