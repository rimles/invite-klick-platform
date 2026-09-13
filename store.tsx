import React from 'react';
import type { InvitationEvent, Guest, RSVPStatus } from '../types';
import { events, guestsByEvent } from '../data/mockData';

// (Local re-binding — kept as plain consts rather than import aliases so the
// zero-bundler preview build, which strips whole import lines textually,
// still has these names available at module scope.)
const seedEvents = events;
const seedGuests = guestsByEvent;

interface AppDataValue {
  events: InvitationEvent[];
  guestsByEvent: Record<string, Guest[]>;
  addInvitation: (event: InvitationEvent, guests?: Guest[]) => void;
  updateInvitation: (id: string, patch: Partial<InvitationEvent>) => void;
  addGuest: (eventId: string, guest: Guest) => void;
  updateGuest: (eventId: string, guestId: string, patch: Partial<Guest>) => void;
  deleteGuest: (eventId: string, guestId: string) => void;
  setGuestRSVP: (eventId: string, guestId: string, status: RSVPStatus) => void;
  checkInGuest: (eventId: string, guestId: string) => void;
}

const AppDataContext = React.createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = React.useState<InvitationEvent[]>(seedEvents);
  const [guestsByEvent, setGuestsByEvent] = React.useState<Record<string, Guest[]>>(seedGuests);

  const addInvitation = React.useCallback((event: InvitationEvent, guests: Guest[] = []) => {
    setEvents((prev) => [event, ...prev]);
    setGuestsByEvent((prev) => ({ ...prev, [event.id]: guests }));
  }, []);

  const updateInvitation = React.useCallback((id: string, patch: Partial<InvitationEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const addGuest = React.useCallback((eventId: string, guest: Guest) => {
    setGuestsByEvent((prev) => ({ ...prev, [eventId]: [...(prev[eventId] || []), guest] }));
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, stats: { ...e.stats, totalGuests: e.stats.totalGuests + 1 } } : e)),
    );
  }, []);

  const updateGuest = React.useCallback((eventId: string, guestId: string, patch: Partial<Guest>) => {
    setGuestsByEvent((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] || []).map((g) => (g.id === guestId ? { ...g, ...patch } : g)),
    }));
  }, []);

  const deleteGuest = React.useCallback((eventId: string, guestId: string) => {
    setGuestsByEvent((prev) => ({
      ...prev,
      [eventId]: (prev[eventId] || []).filter((g) => g.id !== guestId),
    }));
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, stats: { ...e.stats, totalGuests: Math.max(0, e.stats.totalGuests - 1) } } : e)),
    );
  }, []);

  const setGuestRSVP = React.useCallback((eventId: string, guestId: string, status: RSVPStatus) => {
    updateGuest(eventId, guestId, { rsvp: status });
    if (status === 'attending') {
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, stats: { ...e.stats, rsvpCount: e.stats.rsvpCount + 1 } } : e)),
      );
    }
  }, [updateGuest]);

  const checkInGuest = React.useCallback((eventId: string, guestId: string) => {
    updateGuest(eventId, guestId, { rsvp: 'checked-in', checkedInAt: new Date().toISOString() });
  }, [updateGuest]);

  const value = React.useMemo(
    () => ({ events, guestsByEvent, addInvitation, updateInvitation, addGuest, updateGuest, deleteGuest, setGuestRSVP, checkInGuest }),
    [events, guestsByEvent, addInvitation, updateInvitation, addGuest, updateGuest, deleteGuest, setGuestRSVP, checkInGuest],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = React.useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}

export function useEvent(idOrSlug: string) {
  const { events } = useAppData();
  return events.find((e) => e.id === idOrSlug || e.slug === idOrSlug);
}

export function useGuests(eventId: string) {
  const { guestsByEvent } = useAppData();
  return guestsByEvent[eventId] || [];
}
