import React from 'react';
import { MarketingNav } from '../../components/marketing/MarketingNav';
import { MarketingFooter } from '../../components/marketing/MarketingFooter';
import { SectionHeading } from '../../components/ui/Card';
import { TemplateCard } from '../../components/ui/TemplateCard';
import { templates } from '../../data/mockData';
import { useNavigate } from '../../lib/router';

export function TemplatesPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FBF8F5] min-h-screen">
      <MarketingNav />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Design Templates"
          title="A template for every story"
          subtitle="Romantic, modern, classic or minimal — start from a curated design and make it yours."
          align="center"
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} onUse={() => navigate('/dashboard/invitations/new')} />
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
