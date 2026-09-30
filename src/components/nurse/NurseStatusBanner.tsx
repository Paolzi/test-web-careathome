import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Power,
  Award,
  FileCheck2,
  AlertCircle,
  Clock,
  Star,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';

export const NurseStatusBanner: React.FC = () => {
  const { currentUser, toggleNurseOnline } = useCare();

  if (!currentUser || currentUser.role !== 'nurse') return null;

  const isApproved = currentUser.verificationStatus === 'APPROVED';
  const isPending = currentUser.verificationStatus === 'PENDING_VERIFICATION';
  const isRejected = currentUser.verificationStatus === 'REJECTED';

  return (
    <div className="space-y-3 mb-6">
      {/* 1. If Pending Verification */}
      {isPending && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-amber-900">
                Pendaftaran Sedang Ditinjau Tim Audit Legalitas (Admin)
              </h4>
              <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                Nomor STR ({currentUser.strNumber || '-'}) dan SIP ({currentUser.sipNumber || '-'}) Anda sedang diverifikasi. Selama proses audit berlangsung, akun Anda belum dapat menerima order tindakan homecare baru.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-200/80 text-amber-900 border border-amber-300">
              PENDING VERIFICATION
            </span>
          </div>
        </div>
      )}

      {/* 2. If Rejected */}
      {isRejected && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-rose-900">
              Pengajuan Akun Keperawatan Ditolak
            </h4>
            <p className="text-xs text-rose-800 mt-1 leading-relaxed">
              Alasan: <strong>{currentUser.rejectionReason || 'Dokumen STR/SIP tidak valid atau telah kedaluwarsa.'}</strong>. Silakan hubungi admin operasional untuk banding atau perbaikan dokumen.
            </p>
          </div>
        </div>
      )}

      {/* 3. If Approved */}
      {isApproved && (
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shrink-0 shadow-inner">
              <Award className="w-7 h-7 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Perawat Terverifikasi Resmi
                </span>
                <span className="flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  <ShieldCheck className="w-3 h-3" /> STR & SIP Valid
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {currentUser.name} {currentUser.degree && `(${currentUser.degree})`}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-teal-100/80 mt-1.5 font-mono">
                <span>STR: {currentUser.strNumber || '19880214-STR-2023'}</span>
                <span>SIP: {currentUser.sipNumber || '446/SIP.N/2023'}</span>
                <span className="flex items-center gap-1 text-amber-300 font-sans font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {currentUser.rating || 5.0} ({currentUser.reviewCount || 0} Ulasan)
                </span>
              </div>
            </div>
          </div>

          {/* Toggle Online / Offline Button */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 self-start md:self-auto">
            <div className="text-left px-2">
              <span className="text-[10px] text-teal-200 block uppercase font-bold tracking-wider">
                Status Siap Tugas
              </span>
              <span className="text-xs font-extrabold text-white">
                {currentUser.isOnline ? 'ONLINE (Menerima Order)' : 'OFFLINE (Istirahat)'}
              </span>
            </div>
            <button
              onClick={() => toggleNurseOnline(currentUser.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentUser.isOnline
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{currentUser.isOnline ? 'Istirahat' : 'Aktifkan'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
