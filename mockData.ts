import type {
  InvitationEvent,
  Guest,
  Template,
  User,
  ActivityLogItem,
} from '../types';
import { getThemeById } from '../theme/tokens';

export const currentUser: User = {
  id: 'u-david',
  name: 'David Addo',
  email: 'david@inviteklick.com',
  avatarInitials: 'DA',
  plan: 'Premium',
};

export const currentGuestUser = {
  id: 'g-john',
  name: 'John Mensah',
  initials: 'JM',
};

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------
export const templates: Template[] = [
  { id: 'tpl-editorial-blush', name: 'Editorial Blush', category: 'Romantic', tier: 'Free', gradient: ['#7A2E42', '#F1D9DD'] },
  { id: 'tpl-modern-mono', name: 'Modern Mono', category: 'Modern', tier: 'Free', gradient: ['#141414', '#B8B8B8'] },
  { id: 'tpl-classic-ivory', name: 'Classic Ivory', category: 'Classic', tier: 'Premium', gradient: ['#6F6467', '#EADFCF'] },
  { id: 'tpl-minimal-stone', name: 'Minimal Stone', category: 'Minimal', tier: 'Free', gradient: ['#5C5450', '#FFFFFF'] },
  { id: 'tpl-luxury-gold', name: 'Luxury Gold', category: 'Luxury', tier: 'Premium', gradient: ['#152447', '#C9A44C'] },
  { id: 'tpl-garden-sage', name: 'Garden Sage', category: 'Garden', tier: 'Free', gradient: ['#4B5D45', '#F1EBDD'] },
  { id: 'tpl-traditional-kente', name: 'Traditional Kente', category: 'Traditional', tier: 'Premium', gradient: ['#7A2E42', '#C9A44C'] },
  { id: 'tpl-editorial-noir', name: 'Editorial Noir', category: 'Editorial', tier: 'Premium', gradient: ['#241A1C', '#9A8F91'] },
];

// ---------------------------------------------------------------------------
// Helper to build guests quickly
// ---------------------------------------------------------------------------
let guestSeq = 0;
function makeGuest(eventId: string, partial: Partial<Guest> & { name: string }): Guest {
  guestSeq += 1;
  return {
    id: `g-${eventId}-${guestSeq}`,
    eventId,
    name: partial.name,
    email: partial.email,
    phone: partial.phone,
    group: partial.group || 'Family',
    partyAllowance: partial.partyAllowance ?? 2,
    rsvp: partial.rsvp || 'pending',
    mealPreference: partial.mealPreference,
    dietaryNotes: partial.dietaryNotes,
    tableId: partial.tableId,
    seat: partial.seat,
    accessType: partial.accessType || 'Standard',
    invitationToken: `${eventId}-${btoa(partial.name).replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toLowerCase()}`,
    checkedInAt: partial.checkedInAt,
  };
}

// ---------------------------------------------------------------------------
// EVENT 1 — David & Servaa (Wedding) — the flagship reference event
// ---------------------------------------------------------------------------
const davidServaaGuests: Guest[] = [
  makeGuest('david-servaa-wedding', { name: 'Ama Mensah', email: 'ama.mensah@gmail.com', phone: '+233 24 555 0142', group: 'Bride’s Family', partyAllowance: 2, rsvp: 'attending', mealPreference: 'Jollof & Chicken', tableId: 't1', seat: 1, accessType: 'VIP' }),
  makeGuest('david-servaa-wedding', { name: 'Kofi Boateng', email: 'kofi.b@gmail.com', phone: '+233 20 555 0187', group: 'Groom’s Friends', partyAllowance: 2, rsvp: 'attending', mealPreference: 'Waakye', tableId: 't1', seat: 2 }),
  makeGuest('david-servaa-wedding', { name: 'Nana Akua', email: 'nana.akua@gmail.com', group: 'Bride’s Family', partyAllowance: 1, rsvp: 'attending', tableId: 't2', seat: 1 }),
  makeGuest('david-servaa-wedding', { name: 'Yaw Owusu', email: 'yaw.owusu@gmail.com', group: 'Groom’s Family', partyAllowance: 2, rsvp: 'pending' }),
  makeGuest('david-servaa-wedding', { name: 'Efua Asante', group: 'Bride’s Friends', partyAllowance: 1, rsvp: 'declined' }),
  makeGuest('david-servaa-wedding', { name: 'Kwame Darko', email: 'kwame.d@gmail.com', group: 'Groom’s Friends', partyAllowance: 3, rsvp: 'attending', accessType: 'VIP', tableId: 't1', seat: 3 }),
  makeGuest('david-servaa-wedding', { name: 'Abena Serwaa', group: 'Bride’s Family', partyAllowance: 2, rsvp: 'checked-in', checkedInAt: '2026-12-19T15:58:00', tableId: 't2', seat: 2 }),
  makeGuest('david-servaa-wedding', { name: 'Kojo Mensah', group: 'Colleagues', partyAllowance: 1, rsvp: 'invited' }),
];

