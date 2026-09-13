import React from 'react';
import { Link } from '../../lib/router';
import { MarketingNav } from '../../components/marketing/MarketingNav';
import { MarketingFooter } from '../../components/marketing/MarketingFooter';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/Card';
import {
  IconImage, IconUsers, IconGallery, IconMusic, IconSeat, IconPlay,
  IconHeart, IconTemplates, IconMail, IconChart, IconQR, IconArrowRight,
} from '../../components/icons';

const featureChips = [
  { icon: IconImage, label: 'Digital Invitations', sub: 'Beautiful & customizable' },
  { icon: IconUsers, label: 'Guest Management', sub: 'RSVP, QR check-in & more' },
  { icon: IconGallery, label: 'Photo Sharing', sub: 'Capture every moment' },
  { icon: IconMusic, label: 'Music & Moments', sub: 'Add music to your invite' },
  { icon: IconSeat, label: 'Seating Plan', sub: 'Keep everyone in place' },
];

const occasions = [
  { icon: IconHeart, label: 'Weddings' },
  { icon: IconMail, label: 'Engagements' },
  { icon: IconChart, label: 'Anniversaries' },
  { icon: IconGallery, label: 'Receptions' },
];

const journeySteps = [
  { n: '01', title: 'Create', desc: 'Choose from stunning designs and customize to match your style.' },
  { n: '02', title: 'Share', desc: 'Send your invitation instantly via WhatsApp, email or link.' },
  { n: '03', title: 'Manage', desc: 'Track RSVPs, assign seats, check guests in with QR codes.' },
  { n: '04', title: 'Celebrate', desc: 'Share photos, play your favourite songs and keep the memories alive.' },
];

