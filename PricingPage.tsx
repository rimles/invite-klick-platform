import React from 'react';
import { MarketingNav } from '../../components/marketing/MarketingNav';
import { MarketingFooter } from '../../components/marketing/MarketingFooter';
import { SectionHeading } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { IconCheck } from '../../components/icons';
import { Link } from '../../lib/router';

const plans = [
  { name: 'Free', price: '$0', tagline: 'For small, simple celebrations', features: ['1 active invitation', 'Up to 50 guests', 'Curated templates', 'Basic RSVP tracking'], featured: false },
  { name: 'Premium', price: '$19', tagline: 'For weddings & milestone events', features: ['Unlimited invitations', 'Unlimited guests', 'Custom colors & fonts', 'QR check-in & seating plan', 'Guest photo gallery', 'Priority support'], featured: true },
  { name: 'Studio', price: 'Custom', tagline: 'For planners & agencies', features: ['Everything in Premium', 'Multiple team members', 'White-label guest pages', 'Dedicated support'], featured: false },
];

export function PricingPage() {
  return (
    <div className="bg-[#FBF8F5] min-h-screen">
      <MarketingNav />
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow="Pricing" title="Simple pricing for every celebration" align="center" />
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 border flex flex-col ${p.featured ? 'bg-[#482337] border-[#482337] text-white shadow-xl scale-[1.03]' : 'bg-white border-[#E9E1D8]'}`}
            >
              <p className={`text-sm font-semibold ${p.featured ? 'text-[#F1D9DD]' : 'text-[#7A2E42]'}`}>{p.name}</p>
              <p className="font-serif text-4xl mt-3">{p.price}<span className="text-base font-sans opacity-60">{p.price !== 'Custom' ? '/mo' : ''}</span></p>
              <p className={`text-sm mt-2 ${p.featured ? 'text-white/70' : 'text-[#6F6467]'}`}>{p.tagline}</p>
              <div className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <IconCheck size={15} className={p.featured ? 'text-[#F1D9DD] mt-0.5' : 'text-[#2F6B3F] mt-0.5'} />
                    <span className={p.featured ? 'text-white/90' : 'text-[#241A1C]'}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/dashboard/invitations/new" className="mt-7">
                <Button fullWidth variant={p.featured ? 'secondary' : 'primary'}>Get Started</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
