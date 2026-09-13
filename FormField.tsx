import React from 'react';

export function FormField({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[#241A1C] mb-1.5">
        {label}
        {required && <span className="text-[#7A2E42]"> *</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-[#9A8F91] mt-1.5">{hint}</span>}
    </label>
  );
}

const inputBase =
  'w-full rounded-xl border border-[#E9E1D8] bg-white px-3.5 py-2.5 text-sm text-[#241A1C] placeholder:text-[#9A8F91] outline-none transition-colors duration-150 focus:border-[#482337]/50 focus:ring-2 focus:ring-[#482337]/10';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input className={`${inputBase} ${className}`} {...rest} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props;
  return <textarea className={`${inputBase} resize-none ${className}`} {...rest} />;
}

export function Select({
  children,
  className = '',
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${inputBase} ${className}`} {...rest}>
      {children}
    </select>
  );
}

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      <span
        className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${checked ? 'bg-[#482337]' : 'bg-[#E9E1D8]'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </span>
      {label && <span className="text-sm text-[#241A1C]">{label}</span>}
    </button>
  );
}
