import React from 'react';
import { Link, useIsActive } from '../../lib/router';
import { currentUser } from '../../data/mockData';
import {
  IconGrid, IconMail, IconUsers, IconTemplates, IconImage, IconMusic,
  IconQR, IconSeat, IconChart, IconSettings, IconLogout,
} from '../icons';

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: IconGrid, exact: true },
  { to: '/dashboard/invitations', label: 'My Invitations', icon: IconMail },
  { to: '/dashboard/guests', label: 'Guest Lists', icon: IconUsers },
  { to: '/dashboard/templates', label: 'Design Templates', icon: IconTemplates },
  { to: '/dashboard/media', label: 'Media Gallery', icon: IconImage },
  { to: '/dashboard/music', label: 'Music Library', icon: IconMusic },
  { to: '/dashboard/qr', label: 'QR & Check-in', icon: IconQR },
  { to: '/dashboard/seating', label: 'Seating Plan', icon: IconSeat },
  { to: '/dashboard/analytics', label: 'Analytics', icon: IconChart },
  { to: '/dashboard/settings', label: 'Settings', icon: IconSettings },
];

export function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={[
          'w-64 bg-white border-r border-[#E9E1D8] flex flex-col shrink-0 h-full',
          'fixed lg:sticky top-0 left-0 z-50 lg:z-0 transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="h-16 flex items-center gap-2 px-5 border-b border-[#E9E1D8]">
          <span className="w-8 h-8 rounded-lg bg-[#482337] text-white flex items-center justify-center font-serif text-sm">K</span>
          <span className="font-serif text-lg text-[#241A1C]">Invite Klick</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {nav.map((item) => (
            <SidebarLink key={item.to} {...item} onNavigate={onClose} />
          ))}
        </nav>
        <div className="p-3 border-t border-[#E9E1D8]">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4EFE9] transition-colors group">
            <span className="w-9 h-9 rounded-full bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center text-sm font-semibold shrink-0">
              {currentUser.avatarInitials}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#241A1C] truncate">{currentUser.name.split(' ')[0]}</p>
              <p className="text-xs text-[#9A8F91]">{currentUser.plan}</p>
            </div>
            <Link to="/" className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9A8F91] hover:text-[#241A1C]">
              <IconLogout size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  exact,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
  onNavigate?: () => void;
}) {
  const active = useIsActive(to, exact);
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={[
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150',
        active ? 'bg-[#482337] text-white' : 'text-[#6F6467] hover:bg-[#F4EFE9] hover:text-[#241A1C]',
      ].join(' ')}
    >
      <Icon size={17} />
      {label}
    </Link>
  );
}