const davidServaaEvent: InvitationEvent = {
  id: 'david-servaa-wedding',
  slug: 'david-and-serwaa',
  occasion: 'wedding',
  title: 'David & Serwaa',
  subtitle: 'Wedding Celebration',
  date: '2026-12-19',
  time: '4:00 PM',
  venue: 'Aburi Botanical Gardens',
  address: 'Aburi-Mampong Road',
  city: 'Accra',
  country: 'Ghana',
  description:
    'Together with their families, David and Serwaa joyfully invite you to celebrate the beginning of their new journey together — an evening of love, laughter and dancing under the gardens.',
  dressCode: 'Traditional / Formal — Burgundy & Gold',
  contactName: 'Ama (Bridesmaid)',
  contactPhone: '+233 55 123 4567',
  coverGradient: ['#3C1A2A', '#7A2E42'],
  status: 'published',
  theme: getThemeById('romantic'),
  templateId: 'tpl-editorial-blush',
  quote: 'A beautiful chapter begins…',
  schedule: [
    { id: 's1', time: '2:00 PM', title: 'Guest Arrival', description: 'Welcome drinks on the garden lawn' },
    { id: 's2', time: '3:00 PM', title: 'Ceremony', description: 'Exchange of vows under the pergola' },
    { id: 's3', time: '5:00 PM', title: 'Reception', description: 'Cocktails and photos' },
    { id: 's4', time: '7:00 PM', title: 'Dinner & Dancing', description: 'Live band — Askua & Forever' },
  ],
  tables: [
    { id: 't1', name: 'Table 1 — VIP', capacity: 8, guestIds: [] },
    { id: 't2', name: 'Table 2', capacity: 10, guestIds: [] },
    { id: 't3', name: 'Table 3', capacity: 10, guestIds: [] },
  ],
  gallery: [
    { id: 'm1', eventId: 'david-servaa-wedding', category: 'Official', caption: 'Engagement shoot, Aburi Hills', uploadedBy: 'Studio Kente', gradient: ['#7A2E42', '#F1D9DD'] },
    { id: 'm2', eventId: 'david-servaa-wedding', category: 'Official', caption: 'Save the date', uploadedBy: 'Studio Kente', gradient: ['#482337', '#EADFCF'] },
    { id: 'm3', eventId: 'david-servaa-wedding', category: 'Guests', caption: 'Bridal shower', uploadedBy: 'Ama Mensah', gradient: ['#C9707E', '#F4EFE9'] },
    { id: 'm4', eventId: 'david-servaa-wedding', category: 'Guests', caption: 'Bachelor send-off', uploadedBy: 'Kofi Boateng', gradient: ['#5C2438', '#D9B8A9'] },
  ],
  musicTrackId: 'mt-1',
  activity: [
    { id: 'a1', eventId: 'david-servaa-wedding', message: 'New RSVP from Ama Mensah', timeAgo: '2 min ago', icon: 'rsvp' },
    { id: 'a2', eventId: 'david-servaa-wedding', message: 'Photo uploaded to David & Serwaa', timeAgo: '12 min ago', icon: 'photo' },
    { id: 'a3', eventId: 'david-servaa-wedding', message: 'Guest list updated', timeAgo: '25 min ago', icon: 'guest' },
    { id: 'a4', eventId: 'david-servaa-wedding', message: 'Invitation design changed', timeAgo: '1 hour ago', icon: 'design' },
  ],
  settings: { allowGuestUploads: true, approvalRequired: true, allowDownloads: true },
  stats: { totalGuests: 248, rsvpCount: 178 },
};

// ---------------------------------------------------------------------------
// EVENT 2 — Kofi & Ama (Engagement)
// ---------------------------------------------------------------------------
const kofiAmaGuests: Guest[] = [
  makeGuest('kofi-ama-engagement', { name: 'Esi Owusu', group: 'Family', partyAllowance: 2, rsvp: 'attending' }),
  makeGuest('kofi-ama-engagement', { name: 'Kwabena Fosu', group: 'Friends', partyAllowance: 1, rsvp: 'pending' }),
  makeGuest('kofi-ama-engagement', { name: 'Adjoa Boahen', group: 'Family', partyAllowance: 2, rsvp: 'attending' }),
];

