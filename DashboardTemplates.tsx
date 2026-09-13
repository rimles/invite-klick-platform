import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { TemplateCard } from '../../components/ui/TemplateCard';
import { Tabs } from '../../components/ui/Tabs';
import { templates } from '../../data/mockData';
import { useNavigate } from '../../lib/router';
import { useToast } from '../../components/ui/Toast';

const templateCategories = ['All', 'Romantic', 'Modern', 'Classic', 'Minimal', 'Luxury', 'Garden', 'Traditional', 'Editorial'];

export function DashboardTemplates() {
  const [cat, setCat] = React.useState('All');
  const navigate = useNavigate();
  const showToast = useToast();
  const filtered = cat === 'All' ? templates : templates.filter((t) => t.category === cat);

  return (
    <CreatorShell>
      <div className="mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">Design Templates</h1>
        <p className="text-[#6F6467] mt-1 text-sm">Start your next invitation from a curated design.</p>
      </div>
      <div className="mb-6 overflow-x-auto">
        <Tabs tabs={templateCategories.map((c) => ({ id: c, label: c }))} active={cat} onChange={setCat} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((t) => (
          <TemplateCard
            key={t.id}
            template={t}
            onUse={() => { showToast(`Starting a new invitation with ${t.name}`); navigate('/dashboard/invitations/new'); }}
          />
        ))}
      </div>
    </CreatorShell>
  );
}
