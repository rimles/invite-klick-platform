import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Button } from '../../components/ui/Button';
import { GuestRow } from '../../components/ui/GuestCard';
import { Modal } from '../../components/ui/Modal';
import { FormField, TextInput, Select } from '../../components/ui/FormField';
import { EmptyState } from '../../components/ui/EmptyState';
import { Tabs } from '../../components/ui/Tabs';
import { ComingSoon } from '../../components/ui/EmptyState';
import { useEvent, useGuests, useAppData } from '../../lib/store';
import { useToast } from '../../components/ui/Toast';
import { Link } from '../../lib/router';
import type { Guest, RSVPStatus } from '../../types';
import { IconPlus, IconUpload, IconUsers, IconChevronLeft, IconClipboard } from '../../components/icons';

const rsvpFilters: { id: RSVPStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'attending', label: 'Attending' },
  { id: 'pending', label: 'Pending' },
  { id: 'declined', label: 'Declined' },
  { id: 'checked-in', label: 'Checked In' },
];

export function InvitationGuests({ id }: { id: string }) {
  const event = useEvent(id);
  const guests = useGuests(id);
  const { addGuest, deleteGuest } = useAppData();
  const showToast = useToast();
  const [filter, setFilter] = React.useState<RSVPStatus | 'all'>('all');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [group, setGroup] = React.useState('Family');

  if (!event) {
    return (
      <CreatorShell>
        <p className="text-[#6F6467]">Invitation not found.</p>
      </CreatorShell>
    );
  }

  const filtered = filter === 'all' ? guests : guests.filter((g) => g.rsvp === filter);

  function submitGuest() {
    if (!name.trim()) return;
    const guest: Guest = {
      id: `g-${event!.id}-${Date.now()}`,
      eventId: event!.id,
      name: name.trim(),
      email: email.trim() || undefined,
      group,
      partyAllowance: 2,
      rsvp: 'invited',
      accessType: 'Standard',
      invitationToken: `${event!.id}-${Date.now()}`,
    };
    addGuest(event!.id, guest);
    showToast(`${guest.name} added to the guest list`);
    setName('');
    setEmail('');
    setModalOpen(false);
  }

  return (
    <CreatorShell>
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/dashboard/invitations/${event.id}`} className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E9E1D8] text-[#241A1C] hover:bg-[#F4EFE9]">
          <IconChevronLeft size={16} />
        </Link>
        <div className="flex-1">
          <h1 className="font-serif text-2xl text-[#241A1C]">{event.title} — Guests</h1>
          <p className="text-sm text-[#6F6467] mt-0.5">{guests.length} guests added</p>
        </div>
        <Button variant="outline" icon={<IconUpload size={15} />} onClick={() => showToast('Bulk upload is coming soon')}>Bulk Upload</Button>
        <Button icon={<IconPlus size={15} />} onClick={() => setModalOpen(true)}>Add Guest</Button>
      </div>

      <div className="mb-5">
        <Tabs tabs={rsvpFilters} active={filter} onChange={(v) => setFilter(v as RSVPStatus | 'all')} />
      </div>

      {filtered.length ? (
        <div className="bg-white rounded-2xl border border-[#E9E1D8] overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="text-left text-xs font-semibold text-[#9A8F91] uppercase tracking-wide border-b border-[#F0EAE3]">
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Group</th>
                <th className="py-3 px-4">RSVP</th>
                <th className="py-3 px-4">Seat</th>
                <th className="py-3 px-4">Access</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <GuestRow
                  key={g.id}
                  guest={g}
                  onQR={() => showToast(`QR pass ready for ${g.name}`)}
                  onEdit={() => showToast(`Editing ${g.name} — full editor coming soon`)}
                  onDelete={() => { deleteGuest(event.id, g.id); showToast(`${g.name} removed`); }}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={<IconUsers size={20} />} title="No guests in this view" description="Try a different filter or add a new guest." />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Guest">
        <div className="space-y-4">
          <FormField label="Name" required>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Guest name" />
          </FormField>
          <FormField label="Email">
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="guest@email.com" />
          </FormField>
          <FormField label="Group">
            <Select value={group} onChange={(e) => setGroup(e.target.value)}>
              <option>Family</option>
              <option>Friends</option>
              <option>Colleagues</option>
              <option>VIP</option>
            </Select>
          </FormField>
          <Button fullWidth onClick={submitGuest}>Add Guest</Button>
          <button
            className="w-full flex items-center justify-center gap-2 text-xs text-[#9A8F91] py-1"
            onClick={() => showToast('Guest link copied')}
          >
            <IconClipboard size={13} /> Copy shareable guest link instead
          </button>
        </div>
      </Modal>
    </CreatorShell>
  );
}
