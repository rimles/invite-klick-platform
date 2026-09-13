import React from 'react';
import type { RSVPStatus, InvitationStatus } from '../../types';

const rsvpStyles: Record<RSVPStatus, string> = {
  invited: 'bg-[#F4EFE9] text-[#6F6467]',
  pending: 'bg-[#FCEFD9] text-[#8A6A2A]',
  attending: 'bg-[#E4F0E6] text-[#2F6B3F]',
  declined: 'bg-[#F6E6E6] text-[#9A4A4A]',
  'checked-in': 'bg-[#E3EAF6] text-[#33538A]',
};

const rsvpLabels: Record<RSVPStatus, string> = {
  invited: 'Invited',
  pending: 'Pending',
  attending: 'Attending',
  declined: 'Declined',
  'checked-in': 'Checked In',
};

export function StatusBadge({ status }: { status: RSVPStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${rsvpStyles[status]}`}>
      {rsvpLabels[status]}
    </span>
  );
}

const invitationStyles: Record<InvitationStatus, string> = {
  draft: 'bg-[#F4EFE9] text-[#6F6467]',
  published: 'bg-[#E4F0E6] text-[#2F6B3F]',
  archived: 'bg-[#F1F1F1] text-[#8C8480]',
};

export function InvitationStatusBadge({ status }: { status: InvitationStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${invitationStyles[status]}`}>
      {status}
    </span>
  );
}

export function Pill({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'gold';
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: 'bg-[#F4EFE9] text-[#6F6467]',
    accent: 'bg-[#F1D9DD] text-[#7A2E42]',
    gold: 'bg-[#EADFCF] text-[#8A6A2A]',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
