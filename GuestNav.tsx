import React from 'react';
import { Link, useIsActive } from '../../lib/router';
import { IconHome, IconGallery, IconQR, IconMessage, IconUser } from '../icons';

const tabs = [
  { to: '/guest', label: 'Home', icon: IconHome, exact: true },
  { to: '/guest/gallery', label: 'Gallery', icon: IconGallery },
  { to: '/guest/qr', label: 'My QR', icon: IconQR },
  { to: '/guest/messages', label: 'Messages', icon: IconMessage },
  { to: '/guest/profile', label: 'Profile', icon: IconUser },
];

export function GuestBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E9E1D8] flex items-stretch max-w-md mx-auto sm:rounded-t-2xl sm:border-x">
      {tabs.map((t) => (
        <TabLink key={t.to} {...t} />
      ))}
    </nav>
  );
}

function TabLink({
  to,
  label,
  icon: Icon,
  exact,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  exact?: boolean;
}) {
  const active = useIsActive(to, exact);
  const isQR = to === '/guest/qr';
  return (
    <Link
      to={to}
      className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${active ? 'text-[#482337]' : 'text-[#9A8F91]'}`}
    >
      {isQR ? (
        <span className={`w-11 h-11 -mt-5 rounded-full flex items-center justify-center shadow-lg ${active ? 'bg-[#482337] text-white' : 'bg-[#241A1C] text-white'}`}>
          <Icon size={19} />
        </span>
      ) : (
        <Icon size={19} />
      )}
      {label}
    </Link>
  );
}
