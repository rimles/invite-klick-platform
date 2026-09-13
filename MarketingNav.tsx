import React from 'react';
import { Link, useIsActive } from '../../lib/router';
import { Button } from '../ui/Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/templates', label: 'Templates' },
  { to: '/pricing', label: 'Pricing' },
];

export function MarketingNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F5]/90 backdrop-blur-md border-b border-[#E9E1D8]/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#482337] text-white flex items-center justify-center font-serif text-sm">K</span>
          <span className="font-serif text-lg text-[#241A1C]">Invite Klick</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/dashboard" className="text-sm font-medium text-[#241A1C] hover:text-[#482337] px-3 py-2">Sign In</Link>
          <Link to="/dashboard/invitations/new">
            <Button size="sm">Create Invitation</Button>
          </Link>
        </div>
        <button className="lg:hidden w-9 h-9 flex items-center justify-center" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-[#241A1C] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#241A1C] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#241A1C] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#E9E1D8] bg-[#FBF8F5] px-5 py-4 space-y-1 animate-[fadeIn_150ms_ease-out]">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-[#241A1C]">
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm font-medium text-center py-2.5 rounded-xl border border-[#E9E1D8]">Sign In</Link>
            <Link to="/dashboard/invitations/new" onClick={() => setOpen(false)} className="text-sm font-medium text-center py-2.5 rounded-xl bg-[#482337] text-white">Create Invitation</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const active = useIsActive(to, true);
  return (
    <Link to={to} className={`text-sm font-medium transition-colors ${active ? 'text-[#482337]' : 'text-[#6F6467] hover:text-[#241A1C]'}`}>
      {label}
    </Link>
  );
}
