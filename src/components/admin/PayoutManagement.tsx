import React, { useState } from 'react';
import {
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Building2,
  Clock,
  Send,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Withdrawal } from '../../types';
import { Modal } from '../common/Modal';

export const PayoutManagement: React.FC = () => {
  const { withdrawals, adminApproveWithdrawal, adminRejectWithdrawal } = useCare();

  const [selectedWithdrawalForApprove, setSelectedWithdrawalForApprove] = useState<Withdrawal | null>(null);
  const [selectedWithdrawalForReject, setSelectedWithdrawalForReject] = useState<Withdrawal | null>(null);

  const [transferRef, setTransferRef] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const openApproveModal = (w: Withdrawal) => {
    setSelectedWithdrawalForApprove(w);
    setTransferRef(`TRX-${w.bankName.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`);
  };

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWithdrawalForApprove || !transferRef.trim()) return;
    adminApproveWithdrawal(selectedWithdrawalForApprove.id, transferRef);
    setSelectedWithdrawalForApprove(null);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWithdrawalForReject || !rejectReason.trim()) return;
    adminRejectWithdrawal(selectedWithdrawalForReject.id, rejectReason);
    setSelectedWithdrawalForReject(null);
    setRejectReason('');
  };

  const pendingWithdrawals = withdrawals.filter((w) => w.status === 'PENDING');
  const completedWithdrawals = withdrawals.filter((w) => w.status !== 'PENDING');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-purple-600" />
            <span>Manajemen Pencairan Dana Nakes (Payout)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Validasi nomor rekening tujuan, persetujuan penarikan, dan input nomor referensi transfer bank nakes
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 self-start sm:self-auto">
          {pendingWithdrawals.length} Pengajuan Menunggu Transfer
        </div>
      </div>

      {/* Pending Payouts Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Pengajuan Pending ({pendingWithdrawals.length})</span>
        </h3>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          {pendingWithdrawals.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              Semua permintaan penarikan nakes telah diproses tuntas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4">Kode & Tanggal</th>
                    <th className="px-4 py-4">Nama Nakes</th>
                    <th className="px-4 py-4">Rekening Tujuan</th>
                    <th className="px-4 py-4">Nominal Penarikan</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Aksi Finance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingWithdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 font-mono">
                        <span className="font-bold text-slate-800">{w.withdrawalCode}</span>
                        <span className="block text-[10px] text-slate-400">
                          {new Date(w.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="px-4 py-4 font-bold text-slate-900">{w.nurseName}</td>

                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-800">{w.bankName}</div>
                        <div className="font-mono text-slate-500">
                          {w.accountNumber} <span className="font-sans">a.n</span>{' '}
                          <strong>{w.accountHolder}</strong>
                        </div>
                      </td>

                      <td className="px-4 py-4 font-black text-slate-900 text-sm">
                        Rp {w.amount.toLocaleString('id-ID')}
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          PENDING APPROVAL
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openApproveModal(w)}
                            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-xs flex items-center gap-1 text-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Setujui & Transfer</span>
                          </button>
                          <button
                            onClick={() => setSelectedWithdrawalForReject(w)}
                            className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold transition-all text-xs"
                          >
                            Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Riwayat Transfer Pencairan ({completedWithdrawals.length})</span>
        </h3>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Kode Penarikan</th>
                  <th className="px-4 py-4">Nakes</th>
                  <th className="px-4 py-4">Nominal</th>
                  <th className="px-4 py-4">Rekening Tujuan</th>
                  <th className="px-4 py-4">No. Referensi Bank</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {completedWithdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4 font-mono text-slate-700 font-semibold">
                      {w.withdrawalCode}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">{w.nurseName}</td>
                    <td className="px-4 py-4 font-bold text-emerald-700">
                      Rp {w.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {w.bankName} • {w.accountNumber} ({w.accountHolder})
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-teal-700">
                      {w.transferReference || '-'}
                    </td>
                    <td className="px-5 py-4">
                      {w.status === 'TRANSFERRED' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          TRANSFERRED
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          REJECTED ({w.rejectionReason})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Approve Modal with Bank Ref Input */}
      <Modal
        isOpen={Boolean(selectedWithdrawalForApprove)}
        onClose={() => setSelectedWithdrawalForApprove(null)}
        title="Simulasi Persetujuan Transfer Bank Nakes"
        subtitle={`Nominal: Rp ${selectedWithdrawalForApprove?.amount.toLocaleString('id-ID')} ke ${selectedWithdrawalForApprove?.nurseName}`}
        maxWidth="md"
      >
        <form onSubmit={handleApproveSubmit} className="space-y-4">
          <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-950 space-y-1">
            <div>
              <strong>Bank Tujuan:</strong> {selectedWithdrawalForApprove?.bankName}
            </div>
            <div>
              <strong>No. Rekening:</strong> {selectedWithdrawalForApprove?.accountNumber}
            </div>
            <div>
              <strong>Nama Pemilik:</strong> {selectedWithdrawalForApprove?.accountHolder}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Referensi Transfer Bank (Simulasi)
            </label>
            <input
              type="text"
              required
              value={transferRef}
              onChange={(e) => setTransferRef(e.target.value)}
              placeholder="Contoh: TRX-BCA-20260920-8812"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-teal-500"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Nomor ini akan tercatat permanen di riwayat mutasi perawat sebagai bukti transfer resmi.
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedWithdrawalForApprove(null)}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-2 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Konfirmasi & Simpan Referensi</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={Boolean(selectedWithdrawalForReject)}
        onClose={() => setSelectedWithdrawalForReject(null)}
        title="Tolak Pengajuan Pencairan Dana"
        subtitle={`Nakes: ${selectedWithdrawalForReject?.nurseName}`}
        maxWidth="sm"
      >
        <form onSubmit={handleRejectSubmit} className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            Penolakan ini akan <strong>mengembalikan saldo penuh</strong> sejumlah Rp{' '}
            {selectedWithdrawalForReject?.amount.toLocaleString('id-ID')} ke dompet perawat.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alasan Penolakan
            </label>
            <textarea
              rows={3}
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Nomor rekening tidak cocok dengan nama nakes..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedWithdrawalForReject(null)}
              className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
            >
              Tolak & Kembalikan Saldo
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
