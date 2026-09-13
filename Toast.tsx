import React from 'react';
import { IconCheck } from '../icons';

export interface ToastMessage {
  id: number;
  text: string;
}

const ToastContext = React.createContext<{ show: (text: string) => void }>({ show: () => {} });

export function useToast() {
  return React.useContext(ToastContext).show;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const show = React.useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-2 bg-[#241A1C] text-white text-sm px-4 py-2.5 rounded-full shadow-lg animate-[toastIn_220ms_ease-out]"
          >
            <IconCheck size={16} className="text-[#9FD9A8]" />
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
