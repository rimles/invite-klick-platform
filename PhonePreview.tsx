import React from 'react';

export function PhonePreview({
  children,
  mode = 'phone',
}: {
  children: React.ReactNode;
  mode?: 'phone' | 'desktop';
}) {
  if (mode === 'desktop') {
    return (
      <div className="w-full max-w-xl mx-auto rounded-2xl border border-[#E9E1D8] bg-white shadow-xl overflow-hidden">
        <div className="h-8 bg-[#F4EFE9] flex items-center gap-1.5 px-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E3A0A6]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#EAD09A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#A6D3AC]" />
        </div>
        <div className="max-h-[560px] overflow-y-auto">{children}</div>
      </div>
    );
  }
  return (
    <div className="mx-auto" style={{ width: 300 }}>
      <div className="rounded-[2.5rem] border-[8px] border-[#241A1C] bg-[#241A1C] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#241A1C] rounded-b-2xl z-10" />
        <div className="h-[560px] overflow-y-auto bg-white rounded-[2rem]">{children}</div>
      </div>
    </div>
  );
}
