import React from 'react';
import { BookingStatus, CareLevel, EscrowStatus, NurseVerificationStatus } from '../../types';
import { ShieldCheck, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const BookingStatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  switch (status) {
    case 'PENDING_PAYMENT':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3.5 h-3.5" /> Menunggu Pembayaran
        </span>
      );
    case 'PAID':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          <Clock className="w-3.5 h-3.5" /> Menunggu Perawat
        </span>
      );
    case 'ACCEPTED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <CheckCircle2 className="w-3.5 h-3.5" /> Perawat Ditemukan
        </span>
      );
    case 'EN_ROUTE':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Menuju Lokasi
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Tindakan Berlangsung
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selesai
        </span>
      );
    case 'CANCELLED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Dibatalkan
        </span>
      );
    default:
      return null;
  }
};

export const NurseVerificationBadge: React.FC<{ status: NurseVerificationStatus }> = ({
  status,
}) => {
  switch (status) {
    case 'APPROVED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> STR & SIP Terverifikasi
        </span>
      );
    case 'PENDING_VERIFICATION':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <Clock className="w-3.5 h-3.5 text-amber-700" /> Menunggu Audit STR/SIP
        </span>
      );
    case 'REJECTED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
          <AlertCircle className="w-3.5 h-3.5 text-rose-700" /> Dokumen Ditolak
        </span>
      );
  }
};

export const CareLevelBadge: React.FC<{ level: CareLevel }> = ({ level }) => {
  switch (level) {
    case 'Dasar':
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
          Tingkat Dasar
        </span>
      );
    case 'Menengah':
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
          Tingkat Menengah
        </span>
      );
    case 'Intensif':
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
          Tingkat Intensif
        </span>
      );
  }
};

export const EscrowBadge: React.FC<{ status: EscrowStatus }> = ({ status }) => {
  if (status === 'PENDING') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Menunggu Pembayaran
      </span>
    );
  }
  if (status === 'HELD') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        <ShieldCheck className="w-3.5 h-3.5" /> Rekening Escrow Terkunci
      </span>
    );
  }
  if (status === 'RELEASED') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" /> Dana Diteruskan ke Nakes
      </span>
    );
  }
  return null;
};
