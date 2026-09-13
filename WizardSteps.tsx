import React from 'react';
import type { Occasion, Guest, EventTheme } from '../../../types';
import { FormField, TextInput, TextArea, Select, Switch } from '../../../components/ui/FormField';
import { TemplateCard } from '../../../components/ui/TemplateCard';
import { PaletteCard } from '../../../components/ui/PaletteCard';
import { Button, IconButton } from '../../../components/ui/Button';
import { PhonePreview } from '../../../components/ui/PhonePreview';
import { CountdownTimer } from '../../../components/ui/CountdownTimer';
import { templates } from '../../../data/mockData';
import { curatedThemes } from '../../../theme/tokens';
import { IconHeart, IconMail, IconCalendar, IconGallery, IconPlus, IconTrash, IconUpload, IconCheck } from '../../../components/icons';
import { ComingSoon } from '../../../components/ui/EmptyState';
import { Pill } from '../../../components/ui/Badge';

export interface WizardData {
  occasion: Occasion;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  endTime: string;
  venue: string;
  address: string;
  city: string;
  description: string;
  dressCode: string;
  contactName: string;
  contactPhone: string;
  templateId: string;
  themeId: string;
  guests: { name: string; email: string; group: string }[];
  allowGuestUploads: boolean;
  approvalRequired: boolean;
}

export const occasionOptions: { id: Occasion; label: string; icon: React.ComponentType<{ size?: number }>; desc: string }[] = [
  { id: 'wedding', label: 'Wedding', icon: IconHeart, desc: 'Ceremony & reception' },
  { id: 'engagement', label: 'Engagement', icon: IconMail, desc: 'Knocking / proposal celebration' },
  { id: 'anniversary', label: 'Wedding Anniversary', icon: IconCalendar, desc: 'Milestone celebration' },
  { id: 'reception', label: 'Wedding Reception / Party', icon: IconGallery, desc: 'Reception or after-party' },
];