const kofiAmaEvent: InvitationEvent = {
  id: 'kofi-ama-engagement',
  slug: 'kofi-and-ama',
  occasion: 'engagement',
  title: 'Kofi & Ama',
  subtitle: 'Engagement Ceremony',
  date: '2027-02-14',
  time: '1:00 PM',
  venue: 'Villa Monticello',
  address: 'Labone',
  city: 'Accra',
  country: 'Ghana',
  description: 'Kofi and Ama invite you to witness the knocking ceremony and celebrate their engagement with family and friends.',
  dressCode: 'Kente & Ankara encouraged',
  contactName: 'Ama’s Sister',
  contactPhone: '+233 24 987 6543',
  coverGradient: ['#8A3D63', '#F0883E'],
  status: 'published',
  theme: getThemeById('vibrant'),
  templateId: 'tpl-traditional-kente',
  quote: 'Two families, one love.',
  schedule: [
    { id: 's1', time: '12:30 PM', title: 'Guest Arrival' },
    { id: 's2', time: '1:00 PM', title: 'Knocking Ceremony' },
    { id: 's3', time: '3:00 PM', title: 'Reception & Lunch' },
  ],
  tables: [{ id: 't1', name: 'Table 1', capacity: 10, guestIds: [] }],
  gallery: [
    { id: 'm1', eventId: 'kofi-ama-engagement', category: 'Official', caption: 'Proposal day', uploadedBy: 'Studio Kente', gradient: ['#C23B6B', '#F0883E'] },
  ],
  musicTrackId: 'mt-4',
  activity: [
    { id: 'a1', eventId: 'kofi-ama-engagement', message: 'New RSVP from Esi Owusu', timeAgo: '3 hours ago', icon: 'rsvp' },
  ],
  settings: { allowGuestUploads: true, approvalRequired: false, allowDownloads: true },
  stats: { totalGuests: 120, rsvpCount: 84 },
};

// ---------------------------------------------------------------------------
// EVENT 3 — The Mensahs (25th Anniversary)
// ---------------------------------------------------------------------------
const mensahGuests: Guest[] = [
  makeGuest('mensah-anniversary', { name: 'John Mensah', email: 'john.mensah@gmail.com', group: 'Family', partyAllowance: 2, rsvp: 'attending', accessType: 'VIP', tableId: 't1', seat: 5 }),
  makeGuest('mensah-anniversary', { name: 'Grace Mensah', group: 'Family', partyAllowance: 2, rsvp: 'attending' }),
];

const mensahEvent: InvitationEvent = {
  id: 'mensah-anniversary',
  slug: 'the-mensahs-25th',
  occasion: 'anniversary',
  title: 'The Mensahs',
  subtitle: '25th Wedding Anniversary',
  date: '2027-03-12',
  time: '5:00 PM',
  venue: 'Golden Tulip Hotel',
  address: 'Liberation Road',
  city: 'Accra',
  country: 'Ghana',
  description: 'Join us as we celebrate twenty-five wonderful years of marriage — an evening of gratitude, gold, and good company.',
  dressCode: 'Gold & Ivory',
  contactName: 'Grace Mensah',
  contactPhone: '+233 27 456 1230',
  coverGradient: ['#152447', '#C9A44C'],
  status: 'published',
  theme: getThemeById('royal'),
  templateId: 'tpl-luxury-gold',
  quote: 'Twenty-five years, one beautiful story.',
  schedule: [
    { id: 's1', time: '4:30 PM', title: 'Guest Arrival' },
    { id: 's2', time: '5:00 PM', title: 'Renewal of Vows' },
    { id: 's3', time: '6:30 PM', title: 'Dinner & Toasts' },
    { id: 's4', time: '8:30 PM', title: 'Dancing' },
  ],
  tables: [{ id: 't1', name: 'Table 1 — Family', capacity: 8, guestIds: [] }],
  gallery: [
    { id: 'm1', eventId: 'mensah-anniversary', category: 'Official', caption: 'Then & now', uploadedBy: 'Studio Kente', gradient: ['#152447', '#C9A44C'] },
  ],
  musicTrackId: 'mt-3',
  activity: [
    { id: 'a1', eventId: 'mensah-anniversary', message: 'RSVP confirmed from John Mensah', timeAgo: '1 day ago', icon: 'rsvp' },
  ],
  settings: { allowGuestUploads: false, approvalRequired: true, allowDownloads: false },
  stats: { totalGuests: 80, rsvpCount: 56 },
};

