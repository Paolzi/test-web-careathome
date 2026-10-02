import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Eye,
  EyeOff,
  ExternalLink,
  Shield,
  User,
  Activity,
  CheckCircle2,
  FileText,
  CreditCard,
  HeartHandshake,
  Stethoscope,
  Maximize2,
  Minimize2,
  Info,
} from 'lucide-react';

export interface FigmaScreen {
  id: string;
  role: 'public' | 'patient' | 'nurse' | 'admin';
  roleLabel: string;
  category: string;
  title: string;
  subtitle: string;
  isModal?: boolean;
}

export const FIGMA_SCREENS: FigmaScreen[] = [
  // 1. Publik & Autentikasi
  {
    id: 'landing',
    role: 'public',
    roleLabel: 'Publik / Tamu',
    category: 'Publik & Auth',
    title: 'Landing Page Utama',
    subtitle: 'Hero, SDG 3, Layanan Klinis, Alur Escrow, & Testimoni',
  },
  {
    id: 'auth-login',
    role: 'public',
    roleLabel: 'Publik / Tamu',
    category: 'Publik & Auth',
    title: 'Modal Login (Multi-Role)',
    subtitle: 'Popup login cepat Pasien, Perawat, dan Admin',
    isModal: true,
  },
  {
    id: 'auth-register-patient',
    role: 'public',
    roleLabel: 'Publik / Tamu',
    category: 'Publik & Auth',
    title: 'Modal Registrasi Pasien',
    subtitle: 'Form pendaftaran pasien, alamat & kondisi khusus',
    isModal: true,
  },
  {
    id: 'auth-register-nurse',
    role: 'public',
    roleLabel: 'Publik / Tamu',
    category: 'Publik & Auth',
    title: 'Modal Registrasi Perawat',
    subtitle: 'Form pendaftaran nakes, STR, SIP & upload berkas legalitas',
    isModal: true,
  },

  // 2. Aktor Pasien
  {
    id: 'patient-services',
    role: 'patient',
    roleLabel: 'Pasien (Hendra Gunawan)',
    category: 'Role Pasien',
    title: 'Katalog Layanan Medis',
    subtitle: 'Daftar tindakan keperawatan, filter kategori & hero pasien',
  },
  {
    id: 'patient-booking',
    role: 'patient',
    roleLabel: 'Pasien (Hendra Gunawan)',
    category: 'Role Pasien',
    title: 'Modal Formulir Booking',
    subtitle: 'Pilih jadwal, jam, alamat rumah & catatan keluhan medis',
    isModal: true,
  },
  {
    id: 'patient-payment',
    role: 'patient',
    roleLabel: 'Pasien (Hendra Gunawan)',
    category: 'Role Pasien',
    title: 'Modal Pembayaran Escrow',
    subtitle: 'Pilihan VA BCA / QRIS & jaminan proteksi dana aman',
    isModal: true,
  },
  {
    id: 'patient-orders',
    role: 'patient',
    roleLabel: 'Pasien (Hendra Gunawan)',
    category: 'Role Pasien',
    title: 'Daftar Pesanan & Status Tracking',
    subtitle: 'Step tracker perjalanan nakes, status tindakan & riwayat',
  },
  {
    id: 'patient-ereport',
    role: 'patient',
    roleLabel: 'Pasien (Hendra Gunawan)',
    category: 'Role Pasien',
    title: 'Modal Hasil E-Report Medis',
    subtitle: 'Tanda vital (tensi, nadi, suhu), catatan medis & saran asuhan',
    isModal: true,
  },
  {
    id: 'patient-rating',
    role: 'patient',
    roleLabel: 'Pasien (Hendra Gunawan)',
    category: 'Role Pasien',
    title: 'Modal Beri Ulasan & Rating',
    subtitle: 'Bintang kepuasan, ulasan nakes & konfirmasi selesai tindakan',
    isModal: true,
  },

  // 3. Aktor Perawat
  {
    id: 'nurse-feed',
    role: 'nurse',
    roleLabel: 'Perawat (Ns. Budi Santoso)',
    category: 'Role Perawat',
    title: 'Feed Order Masuk (Penerimaan)',
    subtitle: 'Daftar pesanan baru masuk dari pasien & tombol terima order',
  },
  {
    id: 'nurse-active',
    role: 'nurse',
    roleLabel: 'Perawat (Ns. Budi Santoso)',
    category: 'Role Perawat',
    title: 'Tugas Kunjungan Aktif',
    subtitle: 'Tracking OTW nakes, mulai tindakan di rumah pasien & riwayat',
  },
  {
    id: 'nurse-ereport-form',
    role: 'nurse',
    roleLabel: 'Perawat (Ns. Budi Santoso)',
    category: 'Role Perawat',
    title: 'Modal Form Input E-Report',
    subtitle: 'Input tensi, denyut nadi, gula darah, & dokumentasi klinis',
    isModal: true,
  },
  {
    id: 'nurse-wallet',
    role: 'nurse',
    roleLabel: 'Perawat (Ns. Budi Santoso)',
    category: 'Role Perawat',
    title: 'Dompet Digital Nakes & Payout',
    subtitle: 'Saldo 85% bersih, escrow tertahan & form tarik saldo ke bank',
  },

  // 4. Aktor Admin
  {
    id: 'admin-overview',
    role: 'admin',
    roleLabel: 'Admin (Siti Rahma)',
    category: 'Role Admin',
    title: 'Dashboard Overview & KPI',
    subtitle: 'Total GMV, saldo rekening escrow, nakes aktif, & analitik',
  },
  {
    id: 'admin-verification',
    role: 'admin',
    roleLabel: 'Admin (Siti Rahma)',
    category: 'Role Admin',
    title: 'Audit STR & SIP Perawat',
    subtitle: 'Verifikasi legalitas nakes, preview berkas STR & persetujuan izin',
  },
  {
    id: 'admin-services',
    role: 'admin',
    roleLabel: 'Admin (Siti Rahma)',
    category: 'Role Admin',
    title: 'Manajemen Katalog Layanan (CRUD)',
    subtitle: 'Kelola daftar tarif, durasi, kategori & level keperawatan',
  },
  {
    id: 'admin-escrow',
    role: 'admin',
    roleLabel: 'Admin (Siti Rahma)',
    category: 'Role Admin',
    title: 'Monitoring Rekening Escrow',
    subtitle: 'Audit log rekening penampung bersama & safety guarantee',
  },
  {
    id: 'admin-payouts',
    role: 'admin',
    roleLabel: 'Admin (Siti Rahma)',
    category: 'Role Admin',
    title: 'Manajemen Pencairan Dana (Payout)',
    subtitle: 'Approval transfer saldo nakes, input referensi bank BCA',
  },
];

