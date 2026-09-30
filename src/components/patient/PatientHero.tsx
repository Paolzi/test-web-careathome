import React from 'react';
import { ShieldCheck, Clock, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const PatientHero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl mb-8">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-4">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Solusi Kesehatan Berkelanjutan • UN SDG 3</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Layanan Perawat Medis Bersertifikasi Datang ke Rumah Anda
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-2xl">
          Akses perawatan medis profesional, steril, dan berizin resmi (STR/SIP) untuk pemulihan optimal keluarga tercinta di rumah dengan sistem pembayaran aman bergaransi escrow.
        </p>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Nakes STR & SIP Valid</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kunjungan Terjadwal Fleksibel</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
            <Award className="w-4 h-4 text-sky-400 shrink-0" />
            <span>E-Report Medis Digital Lengkap</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={onExplore}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/30 transition-all transform hover:-translate-y-0.5"
          >
            Pilih Layanan Keperawatan
          </button>
        </div>
      </div>
    </div>
  );
};
