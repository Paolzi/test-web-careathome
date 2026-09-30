import React, { useState } from 'react';
import {
  HeartHandshake,
  Activity,
  LogOut,
  UserCheck,
  Shield,
  Stethoscope,
  Power,
  Menu,
  X,
  CreditCard,
  FileCheck2,
  Layers,
  Sparkles,
  Award,
  LogIn,
  UserPlus,
  Home,
  Users,
  ChevronDown,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Modal } from './Modal';
import { UserRole } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register', defaultRole?: UserRole) => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onGoHome,
}) => {
  const { currentUser, logout, toggleNurseOnline, users, switchUserById } = useCare();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
    if (onGoHome) onGoHome();
  };

  const patient = users.find((u) => u.email === 'pasien.hendra@gmail.com');
  const nurseVerified = users.find((u) => u.email === 'nurse.budi@homecare.id');
  const nursePending = users.find((u) => u.email === 'nurse.anita@homecare.id');
  const admin = users.find((u) => u.email === 'admin@homecare.id');

  const handleQuickSwitch = (userId: string, defaultTab: string) => {
    switchUserById(userId);
    setActiveTab(defaultTab);
    setRoleDropdownOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top UN SDG 3 Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 text-white text-[11px] sm:text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-bold tracking-wide">KOMITMEN UN SDG 3:</span>
              <span className="opacity-90 hidden sm:inline">
                Memastikan Kehidupan Sehat & Mendukung Kesejahteraan untuk Semua
              </span>
            </div>
            <div className="flex items-center gap-3 text-teal-100 text-[11px]">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-teal-300" /> 100% Nakes Ber-STR & SIP Sah
              </span>
              <span className="hidden md:inline">• Escrow Terproteksi 100%</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => {
                if (onGoHome) onGoHome();
                else setActiveTab('services');
              }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-500/20 ring-4 ring-teal-50">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    Home<span className="text-teal-600">Care</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-teal-100 text-teal-800 tracking-wider">
                    Medical
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Layanan Perawat Medis On-Demand
                </p>
              </div>
            </div>

            {/* Navigation for Logged In User */}
            {currentUser && (
              <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60">
                {currentUser.role === 'patient' && (
                  <>
                    <button
                      onClick={() => setActiveTab('services')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'services'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Stethoscope className="w-4 h-4" /> Katalog Tindakan
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'orders'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Activity className="w-4 h-4" /> Pesanan & E-Report Saya
                    </button>
                  </>
                )}

                {currentUser.role === 'nurse' && (
                  <>
                    <button
                      onClick={() => setActiveTab('feed')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'feed'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-teal-600" /> Order Masuk (Feed)
                    </button>
                    <button
                      onClick={() => setActiveTab('active-task')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'active-task'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Activity className="w-4 h-4" /> Tugas Kunjungan Aktif
                    </button>
                    <button
                      onClick={() => setActiveTab('wallet')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'wallet'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" /> Dompet & Komisi
                    </button>
                  </>
                )}

                {currentUser.role === 'admin' && (
                  <>
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'overview'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Activity className="w-4 h-4" /> Ikhtisar GMV
                    </button>
                    <button
                      onClick={() => setActiveTab('verification')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'verification'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" /> Audit STR/SIP
                    </button>
                    <button
                      onClick={() => setActiveTab('services-crud')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'services-crud'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Layers className="w-4 h-4" /> Master Layanan
                    </button>
                    <button
                      onClick={() => setActiveTab('escrow')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'escrow'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Shield className="w-4 h-4" /> Audit Escrow
                    </button>
                    <button
                      onClick={() => setActiveTab('payouts')}
                      className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                        activeTab === 'payouts'
                          ? 'bg-white text-teal-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <FileCheck2 className="w-4 h-4" /> Pencairan Nakes
                    </button>
                  </>
                )}
              </nav>
            )}

            {/* Right Action: When Logged In vs When on Landing Page */}
            <div className="flex items-center gap-2 sm:gap-3">
              {currentUser ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Clean In-Header Role Switcher Dropdown (NOT FLOATING!) */}
                  <div className="relative">
                    <button
                      onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
                      title="Ganti Persona Pengujian"
                    >
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                      <span>Simulasi Akun</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {roleDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in text-xs">
                        <div className="px-3 py-1.5 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                          Pilih Akun Demo (3 Peran)
                        </div>
                        {patient && (
                          <button
                            onClick={() => handleQuickSwitch(patient.id, 'services')}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                          >
                            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                            <div>
                              <div className="font-bold">{patient.name}</div>
                              <div className="text-[10px] text-slate-400">Pasien / Keluarga</div>
                            </div>
                          </button>
                        )}
                        {nurseVerified && (
                          <button
                            onClick={() => handleQuickSwitch(nurseVerified.id, 'feed')}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <div>
                              <div className="font-bold">{nurseVerified.name}</div>
                              <div className="text-[10px] text-slate-400">Perawat (Terverifikasi)</div>
                            </div>
                          </button>
                        )}
                        {nursePending && (
                          <button
                            onClick={() => handleQuickSwitch(nursePending.id, 'feed')}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <div>
                              <div className="font-bold">{nursePending.name}</div>
                              <div className="text-[10px] text-slate-400">Perawat (Pending)</div>
                            </div>
                          </button>
                        )}
                        {admin && (
                          <button
                            onClick={() => handleQuickSwitch(admin.id, 'overview')}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                          >
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            <div>
                              <div className="font-bold">{admin.name}</div>
                              <div className="text-[10px] text-slate-400">Admin & Finance</div>
                            </div>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Nurse Online / Offline Quick Toggle */}
                  {currentUser.role === 'nurse' && (
                    <button
                      onClick={() => toggleNurseOnline(currentUser.id)}
                      className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        currentUser.isOnline
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                      title="Ubah status kesiapan terima order"
                    >
                      <Power className={`w-3.5 h-3.5 ${currentUser.isOnline ? 'animate-pulse' : ''}`} />
                      <span>{currentUser.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                    </button>
                  )}

                  {/* Profile Chip */}
                  <div className="flex items-center gap-2.5 pl-2 py-1 bg-slate-50 border border-slate-200/80 rounded-full pr-3">
                    <img
                      src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/20"
                    />
                    <div className="text-left hidden sm:block">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[110px]">
                          {currentUser.name}
                        </span>
                        {currentUser.role === 'nurse' && currentUser.verificationStatus === 'APPROVED' && (
                          <span title="Terverifikasi">
                            <Award className="w-3.5 h-3.5 text-teal-600" />
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider block ${
                          currentUser.role === 'admin'
                            ? 'text-purple-600'
                            : currentUser.role === 'nurse'
                            ? 'text-teal-600'
                            : 'text-sky-600'
                        }`}
                      >
                        {currentUser.role === 'nurse'
                          ? `Perawat (${currentUser.verificationStatus === 'APPROVED' ? 'Aktif' : 'Pending'})`
                          : currentUser.role}
                      </span>
                    </div>
                  </div>

                  {/* Return to Landing Page icon */}
                  {onGoHome && (
                    <button
                      onClick={onGoHome}
                      className="p-2 text-slate-400 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors"
                      title="Kembali ke Beranda"
                    >
                      <Home className="w-5 h-5" />
                    </button>
                  )}

                  {/* Logout Icon */}
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Keluar Akun"
                    aria-label="Keluar Akun"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                /* Clear Landing Page Login and Register Buttons Directly in Navbar */
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-teal-600" />
                    <span>Masuk</span>
                  </button>

                  <button
                    onClick={() => onOpenAuth('register')}
                    className="px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Daftar Akun</span>
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 bg-white space-y-2">
            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold text-center"
                >
                  Masuk Akun
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold text-center"
                >
                  Daftar Baru
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {currentUser.role === 'patient' && (
                  <>
                    <button
                      onClick={() => {
                        setActiveTab('services');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Katalog Tindakan
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('orders');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Pesanan & E-Report Saya
                    </button>
                  </>
                )}

                {currentUser.role === 'nurse' && (
                  <>
                    <button
                      onClick={() => {
                        setActiveTab('feed');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Order Masuk (Feed)
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('active-task');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Tugas Kunjungan Aktif
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('wallet');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Dompet & Komisi
                    </button>
                  </>
                )}

                {currentUser.role === 'admin' && (
                  <>
                    <button
                      onClick={() => {
                        setActiveTab('overview');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Ikhtisar GMV
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('verification');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Audit STR/SIP
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('services-crud');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Master Layanan
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('escrow');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Audit Escrow
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('payouts');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700"
                    >
                      Pencairan Nakes
                    </button>
                  </>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{currentUser.name}</span>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="text-xs font-bold text-rose-600"
                  >
                    Keluar Akun
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Konfirmasi Keluar Akun"
        maxWidth="sm"
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
            <LogOut className="w-7 h-7" />
          </div>
          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin keluar dari sesi <strong>{currentUser?.name}</strong> dan kembali ke Beranda?
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleLogoutConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-xs transition-colors"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
