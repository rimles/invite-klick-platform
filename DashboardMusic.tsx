import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { MusicLibraryRow } from '../../components/ui/MusicPlayer';
import { musicLibrary } from '../../data/mockData';
import { IconSearch } from '../../components/icons';

const musicCategories = ['All', 'Romantic', 'Upbeat', 'Classical', 'Afrobeats', 'Highlife'];

export function DashboardMusic() {
  const [cat, setCat] = React.useState('All');
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState<string | null>(null);

  const filtered = musicLibrary.filter((t) => {
    if (cat !== 'All' && t.category !== cat) return false;
    if (query && !`${t.title} ${t.artist}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <CreatorShell>
      <div className="mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">Music Library</h1>
        <p className="text-[#6F6467] mt-1 text-sm">Add a soundtrack to any invitation.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E9E1D8] px-3.5 py-2.5 sm:w-72">
          <IconSearch size={15} className="text-[#9A8F91]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tracks or artists…" className="bg-transparent outline-none text-sm w-full" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {musicCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${cat === c ? 'bg-[#482337] text-white' : 'bg-white border border-[#E9E1D8] text-[#6F6467]'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-w-2xl">
        {filtered.map((t) => (
          <MusicLibraryRow key={t.id} track={t} selected={selected === t.id} onSelect={() => setSelected(t.id)} />
        ))}
      </div>
    </CreatorShell>
  );
}
