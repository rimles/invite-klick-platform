import React from 'react';
import { IconX } from '../icons';

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  if (!open) return null;
  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#241A1C]/40 backdrop-blur-[2px] animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />
      <div className={`relative w-full ${widths[size]} bg-white rounded-2xl shadow-xl border border-[#E9E1D8] p-6 animate-[modalIn_220ms_ease-out] max-h-[85vh] overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl text-[#241A1C]">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6467] hover:bg-[#F4EFE9]">
              <IconX size={18} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-[#241A1C]/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl border-l border-[#E9E1D8] p-6 overflow-y-auto transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {title && (
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl text-[#241A1C]">{title}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#6F6467] hover:bg-[#F4EFE9]">
              <IconX size={18} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
