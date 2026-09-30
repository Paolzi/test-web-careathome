import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Award,
  Clock,
  Activity,
  CheckCircle2,
  Stethoscope,
  Users,
  Shield,
  CreditCard,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  LogIn,
  UserPlus,
  Heart,
  Thermometer,
  Droplet,
  ChevronRight,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { MedicalService, UserRole } from '../../types';
import { ServiceCatalog } from '../patient/ServiceCatalog';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register', defaultRole?: UserRole) => void;
  onSelectService: (service: MedicalService) => void;
  onSelectDemoRole: (userId: string, defaultTab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onSelectService,
  onSelectDemoRole,
}) => {
  const { users, services, metrics } = useCare();

  // Test accounts
  const patient = users.find((u) => u.email === 'pasien.hendra@gmail.com');
  const nurseVerified = users.find((u) => u.email === 'nurse.budi@homecare.id');
  const nursePending = users.find((u) => u.email === 'nurse.anita@homecare.id');
  const admin = users.find((u) => u.email === 'admin@homecare.id');

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDemo = () => {
    const el = document.getElementById('demo-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-950 text-white p-6 sm:p-12 lg:p-16 shadow-2xl">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          {/* SDG 3 Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            <span>DUKUNGAN UN SDG 3: GOOD HEALTH AND WELL-BEING</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Layanan Perawat Medis Homecare Datang Langsung ke Rumah Anda
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-teal-100/90 leading-relaxed max-w-3xl">
            Platform on-demand terintegrasi yang menghubungkan pasien dan keluarga dengan perawat profesional bersertifikat <strong>STR & SIP resmi</strong>. Seluruh transaksi terlindungi sistem rekening penampung (Escrow) dengan dokumentasi <strong>E-Report asuhan keperawatan</strong> digital.
          </p>

          {/* Action Buttons Right on the Hero */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={scrollToCatalog}
              className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Pesan Perawat Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenAuth('login', 'patient')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-teal-300" />
              <span>Masuk ke Akun</span>
            </button>

            <button
              onClick={() => onOpenAuth('register', 'nurse')}
              className="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-teal-200 font-bold text-sm border border-teal-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-teal-400" />
              <span>Gabung Jadi Nakes HomeCare</span>
            </button>
          </div>

          {/* Clinical Trust Badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="block text-white">STR & SIP Sah</strong>
                <span className="text-teal-200 text-[10px]">100% Nakes Berizin</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-white">Garansi Escrow</strong>
                <span className="text-teal-200 text-[10px]">Dana Aman 100%</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <strong className="block text-white">E-Report Digital</strong>
                <span className="text-teal-200 text-[10px]">Rekam Asuhan Medis</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-teal-300 shrink-0" />
              <div>
                <strong className="block text-white">Honor Adil 85%</strong>
                <span className="text-teal-200 text-[10px]">Transparan untuk Nakes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTEGRATED IN-PAGE DEMO ROLE ACCOUNTS SECTION ================= */}
      <section
        id="demo-section"
        className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Panel Uji Coba Terpadu (In-Page 1-Click Demo)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Coba Langsung Akses 3 Peran Sistem HomeCare
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Klik salah satu persona di bawah ini untuk simulasi instan tanpa perlu mengetik kredensial login:
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Semua data tersimpan otomatis di LocalStorage</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: Pasien Demo */}
          {patient && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{patient.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-sky-100 text-sky-800">
                    PASIEN
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Pesan perawat, bayar ke rekening escrow, pantau jadwal kunjungan, lihat lembar E-Report vital signs, dan beri ulasan 5-bintang.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => onSelectDemoRole(patient.id, 'services')}
                  className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Masuk Sebagai Pasien</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Perawat Terverifikasi */}
          {nurseVerified && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{nurseVerified.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                    NAKES AKTIF
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  STR & SIP terverifikasi. Toggle status Online, terima order kunjungan (85% komisi), ubah En Route & In Progress, lalu isi E-Report.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => onSelectDemoRole(nurseVerified.id, 'feed')}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Masuk Sebagai Nakes Aktif</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Perawat Pending */}
          {nursePending && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{nursePending.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800">
                    PENDING
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Simulasi perawat pendaftar baru. Menampilkan banner audit STR/SIP dan pembatasan order sebelum disetujui Admin.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => onSelectDemoRole(nursePending.id, 'feed')}
                  className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Masuk Perawat Pending</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Admin Operasional */}
          {admin && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{admin.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800">
                    ADMIN & FINANCE
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Pantau total GMV & profit platform, audit dokumen STR/SIP perawat, kelola master layanan medis, dan transfer persetujuan payout.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200">
                <button
                  onClick={() => onSelectDemoRole(admin.id, 'overview')}
                  className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Masuk Sebagai Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= 3 PILAR SOLUSI HOMECARE ================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            Ekosistem Pelayanan Medis Komprehensif
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Menghubungkan Pasien, Perawat, dan Standar Klinis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            HomeCare dirancang untuk memenuhi pilar kesehatan berkelanjutan melalui transparansi finansial dan kepatuhan hukum medis di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilar 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              1. Pasien & Keluarga
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Dapatkan perawatan luka, infus, atau fisioterapi langsung di kenyamanan kamar tidur tanpa antre panjang di faskes. Transparansi tarif tindakan + biaya aplikasi Rp 5.000 flat.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Nakes terverifikasi resmi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Dana aman di rekening escrow</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>E-Report asuhan medis digital</span>
              </li>
            </ul>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              2. Perawat Profesional (Nakes)
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Jadwal fleksibel dengan sistem bagi hasil adil. Perawat menerima <strong>85% tarif tindakan</strong> secara utuh yang otomatis masuk ke saldo dompet saat E-Report dikirim.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Honor 85% transparan tanpa potongan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Toggle status Online / Istirahat</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pencairan saldo cepat ke rekening bank</span>
              </li>
            </ul>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              3. Operasional, Audit & Escrow
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Platform menjaga kepatuhan hukum dengan audit berkas STR & SIP keperawatan. Keuntungan platform (15% komisi + Rp 5.000) digunakan untuk pemeliharaan sistem mutu.
            </p>
            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Audit trail semua transaksi GMV</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Verifikasi dokumen lisensi nakes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Approval pencairan dana payout</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SERVICE CATALOG PREVIEW ================= */}
      <section id="catalog-section" className="pt-4">
        <ServiceCatalog onSelectService={onSelectService} />
      </section>

      {/* ================= ALUR 4 LANGKAH MUDAH HOMECARE ================= */}
      <section className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Alur Pemesanan & Proteksi Medis
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            4 Langkah Mudah Memanggil Perawat ke Rumah
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="text-sm font-bold text-white">Pilih Tindakan Medis</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Pilih tindakan seperti perawatan luka diabetes, infus, kateter urine, nebulizer, atau fisioterapi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="text-sm font-bold text-white">Bayar ke Escrow Aman</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Bayar melalui BCA, Mandiri, QRIS, atau GoPay. Dana tertahan aman di sistem penampung resmi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="text-sm font-bold text-white">Nakes Datang & Bertugas</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Perawat bersertifikasi STR datang ke alamat Anda sesuai jam kunjungan dengan peralatan steril lengkap.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
              4
            </div>
            <h4 className="text-sm font-bold text-white">E-Report & Rilis Honor</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Perawat mengisi tanda vital digital, pasien menerima rekam asuhan, dan dana 85% diteruskan ke nakes.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM REGISTRATION & ACCESS CTA ================= */}
      <section className="bg-teal-50/80 border border-teal-200 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-5">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30">
          <HeartHandshake className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-teal-950">
          Siap Memulai Layanan Medis HomeCare?
        </h2>
        <p className="text-xs sm:text-sm text-teal-800/90 leading-relaxed max-w-xl mx-auto">
          Daftarkan akun pasien untuk memesan perawatan keluarga Anda, atau daftarkan sertifikat STR Anda sebagai perawat mitra profesional.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onOpenAuth('register', 'patient')}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Sebagai Pasien</span>
          </button>

          <button
            onClick={() => onOpenAuth('register', 'nurse')}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-teal-900 border border-teal-300 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Daftar Sebagai Nakes Mitra</span>
          </button>

          <button
            onClick={() => onOpenAuth('login')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk ke Akun Terdaftar</span>
          </button>
        </div>
      </section>
    </div>
  );
};
