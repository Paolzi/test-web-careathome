import React, { useState } from 'react';
import {
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Search,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { User } from '../../types';
import { NurseVerificationBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const NurseLegalAudit: React.FC = () => {
  const { users, adminApproveNurse, adminRejectNurse } = useCare();
  const [selectedNurseForDoc, setSelectedNurseForDoc] = useState<User | null>(null);
  const [rejectingNurse, setRejectingNurse] = useState<User | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter only nurses
  const nurses = users.filter((u) => u.role === 'nurse');

  const filteredNurses = nurses.filter((n) => {
    if (filterStatus === 'all') return true;
    return n.verificationStatus === filterStatus;
  });

  const handleApprove = (nurseId: string) => {
    adminApproveNurse(nurseId);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingNurse || !rejectionReason.trim()) return;
    adminRejectNurse(rejectingNurse.id, rejectionReason);
    setRejectingNurse(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            <span>Audit Legalitas & Lisensi Nakes (STR/SIP)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Verifikasi keaslian Surat Tanda Registrasi dan Surat Izin Praktik sebelum perawat diizinkan bertugas
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'all' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Semua ({nurses.length})
          </button>
          <button
            onClick={() => setFilterStatus('PENDING_VERIFICATION')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'PENDING_VERIFICATION' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Pending ({nurses.filter((n) => n.verificationStatus === 'PENDING_VERIFICATION').length})
          </button>
          <button
            onClick={() => setFilterStatus('APPROVED')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'APPROVED' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Disetujui
          </button>
        </div>
      </div>

      {/* Nurses Audit Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Perawat / Pemohon</th>
                <th className="px-4 py-4">Nomor STR & SIP</th>
                <th className="px-4 py-4">Pengalaman</th>
                <th className="px-4 py-4">Status Akun</th>
                <th className="px-4 py-4">Dokumen</th>
                <th className="px-5 py-4 text-right">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNurses.map((nurse) => (
                <tr key={nurse.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={nurse.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                        alt={nurse.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{nurse.name}</div>
                        <div className="text-slate-400 text-[11px]">
                          {nurse.email} • {nurse.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 font-mono text-[11px]">
                    <div className="text-slate-800 font-semibold">
                      STR: {nurse.strNumber || '-'}
                    </div>
                    <div className="text-slate-500">SIP: {nurse.sipNumber || '-'}</div>
                  </td>

                  <td className="px-4 py-4 text-slate-700">
                    <span className="font-bold">{nurse.experienceYears || 1}</span> Tahun
                  </td>

                  <td className="px-4 py-4">
                    <NurseVerificationBadge status={nurse.verificationStatus || 'PENDING_VERIFICATION'} />
                    {nurse.rejectionReason && (
                      <div className="text-[10px] text-rose-600 mt-1 max-w-[160px] truncate" title={nurse.rejectionReason}>
                        Alasan: {nurse.rejectionReason}
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelectedNurseForDoc(nurse)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-600" />
                      <span>Lihat Dokumen</span>
                    </button>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {nurse.verificationStatus !== 'APPROVED' && (
                        <button
                          onClick={() => handleApprove(nurse.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs flex items-center gap-1 text-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Setujui (Approve)</span>
                        </button>
                      )}

                      {nurse.verificationStatus !== 'REJECTED' && (
                        <button
                          onClick={() => setRejectingNurse(nurse)}
                          className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold transition-all text-xs flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Tolak</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Preview Modal */}
      <Modal
        isOpen={Boolean(selectedNurseForDoc)}
        onClose={() => setSelectedNurseForDoc(null)}
        title="Pratinjau Dokumen STR & SIP Perawat"
        subtitle={`Pemilik: ${selectedNurseForDoc?.name} (${selectedNurseForDoc?.degree || 'Nakes'})`}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
            <div>
              <strong>Nomor STR:</strong> {selectedNurseForDoc?.strNumber}
            </div>
            <div>
              <strong>Nomor SIP:</strong> {selectedNurseForDoc?.sipNumber}
            </div>
            <div>
              <strong>Gelar Profesi:</strong> {selectedNurseForDoc?.degree}
            </div>
          </div>

          <div className="border border-slate-300 rounded-2xl overflow-hidden bg-slate-900 text-center relative group">
            <img
              src={
                selectedNurseForDoc?.documentUrl ||
                'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80'
              }
              alt="Dokumen STR / SIP"
              className="w-full h-80 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs p-2 rounded-xl border border-white/20">
              Dokumen Terlampir Resmi: Surat Tanda Registrasi & Izin Praktik Keperawatan
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setSelectedNurseForDoc(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      </Modal>

      {/* Reject Reason Modal */}
      <Modal
        isOpen={Boolean(rejectingNurse)}
        onClose={() => setRejectingNurse(null)}
        title="Alasan Penolakan Dokumen Perawat"
        subtitle={`Pemohon: ${rejectingNurse?.name}`}
        maxWidth="sm"
      >
        <form onSubmit={handleConfirmReject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Penolakan (Akan dikirim ke nakes)
            </label>
            <textarea
              rows={3}
              required
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Contoh: Nomor STR tidak terdaftar di Konsil Keperawatan RI, masa berlaku habis, atau foto buram..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setRejectingNurse(null)}
              className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
            >
              Konfirmasi Tolak
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