export function Homepage() {
  return (
    <div className="bg-[#FBF8F5]">
      <MarketingNav />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7A2E42] mb-4">
            Beautiful events. Brighter connections.
          </p>
          <h1 className="font-serif text-[2.75rem] sm:text-[3.5rem] leading-[1.05] text-[#241A1C]">
            More than invites.
            <br />
            <span className="italic text-[#7A2E42]">Real moments.</span>
          </h1>
          <p className="mt-5 text-[#6F6467] text-lg leading-relaxed max-w-lg">
            Create beautiful digital invitations, manage your guests, share memories and bring people together — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/dashboard/invitations/new">
              <Button size="lg" iconRight={<IconArrowRight size={18} />}>Create Your Invitation</Button>
            </Link>
            <button className="flex items-center gap-2.5 text-sm font-medium text-[#241A1C] group">
              <span className="w-10 h-10 rounded-full bg-white border border-[#E9E1D8] flex items-center justify-center group-hover:border-[#482337]/40 transition-colors">
                <IconPlay size={14} />
              </span>
              Watch How It Works
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4">
            {featureChips.map((f) => (
              <div key={f.label} className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center shrink-0">
                  <f.icon size={16} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#241A1C] leading-tight">{f.label}</p>
                  <p className="text-[11px] text-[#9A8F91] leading-tight">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="rounded-[2rem] aspect-[4/5] relative overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(160deg,#3C1A2A 0%,#7A2E42 55%,#C9707E 100%)' }}
          >
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 55%)' }} />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-white/60 text-[11px] tracking-[0.2em] uppercase">Two souls, one journey</p>
              <p className="font-serif text-white text-2xl mt-2">David &amp; Serwaa</p>
              <p className="text-white/70 text-sm mt-1">Sat, 19 Dec 2026 · Accra, Ghana</p>
            </div>
          </div>

          <div className="absolute -top-4 right-2 sm:-right-6 bg-white rounded-2xl shadow-xl border border-[#E9E1D8] p-3.5 w-40">
            <p className="text-[10px] text-[#9A8F91] mb-1.5">Your QR Pass</p>
            <div className="w-full aspect-square rounded-lg bg-[#F4EFE9] flex items-center justify-center">
              <IconQR size={30} className="text-[#482337]" />
            </div>
            <p className="text-[10px] text-[#6F6467] mt-1.5">Table 5 · VIP</p>
          </div>

          <div className="absolute -bottom-5 -left-3 sm:-left-8 bg-white rounded-2xl shadow-xl border border-[#E9E1D8] p-3.5 w-48">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#482337] text-white flex items-center justify-center shrink-0">
                <IconPlay size={12} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#241A1C] truncate">Our Song</p>
                <p className="text-[10px] text-[#9A8F91] truncate">Asaase &amp; Forever</p>
              </div>
            </div>
            <div className="h-1 rounded-full bg-[#F4EFE9] mt-2.5 overflow-hidden">
              <div className="h-full w-1/3 rounded-full bg-[#482337]" />
            </div>
          </div>

          <div className="absolute bottom-16 -right-2 sm:-right-6 bg-white rounded-2xl shadow-xl border border-[#E9E1D8] p-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              {['#F1D9DD', '#EADFCF', '#E4EAE2'].map((c, i) => (
                <span key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <p className="text-xs font-medium text-[#241A1C]">248 attending</p>
          </div>
        </div>
      </section>

      {/* TRUSTED FOR */}
      <section className="border-y border-[#E9E1D8] bg-white/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-[#9A8F91] mb-6">
            Trusted for life's special moments
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {occasions.map((o) => (
              <div key={o.label} className="flex items-center gap-2 text-[#6F6467]">
                <o.icon size={17} className="text-[#7A2E42]" />
                <span className="text-sm font-medium">{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVERYTHING YOU NEED */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <h2 className="font-serif text-[2rem] sm:text-[2.75rem] leading-[1.1] text-[#241A1C]">
            Simple. Beautiful. Powerful.
            <br />
            <span className="text-[#7A2E42] italic">Everything you need</span> for unforgettable events.
          </h2>
          <p className="text-[#6F6467] text-base leading-relaxed">
            From the first invite to the last photo, Invite Klick gives you the tools to create, manage and celebrate — beautifully.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {journeySteps.map((s) => (
            <div key={s.n} className="bg-white rounded-2xl border border-[#E9E1D8] p-6 hover:-translate-y-1 hover:shadow-[0_14px_32px_-14px_rgba(72,35,55,0.2)] transition-all duration-200">
              <p className="text-xs font-semibold text-[#9A8F91] mb-6">{s.n}</p>
              <h3 className="font-serif text-xl text-[#241A1C] mb-2">{s.title}</h3>
              <p className="text-sm text-[#6F6467] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS / CTA BAND */}
      <section className="bg-[#241A1C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(122,46,66,0.6), transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9707E] mb-4">Moments that matter</p>
            <h2 className="font-serif text-white text-3xl sm:text-4xl leading-tight">
              Beautiful invites.
              <br />
              Happier together.
            </h2>
            <p className="text-white/60 mt-4 max-w-md">Join thousands creating meaningful experiences with Invite Klick.</p>
            <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
              <Stat value="10K+" label="Events created" />
              <Stat value="500K+" label="Invites sent" />
              <Stat value="98%" label="Happy hosts" />
            </div>
            <Link to="/dashboard/invitations/new">
              <Button size="lg" className="mt-9" variant="secondary">Create Your Invitation</Button>
            </Link>
          </div>
          <div className="hidden lg:flex justify-end gap-5">
            <div className="w-44 aspect-[9/17] rounded-[1.75rem] border-4 border-white/10 shadow-2xl" style={{ background: 'linear-gradient(160deg,#7A2E42,#C9707E)' }} />
            <div className="w-44 aspect-[9/17] rounded-[1.75rem] border-4 border-white/10 shadow-2xl mt-10" style={{ background: 'linear-gradient(160deg,#152447,#C9A44C)' }} />
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-2xl text-white">{value}</p>
      <p className="text-xs text-white/50 mt-1">{label}</p>
    </div>
  );
}
