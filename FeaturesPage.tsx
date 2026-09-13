import React from 'react';
import { MarketingNav } from '../../components/marketing/MarketingNav';
import { MarketingFooter } from '../../components/marketing/MarketingFooter';
import { SectionHeading } from '../../components/ui/Card';
import {
  IconImage, IconUsers, IconGallery, IconMusic, IconSeat, IconQR, IconChart,
} from '../../components/icons';

const features = [
  { icon: IconImage, title: 'Digital Invitations', desc: 'Editorial, customizable invitation designs for every occasion — wedding, engagement, anniversary and more.' },
  { icon: IconUsers, title: 'Guest Management', desc: 'Track RSVPs, party sizes and meal preferences from one organized guest list.' },
  { icon: IconGallery, title: 'Photo Sharing', desc: 'Collect official and guest-uploaded photos in one shared event gallery.' },
  { icon: IconMusic, title: 'Music & Moments', desc: 'Add a soundtrack to your invitation, or build out a guest-requested playlist.' },
  { icon: IconSeat, title: 'Seating Plan', desc: 'Organize tables and assign guests — with visual drag-and-drop coming soon.' },
  { icon: IconQR, title: 'QR Check-in', desc: 'Every guest gets a personal QR pass for fast, contactless check-in at the door.' },
  { icon: IconChart, title: 'Analytics', desc: 'See RSVP trends, guest engagement and event performance at a glance.' },
];

export function FeaturesPage() {
  return (
    <div className="bg-[#FBF8F5] min-h-screen">
      <MarketingNav />
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Features"
          title="Everything for unforgettable events"
          subtitle="One platform to create, manage and celebrate — from the first invite to the last photo."
          align="center"
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-[#E9E1D8] p-6">
              <span className="w-11 h-11 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center mb-4">
                <f.icon size={18} />
              </span>
              <h3 className="font-serif text-lg text-[#241A1C] mb-1.5">{f.title}</h3>
              <p className="text-sm text-[#6F6467] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
