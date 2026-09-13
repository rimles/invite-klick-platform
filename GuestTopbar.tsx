import React from 'react';
import { Link } from '../../lib/router';
import { IconChevronLeft } from '../icons';

export function GuestTopbar({ title, back }: { title?: string; back?: string }) {
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E9E1D8] h-14 flex items-center px-4 gap-3 max-w-md mx-auto sm:border-x">
      {back && (
        <Link to={back} className="w-8 h-8 rounded-full flex items-center justify-center text-[#241A1C] hover:bg-[#F4EFE9]">
          <IconChevronLeft size={18} />
        </Link>
      )}
      {title && <p className="font-serif text-base text-[#241A1C]">{title}</p>}
    </div>
  );
}
