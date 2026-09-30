import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  ShieldCheck,
  Activity,
  HeartHandshake,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';

export const AdminOverview: React.FC<{ onNavigate: (tab: string) => void }> = ({
  onNavigate,
}) => {
  const { metrics, bookings, users, withdrawals } = useCare();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HomeCare Executive Operations & Finance</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Ikhtisar Metrik & Kesehatan Finansial Platform
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Statistik performa operasional langsung mendukung komitmen UN SDG 3 (Good Health & Well-being)
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Gross Merchandise Value */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total GMV</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            Rp {metrics.totalGMV.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Akumulasi transaksi bruto masuk sistem
          </p>
        </div>

        {/* KPI 2: Platform Net Revenue */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900 to-slate-900 text-white shadow-lg">
          <div className="flex items-center justify-between text-purple-200 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Keuntungan Platform
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            Rp {metrics.platformNetRevenue.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-purple-200/80 mt-1">
            15% Komisi Tindakan + Rp 5.000 Fee Selesai
          </p>
        </div>

        {/* KPI 3: Registered vs Verified Nurses */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rasio Nakes Terdaftar
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-teal-700">
            {metrics.verifiedNurses} <span className="text-sm font-semibold text-slate-400">/ {metrics.totalNurses}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] mt-1">
            <span className="text-emerald-700 font-bold">{metrics.verifiedNurses} Terverifikasi</span>
            {metrics.pendingNurses > 0 && (
              <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                {metrics.pendingNurses} Pending Audit
              </span>
            )}
          </div>
        </div>

        {/* KPI 4: Completed Homecare Visits */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kunjungan Sukses
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {metrics.completedVisits} <span className="text-xs font-semibold text-slate-500">Sesi</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Lengkap dengan E-Report asuhan medis
          </p>
        </div>
      </div>

      {/* Quick Action Hub for Operations */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Navigasi Tindakan Cepat Admin
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('verification')}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-teal-50 hover:border-teal-300 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-teal-900">
              Verifikasi STR / SIP Perawat
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Audit dokumen legalitas perawat yang baru mendaftar ke platform.
            </p>
          </button>

          <button
            onClick={() => onNavigate('escrow')}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-sky-50 hover:border-sky-300 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-sky-900">
              Monitoring Dana Escrow
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Saat ini ada Rp {metrics.totalEscrowHeld.toLocaleString('id-ID')} tertampung aman.
            </p>
          </button>

          <button
            onClick={() => onNavigate('payouts')}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-purple-50 hover:border-purple-300 text-left transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-900">
              Persetujuan Tarik Saldo
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Audit dan transfer permintaan pencairan honor para nakes.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
