import React from 'react';
import { Link } from '../../lib/router';
import { IconBell, IconSearch, IconGrid } from '../icons';
import { currentUser } from '../../data/mockData';

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-[#E9E1D8] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button className="lg:hidden w-9 h-9 flex items-center justify-center text-[#241A1C]" onClick={onMenuClick} aria-label="Open menu">
          <IconGrid size={18} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-[#F4EFE9] rounded-xl px-3.5 py-2.5 flex-1">
          <IconSearch size={16} className="text-[#9A8F91]" />
          <input
            placeholder="Search invitations, guests, templates…"
            className="bg-transparent outline-none text-sm w-full placeholder:text-[#9A8F91]"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#6F6467] hover:bg-[#F4EFE9]">
          <IconBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C23B6B]" />
        </button>
        <Link to="/dashboard/settings" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-[#F1D9DD] text-[#7A2E42] flex items-center justify-center text-xs font-semibold">
            {currentUser.avatarInitials}
          </span>
          <span className="hidden sm:block text-sm font-medium text-[#241A1C]">{currentUser.name.split(' ')[0]}</span>
        </Link>
      </div>
    </header>
  );
}
