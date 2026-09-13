import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Card } from '../../components/ui/Card';
import { FormField, TextInput, Switch } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { Pill } from '../../components/ui/Badge';
import { currentUser } from '../../data/mockData';
import { useToast } from '../../components/ui/Toast';

export function DashboardSettings() {
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [notifRsvp, setNotifRsvp] = React.useState(true);
  const [notifPhoto, setNotifPhoto] = React.useState(true);
  const showToast = useToast();

  return (
    <CreatorShell>
      <div className="mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#241A1C]">Settings</h1>
        <p className="text-[#6F6467] mt-1 text-sm">Manage your account and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
        <Card>
          <div className="flex items-center gap-4 mb-5">
            <span className="w-14 h-14 rounded-full bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center text-lg font-semibold">
              {currentUser.avatarInitials}
            </span>
            <div>
              <p className="font-medium text-[#241A1C]">{currentUser.name}</p>
              <Pill tone="gold">{currentUser.plan}</Pill>
            </div>
          </div>
          <div className="space-y-4">
            <FormField label="Full name">
              <TextInput value={name} onChange={(e) => setName(e.target.value)} />
            </FormField>
            <FormField label="Email">
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormField>
            <Button onClick={() => showToast('Profile updated')}>Save Changes</Button>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Notifications</p>
          <div className="space-y-4">
            <Switch checked={notifRsvp} onChange={setNotifRsvp} label="Email me on new RSVPs" />
            <Switch checked={notifPhoto} onChange={setNotifPhoto} label="Email me on new guest photos" />
          </div>
          <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mt-7 mb-4">Plan</p>
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#FBF8F5]">
            <div>
              <p className="text-sm font-medium text-[#241A1C]">Premium</p>
              <p className="text-xs text-[#9A8F91]">Unlimited invitations & guests</p>
            </div>
            <Button size="sm" variant="outline">Manage</Button>
          </div>
        </Card>
      </div>
    </CreatorShell>
  );
}
