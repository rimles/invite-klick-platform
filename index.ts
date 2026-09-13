// ============================================================================
// Invite Klick 2.0 — Domain Models
// Centralized TypeScript types for the whole application.
// ============================================================================

export type Occasion = 'wedding' | 'engagement' | 'anniversary' | 'reception';

export type RSVPStatus = 'invited' | 'pending' | 'attending' | 'declined' | 'checked-in';

export type InvitationStatus = 'draft' | 'published' | 'archived';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  plan: 'Free' | 'Premium';
}

export interface EventTheme {
  id: string;
  name: string;
  category: 'Romantic' | 'Garden' | 'Royal' | 'Modern' | 'Minimal' | 'Vibrant' | 'Custom';
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  swatchLabel: string; // e.g. "Burgundy / Champagne / Blush"
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  guestIds: string[];
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email?: string;
  phone?: string;
  group: string;
  partyAllowance: number;
  rsvp: RSVPStatus;
  mealPreference?: string;
  dietaryNotes?: string;
  messageToHost?: string;
  tableId?: string;
  seat?: number;
  accessType: 'Standard' | 'VIP';
  invitationToken: string;
  checkedInAt?: string;
}

export interface MediaItem {
  id: string;
  eventId: string;
  category: 'Official' | 'Guests';
  caption: string;
  uploadedBy: string;
  gradient: [string, string];
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: 'Romantic' | 'Upbeat' | 'Classical' | 'Afrobeats' | 'Highlife';
}

export interface ActivityLogItem {
  id: string;
  eventId: string;
  message: string;
  timeAgo: string;
  icon: 'rsvp' | 'photo' | 'guest' | 'design';
}

export interface InvitationEvent {
  id: string;
  slug: string;
  occasion: Occasion;
  title: string; // e.g. "David & Servaa"
  subtitle: string; // e.g. "Wedding"
  date: string; // ISO date
  time: string; // display time
  venue: string;
  address: string;
  city: string;
  country: string;
  description: string;
  dressCode?: string;
  contactName?: string;
  contactPhone?: string;
  coverGradient: [string, string];
  status: InvitationStatus;
  theme: EventTheme;
  templateId: string;
  quote?: string;
  schedule: ScheduleItem[];
  tables: Table[];
  gallery: MediaItem[];
  musicTrackId?: string;
  activity: ActivityLogItem[];
  settings: {
    allowGuestUploads: boolean;
    approvalRequired: boolean;
    allowDownloads: boolean;
  };
  stats: {
    totalGuests: number;
    rsvpCount: number;
  };
}

export interface Template {
  id: string;
  name: string;
  category: 'Romantic' | 'Modern' | 'Classic' | 'Minimal' | 'Luxury' | 'Garden' | 'Traditional' | 'Editorial';
  tier: 'Free' | 'Premium';
  gradient: [string, string];
}
