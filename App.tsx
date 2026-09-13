import React from 'react';
import { RouterProvider, RouteSwitch, RouteDef } from './lib/router';
import { AppDataProvider } from './lib/store';
import { ToastProvider } from './components/ui/Toast';

import { Homepage } from './pages/marketing/Homepage';
import { FeaturesPage } from './pages/marketing/FeaturesPage';
import { TemplatesPage } from './pages/marketing/TemplatesPage';
import { PricingPage } from './pages/marketing/PricingPage';

import { Dashboard } from './pages/dashboard/Dashboard';
import { MyInvitations } from './pages/dashboard/MyInvitations';
import { NewInvitation } from './pages/dashboard/wizard/NewInvitation';
import { InvitationOverview } from './pages/dashboard/InvitationOverview';
import { InvitationEditor } from './pages/dashboard/InvitationEditor';
import { InvitationGuests } from './pages/dashboard/InvitationGuests';
import { InvitationSeating } from './pages/dashboard/InvitationSeating';
import { InvitationQR } from './pages/dashboard/InvitationQR';
import { InvitationAnalytics } from './pages/dashboard/InvitationAnalytics';
import { DashboardTemplates } from './pages/dashboard/DashboardTemplates';
import { DashboardMedia } from './pages/dashboard/DashboardMedia';
import { DashboardGuests } from './pages/dashboard/DashboardGuests';
import { DashboardMusic } from './pages/dashboard/DashboardMusic';
import { DashboardQR } from './pages/dashboard/DashboardQR';
import { DashboardSeating } from './pages/dashboard/DashboardSeating';
import { DashboardSettings } from './pages/dashboard/DashboardSettings';

import { GuestInvitation } from './pages/guest/GuestInvitation';
import { GuestRSVP } from './pages/guest/GuestRSVP';
import { GuestSchedule } from './pages/guest/GuestSchedule';
import { GuestGallery } from './pages/guest/GuestGallery';
import { GuestQR } from './pages/guest/GuestQR';
import { GuestDashboard } from './pages/guest/GuestDashboard';

import { EmptyState } from './components/ui/EmptyState';
import { IconMail } from './components/icons';

const routes: RouteDef[] = [
  { path: '/', render: () => <Homepage /> },
  { path: '/features', render: () => <FeaturesPage /> },
  { path: '/how-it-works', render: () => <FeaturesPage /> },
  { path: '/templates', render: () => <TemplatesPage /> },
  { path: '/pricing', render: () => <PricingPage /> },
  { path: '/login', render: () => <Dashboard /> },
  { path: '/signup', render: () => <Dashboard /> },

  { path: '/dashboard', render: () => <Dashboard /> },
  { path: '/dashboard/invitations', render: () => <MyInvitations /> },
  { path: '/dashboard/invitations/new', render: () => <NewInvitation /> },
  { path: '/dashboard/invitations/:id', render: (p) => <InvitationOverview id={p.id} /> },
  { path: '/dashboard/invitations/:id/edit', render: (p) => <InvitationEditor id={p.id} /> },
  { path: '/dashboard/invitations/:id/guests', render: (p) => <InvitationGuests id={p.id} /> },
  { path: '/dashboard/invitations/:id/seating', render: (p) => <InvitationSeating id={p.id} /> },
  { path: '/dashboard/invitations/:id/qr', render: (p) => <InvitationQR id={p.id} /> },
  { path: '/dashboard/invitations/:id/analytics', render: (p) => <InvitationAnalytics id={p.id} /> },
  { path: '/dashboard/templates', render: () => <DashboardTemplates /> },
  { path: '/dashboard/media', render: () => <DashboardMedia /> },
  { path: '/dashboard/guests', render: () => <DashboardGuests /> },
  { path: '/dashboard/music', render: () => <DashboardMusic /> },
  { path: '/dashboard/qr', render: () => <DashboardQR /> },
  { path: '/dashboard/seating', render: () => <DashboardSeating /> },
  { path: '/dashboard/settings', render: () => <DashboardSettings /> },

  { path: '/invite/:slug', render: (p) => <GuestInvitation slug={p.slug} /> },
  { path: '/invite/:slug/rsvp', render: (p) => <GuestRSVP slug={p.slug} /> },
  { path: '/invite/:slug/schedule', render: (p) => <GuestSchedule slug={p.slug} /> },
  { path: '/invite/:slug/gallery', render: (p) => <GuestGallery slug={p.slug} /> },
  { path: '/invite/:slug/qr', render: (p) => <GuestQR slug={p.slug} /> },

  { path: '/guest', render: () => <GuestDashboard /> },
  { path: '/guest/gallery', render: () => <GuestDashboard /> },
  { path: '/guest/qr', render: () => <GuestDashboard /> },
  { path: '/guest/messages', render: () => <GuestDashboard /> },
  { path: '/guest/profile', render: () => <GuestDashboard /> },
];

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8F5]">
      <EmptyState icon={<IconMail size={22} />} title="Page not found" description="Let's get you back to Invite Klick." />
    </div>
  );
}

function AppInner() {
  return <RouteSwitch routes={routes} notFound={<NotFound />} />;
}

function App() {
  return (
    <AppDataProvider>
      <ToastProvider>
        <RouterProvider>
          <AppInner />
        </RouterProvider>
      </ToastProvider>
    </AppDataProvider>
  );
}

export default App;
