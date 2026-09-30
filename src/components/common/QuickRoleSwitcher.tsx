import React, { useState } from 'react';
import {
  Users,
  RotateCcw,
  CheckCircle2,
  Clock,
  Shield,
  UserCheck,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';

export const QuickRoleSwitcher: React.FC<{ onTabChange?: (tab: string) => void }> = ({
  onTabChange,
}) => {
  const { currentUser, switchUserById, resetAllData, users } = useCare();
  const [isOpen, setIsOpen] = useState(true);

  // Identify specific key test personas
  const patient = users.find((u) => u.email === 'pasien.hendra@gmail.com');
  const nurseVerified = users.find((u) => u.email === 'nurse.budi@careathome.id');
  const nursePending = users.find((u) => u.email === 'nurse.anita@careathome.id');
  const admin = users.find((u) => u.email === 'admin@careathome.id');

  const handleSwitch = (userId: string, defaultTab: string) => {
    switchUserById(userId);
    if (onTabChange) {
      onTabChange(defaultTab);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 select-none">
      {/* Container with Glassmorphism */}
      <div className="bg-slate-900/90 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/80 p-3 max-w-md">
        <div className="flex items-center justify-between gap-3 pb-1 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-bold tracking-wide uppercase text-teal-400">
                Demo Role Switcher
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetAllData}
              title="Reset ke Seed Data Semula"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Reset database"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label={isOpen ? 'Tutup toolbar' : 'Buka toolbar'}
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-2.5 space-y-1.5 animate-fade-in">
            <p className="text-[11px] text-slate-400 mb-2">
              Klik persona di bawah untuk simulasi langsung tanpa login manual:
            </p>

            <div className="grid grid-cols-2 gap-1.5">
              {/* 1. Pasien Hendra */}
              {patient && (
                <button
                  onClick={() => handleSwitch(patient.id, 'services')}
                  className={`text-left p-2 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    currentUser?.id === patient.id
                      ? 'bg-teal-600/30 border-teal-500 text-white font-bold ring-1 ring-teal-500/50'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{patient.name}</div>
                    <div className="text-[10px] text-sky-400 font-medium">Pasien / Keluarga</div>
                  </div>
                </button>
              )}

              {/* 2. Perawat Ns. Budi (Verified) */}
              {nurseVerified && (
                <button
                  onClick={() => handleSwitch(nurseVerified.id, 'feed')}
                  className={`text-left p-2 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    currentUser?.id === nurseVerified.id
                      ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/50'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{nurseVerified.name}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">Perawat (Verified)</div>
                  </div>
                </button>
              )}

              {/* 3. Perawat Ns. Anita (Pending) */}
              {nursePending && (
                <button
                  onClick={() => handleSwitch(nursePending.id, 'feed')}
                  className={`text-left p-2 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    currentUser?.id === nursePending.id
                      ? 'bg-amber-600/30 border-amber-500 text-white font-bold ring-1 ring-amber-500/50'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{nursePending.name}</div>
                    <div className="text-[10px] text-amber-400 font-medium">Perawat (Pending)</div>
                  </div>
                </button>
              )}

              {/* 4. Admin Siti Rahma */}
              {admin && (
                <button
                  onClick={() => handleSwitch(admin.id, 'overview')}
                  className={`text-left p-2 rounded-xl text-xs flex items-center gap-2 border transition-all ${
                    currentUser?.id === admin.id
                      ? 'bg-purple-600/30 border-purple-500 text-white font-bold ring-1 ring-purple-500/50'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{admin.name}</div>
                    <div className="text-[10px] text-purple-400 font-medium">Admin & Finance</div>
                  </div>
                </button>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
              <span>Aktif: <strong className="text-white">{currentUser ? currentUser.name : 'Tamu'}</strong></span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-teal-300">
                {currentUser ? currentUser.role.toUpperCase() : 'BELUM LOGIN'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
