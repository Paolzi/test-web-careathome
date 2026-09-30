import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import { useCare } from '../../context/CareContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCare();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-sky-500 shrink-0" />;
        let borderClass = 'border-sky-200 bg-sky-50/95 text-sky-900';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
          borderClass = 'border-emerald-200 bg-emerald-50/95 text-emerald-950';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
          borderClass = 'border-amber-200 bg-amber-50/95 text-amber-950';
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
          borderClass = 'border-rose-200 bg-rose-50/95 text-rose-950';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-tight">{toast.title}</h4>
              <p className="text-xs mt-0.5 opacity-90 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 transition-colors shrink-0"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
