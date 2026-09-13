import React from 'react';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#F4EFE9] text-[#482337] flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-xl text-[#241A1C]">{title}</h3>
      {description && <p className="text-sm text-[#6F6467] mt-2 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ComingSoon({ label = 'Coming Soon' }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F4EFE9] text-[#9A8F91] uppercase tracking-wide">
      {label}
    </span>
  );
}
