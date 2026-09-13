import React from 'react';
import { Link } from '../../lib/router';

export function MarketingFooter() {
  return (
    <footer className="bg-[#241A1C] text-white/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center font-serif text-xs">K</span>
            <span className="font-serif text-white text-base">Invite Klick</span>
          </div>
          <p className="text-xs leading-relaxed">Share. Grow together.</p>
        </div>
        <FooterCol title="Product" links={[['Features', '/features'], ['Templates', '/templates'], ['Pricing', '/pricing']]} />
        <FooterCol title="Help" links={[['Contact', '/contact'], ['FAQ', '/faq']]} />
        <FooterCol title="Company" links={[['About', '/about'], ['Careers', '/careers']]} />
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-white/40">© {new Date().getFullYear()} Invite Klick. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-3">{title}</p>
      <div className="space-y-2">
        {links.map(([label, to]) => (
          <Link key={label} to={to} className="block text-xs hover:text-white transition-colors">{label}</Link>
        ))}
      </div>
    </div>
  );
}