// ---------------------------------------------------------------------------
// Additional lighter-weight events to round out the dashboard numbers
// ---------------------------------------------------------------------------
function lightEvent(
  id: string,
  slug: string,
  occasion: InvitationEvent['occasion'],
  title: string,
  subtitle: string,
  date: string,
  themeId: string,
  templateId: string,
  totalGuests: number,
  rsvpCount: number,
  status: InvitationEvent['status'],
  gradient: [string, string],
): InvitationEvent {
  return {
    id,
    slug,
    occasion,
    title,
    subtitle,
    date,
    time: '4:00 PM',
    venue: 'Private Residence',
    address: 'East Legon',
    city: 'Accra',
    country: 'Ghana',
    description: `Join us to celebrate ${title}'s ${subtitle.toLowerCase()}.`,
    dressCode: 'Smart Casual',
    contactName: title.split(' ')[0],
    contactPhone: '+233 20 000 0000',
    coverGradient: gradient,
    status,
    theme: getThemeById(themeId),
    templateId,
    schedule: [
      { id: 's1', time: '4:00 PM', title: 'Guest Arrival' },
      { id: 's2', time: '5:00 PM', title: 'Celebration' },
    ],
    tables: [{ id: 't1', name: 'Table 1', capacity: 10, guestIds: [] }],
    gallery: [],
    activity: [],
    settings: { allowGuestUploads: true, approvalRequired: false, allowDownloads: true },
    stats: { totalGuests, rsvpCount },
  };
}

const additionalEvents: InvitationEvent[] = [
  lightEvent('adjei-reception', 'adjei-reception', 'reception', 'The Adjeis', 'Wedding Reception', '2026-10-24', 'garden', 'tpl-garden-sage', 150, 132, 'published', ['#4B5D45', '#F1EBDD']),
  lightEvent('linda-derek-wedding', 'linda-and-derek', 'wedding', 'Linda & Derek', 'Wedding', '2026-11-07', 'modern', 'tpl-modern-mono', 200, 140, 'published', ['#141414', '#B8B8B8']),
  lightEvent('naa-engagement', 'naa-engagement', 'engagement', 'Naa & Tetteh', 'Engagement', '2027-01-30', 'minimal', 'tpl-minimal-stone', 90, 21, 'draft', ['#5C5450', '#EFEAE4']),
  lightEvent('osei-anniversary', 'osei-10th', 'anniversary', 'The Oseis', '10th Anniversary', '2026-09-28', 'vibrant', 'tpl-editorial-noir', 100, 61, 'published', ['#C23B6B', '#7A4FC2']),
  lightEvent('boateng-wedding', 'boateng-wedding', 'wedding', 'Akosua & Yaw', 'Wedding', '2027-04-17', 'royal', 'tpl-luxury-gold', 260, 5, 'draft', ['#152447', '#C9A44C']),
];

export const events: InvitationEvent[] = [davidServaaEvent, kofiAmaEvent, mensahEvent, ...additionalEvents];

export const guestsByEvent: Record<string, Guest[]> = {
  'david-servaa-wedding': davidServaaGuests,
  'kofi-ama-engagement': kofiAmaGuests,
  'mensah-anniversary': mensahGuests,
};

export function getEventBySlug(slug: string): InvitationEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventById(id: string): InvitationEvent | undefined {
  return events.find((e) => e.id === id);
}

export function getGuests(eventId: string): Guest[] {
  return guestsByEvent[eventId] || [];
}

// ---------------------------------------------------------------------------
// Music library
// ---------------------------------------------------------------------------
export const musicLibrary: import('../types').MusicTrack[] = [
  { id: 'mt-1', title: 'Asaase & Forever', artist: 'Kwame Duo', duration: '3:42', category: 'Romantic' },
  { id: 'mt-2', title: 'Golden Hour', artist: 'Nana Fofie', duration: '4:01', category: 'Romantic' },
  { id: 'mt-3', title: 'Twenty Five Years', artist: 'Highlife Kings', duration: '3:15', category: 'Highlife' },
  { id: 'mt-4', title: 'Ama Special', artist: 'DJ Blaze', duration: '3:58', category: 'Afrobeats' },
  { id: 'mt-5', title: 'String Quartet No. 4', artist: 'Accra Philharmonic', duration: '5:12', category: 'Classical' },
  { id: 'mt-6', title: 'Dance the Night', artist: 'Kojo & The Band', duration: '3:29', category: 'Upbeat' },
];

// ---------------------------------------------------------------------------
// Dashboard aggregate metrics (derived, but pinned to match reference numbers)
// ---------------------------------------------------------------------------
export const dashboardMetrics = {
  totalInvitations: 12,
  totalGuests: 1248,
  totalRSVPs: 892,
  rsvpRate: 72,
  upcomingEvents: 6,
};

export const recentActivity: ActivityLogItem[] = [
  { id: 'ra1', eventId: 'david-servaa-wedding', message: 'New RSVP from Ama Mensah', timeAgo: '2 min ago', icon: 'rsvp' },
  { id: 'ra2', eventId: 'david-servaa-wedding', message: 'Photo uploaded to David & Serwaa', timeAgo: '12 min ago', icon: 'photo' },
  { id: 'ra3', eventId: 'david-servaa-wedding', message: 'Guest list updated', timeAgo: '25 min ago', icon: 'guest' },
  { id: 'ra4', eventId: 'kofi-ama-engagement', message: 'Invitation design changed', timeAgo: '1 hour ago', icon: 'design' },
];