interface FigmaSnapshotNavigatorProps {
  currentScreenId: string;
  onSelectScreen: (screenId: string) => void;
}

export const FigmaSnapshotNavigator: React.FC<FigmaSnapshotNavigatorProps> = ({
  currentScreenId,
  onSelectScreen,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [isHiddenTemporarily, setIsHiddenTemporarily] = useState<boolean>(false);

  const currentIndex = FIGMA_SCREENS.findIndex((s) => s.id === currentScreenId);
  const currentScreen = FIGMA_SCREENS[currentIndex] || FIGMA_SCREENS[0];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + FIGMA_SCREENS.length) % FIGMA_SCREENS.length;
    onSelectScreen(FIGMA_SCREENS[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % FIGMA_SCREENS.length;
    onSelectScreen(FIGMA_SCREENS[nextIdx].id);
  };

  const categories = ['Semua', 'Publik & Auth', 'Role Pasien', 'Role Perawat', 'Role Admin'];

  const filteredScreens =
    activeCategory === 'Semua'
      ? FIGMA_SCREENS
      : FIGMA_SCREENS.filter((s) => s.category === activeCategory);

  // Temporary hide helper so user can take a clean screenshot without toolbars if needed
  const hideForFiveSeconds = () => {
    setIsHiddenTemporarily(true);
    setTimeout(() => {
      setIsHiddenTemporarily(false);
    }, 6000);
  };

  if (isHiddenTemporarily) {
    return null;
  }

  // Role Badge Styling
  const getRoleBadgeStyle = (role: FigmaScreen['role']) => {
    switch (role) {
      case 'public':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'patient':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'nurse':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <aside
      aria-label="Figma Snapshot Navigator"
      data-html2design-ignore="true"
      data-h2d-ignore="true"
      className="fixed bottom-3 right-3 sm:right-6 z-[9999] max-w-[95vw] sm:max-w-xl font-sans print:hidden select-none transition-all duration-300"
    >
      {!isExpanded ? (
        /* Collapsed Floating Pill */
        <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-slate-700/80 ring-2 ring-teal-500/30">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Figma Navigator ({currentIndex + 1}/19)</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              title="Layar Sebelumnya"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold px-1.5 text-teal-300">
              {currentIndex + 1}/19
            </span>
            <button
              onClick={handleNext}
              title="Layar Berikutnya"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(true)}
            className="p-1.5 text-slate-400 hover:text-white cursor-pointer ml-1"
            title="Perbesar Menu"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Expanded Full Navigator Card */
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-300/80 ring-4 ring-teal-500/10 overflow-hidden text-slate-900 transition-all">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center font-black shadow-sm">
                🎨
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xs sm:text-sm tracking-tight text-white">
                    Figma Snapshot Navigator
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    19 Layar Lengkap
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  Import seluruh halaman & modal per aktor ke Figma via html.to.design
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={hideForFiveSeconds}
                title="Sembunyikan navigator selama 5 detik untuk screenshot bersih"
                className="px-2 py-1 rounded-lg text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer border border-slate-700"
              >
                <EyeOff className="w-3 h-3" />
                <span className="hidden sm:inline">Hide 5s</span>
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                title="Minimize toolbar"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Screen Information Banner */}
          <div className="p-3 bg-gradient-to-r from-teal-50/90 via-cyan-50/70 to-emerald-50/90 border-b border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div className="flex items-start sm:items-center gap-2">
              <span className="font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md text-[11px] shrink-0">
                Layar {currentIndex + 1} / 19
              </span>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getRoleBadgeStyle(
                      currentScreen.role
                    )}`}
                  >
                    {currentScreen.roleLabel}
                  </span>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {currentScreen.title}
                  </span>
                  {currentScreen.isModal && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      MODAL / POPUP
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{currentScreen.subtitle}</p>
              </div>
            </div>

            {/* Quick Step Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                onClick={handlePrev}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer transition-all active:scale-95"
              >
                <span>Next Layar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-3 pt-2.5 pb-1 flex items-center gap-1 overflow-x-auto border-b border-slate-100 text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Screen List Chips */}
          <div className="p-3 max-h-48 overflow-y-auto space-y-1.5">
            {filteredScreens.map((screen) => {
              const isSelected = screen.id === currentScreenId;
              const globalIdx = FIGMA_SCREENS.findIndex((s) => s.id === screen.id) + 1;
              return (
                <button
                  key={screen.id}
                  onClick={() => onSelectScreen(screen.id)}
                  className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500/10 border-teal-500 text-teal-950 font-bold ring-2 ring-teal-500/20'
                      : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {globalIdx}
                    </span>
                    <span className="truncate">{screen.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getRoleBadgeStyle(
                        screen.role
                      )}`}
                    >
                      {screen.role.toUpperCase()}
                    </span>
                    {screen.isModal && (
                      <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-amber-100 text-amber-800">
                        Popup
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Helper Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-teal-700 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>
                <strong>Cara Cepat:</strong> Klik <strong>Next Layar</strong> &rarr; Klik ekstensi <strong>html.to.design</strong> di Chrome. Ulangi!
              </span>
            </div>

            <div className="text-[10px] text-slate-400 font-mono">
              Auto-Ignore Enabled
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
