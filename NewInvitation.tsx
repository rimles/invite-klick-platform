import React from 'react';
import { CreatorShell } from '../../../components/creator/CreatorShell';
import { Stepper } from '../../../components/ui/Tabs';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from '../../../lib/router';
import { useAppData } from '../../../lib/store';
import { getThemeById } from '../../../theme/tokens';
import type { InvitationEvent, Guest } from '../../../types';
import {
  OccasionStep, DetailsStep, DesignStep, GuestsStep, PublishStep, WizardData,
} from './WizardSteps';
import { IconChevronLeft, IconChevronRight, IconCheck } from '../../../components/icons';
import { useToast } from '../../../components/ui/Toast';

const steps = ['Occasion', 'Event Details', 'Design', 'Guests', 'Publish'];

const initialData: WizardData = {
  occasion: 'wedding',
  title: '',
  subtitle: 'Wedding Celebration',
  date: '',
  time: '16:00',
  endTime: '22:00',
  venue: '',
  address: '',
  city: 'Accra, Ghana',
  description: '',
  dressCode: '',
  contactName: '',
  contactPhone: '',
  templateId: 'tpl-editorial-blush',
  themeId: 'romantic',
  guests: [],
  allowGuestUploads: true,
  approvalRequired: false,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'new-event';
}

export function NewInvitation() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<WizardData>(initialData);
  const navigate = useNavigate();
  const { addInvitation } = useAppData();
  const showToast = useToast();

  function patch(p: Partial<WizardData>) {
    setData((d) => ({ ...d, ...p }));
  }

  function canAdvance() {
    if (step === 1) return Boolean(data.title && data.date && data.venue);
    return true;
  }

  function publish() {
    const id = `${slugify(data.title)}-${Date.now().toString(36).slice(-4)}`;
    const theme = getThemeById(data.themeId);
    const guests: Guest[] = data.guests.map((g, i) => ({
      id: `g-${id}-${i}`,
      eventId: id,
      name: g.name,
      email: g.email || undefined,
      group: g.group,
      partyAllowance: 2,
      rsvp: 'invited',
      accessType: 'Standard',
      invitationToken: `${id}-${i}`,
    }));
    const event: InvitationEvent = {
      id,
      slug: slugify(data.title),
      occasion: data.occasion,
      title: data.title || 'Untitled Event',
      subtitle: data.subtitle,
      date: data.date || new Date().toISOString().slice(0, 10),
      time: data.time,
      venue: data.venue,
      address: data.address,
      city: data.city.split(',')[0]?.trim() || data.city,
      country: data.city.split(',')[1]?.trim() || 'Ghana',
      description: data.description || `Join us to celebrate ${data.title}.`,
      dressCode: data.dressCode,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      coverGradient: [theme.primary, theme.accent],
      status: 'published',
      theme,
      templateId: data.templateId,
      quote: 'A beautiful chapter begins…',
      schedule: [
        { id: 's1', time: data.time, title: 'Guest Arrival' },
        { id: 's2', time: data.endTime, title: 'Celebration' },
      ],
      tables: [{ id: 't1', name: 'Table 1', capacity: 10, guestIds: [] }],
      gallery: [],
      activity: [{ id: 'a1', eventId: id, message: 'Invitation published', timeAgo: 'just now', icon: 'design' }],
      settings: { allowGuestUploads: data.allowGuestUploads, approvalRequired: data.approvalRequired, allowDownloads: true },
      stats: { totalGuests: guests.length, rsvpCount: 0 },
    };
    addInvitation(event, guests);
    showToast('Invitation published successfully');
    navigate(`/dashboard/invitations/${id}`);
  }

  return (
    <CreatorShell>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Stepper steps={steps} activeIndex={step} onStepClick={setStep} />
        </div>
        <div className="bg-white rounded-2xl border border-[#E9E1D8] p-6 sm:p-8">
          {step === 0 && <OccasionStep data={data} onChange={patch} />}
          {step === 1 && <DetailsStep data={data} onChange={patch} />}
          {step === 2 && <DesignStep data={data} onChange={patch} />}
          {step === 3 && <GuestsStep data={data} onChange={patch} />}
          {step === 4 && <PublishStep data={data} onChange={patch} />}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E9E1D8]">
            <Button variant="ghost" icon={<IconChevronLeft size={16} />} disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button iconRight={<IconChevronRight size={16} />} disabled={!canAdvance()} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
                Continue
              </Button>
            ) : (
              <Button icon={<IconCheck size={16} />} onClick={publish}>
                Publish Invitation
              </Button>
            )}
          </div>
        </div>
      </div>
    </CreatorShell>
  );
}