export function OccasionStep({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[#241A1C] mb-1.5">What are you celebrating?</h2>
      <p className="text-sm text-[#6F6467] mb-6">Choose an occasion to get started — you can fine-tune everything next.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {occasionOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange({ occasion: opt.id, subtitle: opt.label })}
            className={[
              'text-left rounded-2xl border p-5 transition-all duration-200 flex items-start gap-4',
              data.occasion === opt.id ? 'border-[#482337] bg-[#FBF6F3] ring-2 ring-[#482337]/10' : 'border-[#E9E1D8] bg-white hover:border-[#482337]/30',
            ].join(' ')}
          >
            <span className="w-11 h-11 rounded-xl bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center shrink-0">
              <opt.icon size={18} />
            </span>
            <div>
              <p className="font-medium text-[#241A1C]">{opt.label}</p>
              <p className="text-xs text-[#9A8F91] mt-0.5">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DetailsStep({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[#241A1C] mb-1.5">Event details</h2>
      <p className="text-sm text-[#6F6467] mb-6">Tell your guests when, where and what to expect.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Couple / Event names" required>
          <TextInput value={data.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. David & Serwaa" />
        </FormField>
        <FormField label="Event subtitle">
          <TextInput value={data.subtitle} onChange={(e) => onChange({ subtitle: e.target.value })} placeholder="e.g. Wedding Celebration" />
        </FormField>
        <FormField label="Date" required>
          <TextInput type="date" value={data.date} onChange={(e) => onChange({ date: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Start time">
            <TextInput type="time" value={data.time} onChange={(e) => onChange({ time: e.target.value })} />
          </FormField>
          <FormField label="End time">
            <TextInput type="time" value={data.endTime} onChange={(e) => onChange({ endTime: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Venue" required>
          <TextInput value={data.venue} onChange={(e) => onChange({ venue: e.target.value })} placeholder="e.g. Aburi Botanical Gardens" />
        </FormField>
        <FormField label="City">
          <TextInput value={data.city} onChange={(e) => onChange({ city: e.target.value })} placeholder="e.g. Accra, Ghana" />
        </FormField>
        <FormField label="Address">
          <TextInput value={data.address} onChange={(e) => onChange({ address: e.target.value })} placeholder="Street address (shared privately with guests)" />
        </FormField>
        <FormField label="Dress code">
          <TextInput value={data.dressCode} onChange={(e) => onChange({ dressCode: e.target.value })} placeholder="e.g. Traditional / Formal" />
        </FormField>
        <FormField label="Contact name">
          <TextInput value={data.contactName} onChange={(e) => onChange({ contactName: e.target.value })} />
        </FormField>
        <FormField label="Contact phone">
          <TextInput value={data.contactPhone} onChange={(e) => onChange({ contactPhone: e.target.value })} />
        </FormField>
        <div className="sm:col-span-2">
          <FormField label="Description">
            <TextArea rows={3} value={data.description} onChange={(e) => onChange({ description: e.target.value })} placeholder="A short, warm note to your guests…" />
          </FormField>
        </div>
      </div>
    </div>
  );
}

function MiniPreview({ data, theme }: { data: WizardData; theme: EventTheme }) {
  return (
    <PhonePreview>
      <div className="h-full flex flex-col justify-end p-5 relative" style={{ background: `linear-gradient(160deg, ${theme.primary}, ${theme.primary}CC)` }}>
        <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase">{data.occasion}</p>
        <p className="font-serif text-white text-2xl mt-2 leading-tight">{data.title || 'Your Names'}</p>
        <p className="text-white/70 text-xs mt-1">{data.subtitle}</p>
        {data.date && (
          <div className="mt-4">
            <CountdownTimer date={`${data.date}T${data.time || '16:00'}:00`} />
          </div>
        )}
      </div>
    </PhonePreview>
  );
}

export function DesignStep({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  const [tab, setTab] = React.useState<'templates' | 'colors'>('templates');
  const theme = curatedThemes.find((t) => t.id === data.themeId) || curatedThemes[0];

  return (
    <div>
      <h2 className="font-serif text-2xl text-[#241A1C] mb-1.5">Choose your design</h2>
      <p className="text-sm text-[#6F6467] mb-6">Pick a template and palette — your preview updates instantly.</p>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex gap-2 mb-5">
            <button onClick={() => setTab('templates')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'templates' ? 'bg-[#482337] text-white' : 'bg-[#F4EFE9] text-[#6F6467]'}`}>Templates</button>
            <button onClick={() => setTab('colors')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'colors' ? 'bg-[#482337] text-white' : 'bg-[#F4EFE9] text-[#6F6467]'}`}>Colors</button>
          </div>
          {tab === 'templates' ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {templates.map((t) => (
                <TemplateCard key={t.id} template={t} eventTitle={data.title} selected={data.templateId === t.id} onUse={() => onChange({ templateId: t.id })} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {curatedThemes.map((t) => (
                <PaletteCard key={t.id} theme={t} selected={data.themeId === t.id} onSelect={() => onChange({ themeId: t.id })} />
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-3 text-center">Live Preview</p>
          <MiniPreview data={data} theme={theme} />
        </div>
      </div>
    </div>
  );
}

export function GuestsStep({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [group, setGroup] = React.useState('Family');

  function addGuest() {
    if (!name.trim()) return;
    onChange({ guests: [...data.guests, { name: name.trim(), email: email.trim(), group }] });
    setName('');
    setEmail('');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="font-serif text-2xl text-[#241A1C]">Add your guests</h2>
        <ComingSoon label="Bulk Upload — Coming Soon" />
      </div>
      <p className="text-sm text-[#6F6467] mb-6">Add guests one at a time now — you can invite more anytime from Guest Lists.</p>

      <div className="bg-[#FBF8F5] rounded-2xl border border-[#E9E1D8] p-4 flex flex-col sm:flex-row gap-3 mb-6">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Guest name" className="sm:flex-1" />
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" className="sm:flex-1" />
        <Select value={group} onChange={(e) => setGroup(e.target.value)} className="sm:w-40">
          <option>Family</option>
          <option>Friends</option>
          <option>Colleagues</option>
          <option>VIP</option>
        </Select>
        <Button icon={<IconPlus size={16} />} onClick={addGuest}>Add</Button>
      </div>

      {data.guests.length ? (
        <div className="rounded-2xl border border-[#E9E1D8] bg-white divide-y divide-[#F0EAE3]">
          {data.guests.map((g, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-[#241A1C]">{g.name}</p>
                <p className="text-xs text-[#9A8F91]">{g.email || '—'} · {g.group}</p>
              </div>
              <button
                onClick={() => onChange({ guests: data.guests.filter((_, gi) => gi !== i) })}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#9A4A4A] hover:bg-[#FBF3F3]"
              >
                <IconTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#9A8F91] text-center py-8">No guests added yet.</p>
      )}
    </div>
  );
}

export function PublishStep({ data, onChange }: { data: WizardData; onChange: (patch: Partial<WizardData>) => void }) {
  const theme = curatedThemes.find((t) => t.id === data.themeId) || curatedThemes[0];
  const template = templates.find((t) => t.id === data.templateId);
  return (
    <div>
      <h2 className="font-serif text-2xl text-[#241A1C] mb-1.5">Ready to publish</h2>
      <p className="text-sm text-[#6F6467] mb-6">Review your invitation and go live — you can keep editing after publishing.</p>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E9E1D8] p-5">
            <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-3">Summary</p>
            <dl className="grid sm:grid-cols-2 gap-4 text-sm">
              <Row label="Event" value={`${data.title || '—'} · ${data.subtitle || '—'}`} />
              <Row label="Date" value={data.date ? new Date(data.date).toDateString() : '—'} />
              <Row label="Venue" value={`${data.venue || '—'}, ${data.city || '—'}`} />
              <Row label="Template" value={template?.name || '—'} />
              <Row label="Palette" value={theme.name} />
              <Row label="Guests added" value={String(data.guests.length)} />
            </dl>
          </div>
          <div className="bg-white rounded-2xl border border-[#E9E1D8] p-5 space-y-4">
            <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide">Guest Gallery Settings</p>
            <Switch checked={data.allowGuestUploads} onChange={(v) => onChange({ allowGuestUploads: v })} label="Allow guest photo uploads" />
            <Switch checked={data.approvalRequired} onChange={(v) => onChange({ approvalRequired: v })} label="Require approval before photos appear" />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-3 text-center">Live Preview</p>
          <MiniPreview data={data} theme={theme} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-[#9A8F91]">{label}</dt>
      <dd className="text-[#241A1C] font-medium mt-0.5">{value}</dd>
    </div>
  );
}
