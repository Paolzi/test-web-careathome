import React, { useState } from 'react';
import {
  CreditCard,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Building2,
  ShieldCheck,
  PlusCircle,
  AlertCircle,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Modal } from '../common/Modal';

export const NurseWallet: React.FC = () => {
  const { currentUser, withdrawals, bookings, nurseRequestWithdrawal } = useCare();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [bankName, setBankName] = useState('BCA (Bank Central Asia)');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  if (!currentUser || currentUser.role !== 'nurse') return null;

  const currentBalance = currentUser.balance || 0;

  // Withdrawals for this nurse
  const myWithdrawals = withdrawals.filter((w) => w.nurseId === currentUser.id);

  // Earnings history from completed bookings
  const completedOrders = bookings.filter(
    (b) => b.nurseId === currentUser.id && b.status === 'COMPLETED'
  );

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);
    if (amountNum <= 0 || amountNum > currentBalance) {
      alert('Nominal penarikan tidak valid atau melebihi saldo aktif!');
      return;
    }

    const success = nurseRequestWithdrawal(
      currentUser.id,
      amountNum,
      bankName,
      accountNumber,
      accountHolder
    );

    if (success) {
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      setAccountNumber('');
      setAccountHolder('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-teal-600" />
          <span>Dompet Nakes & Riwayat Komisi</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pantau akumulasi pendapatan bersih (85% tarif tindakan) dan lakukan penarikan saldo ke rekening bank Anda
        </p>
      </div>

      {/* Saldo Aktif Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
              Saldo Aktif Nakes (Siap Ditarik)
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-2">
              Rp {currentBalance.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-teal-100/80 mt-2 max-w-md">
              Otomatis ditambahkan dari pelepasan Escrow setiap kali Anda mengirimkan Lembar Asuhan Keperawatan Digital (E-Report).
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-teal-600/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-teal-200">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>Transparan 85% Bersih • Tanpa Biaya Tersembunyi</span>
            </div>

            <button
              onClick={() => {
                setAccountHolder(currentUser.name.replace(/^(Ns\.|S\.Kep\.|,)\s*/g, ''));
                setIsWithdrawModalOpen(true);
              }}
              disabled={currentBalance <= 0}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 ${
                currentBalance > 0
                  ? 'bg-white hover:bg-teal-50 text-teal-900 cursor-pointer active:scale-95'
                  : 'bg-white/30 text-white/60 cursor-not-allowed'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Tarik Saldo ke Rekening (Payout)</span>
            </button>
          </div>
        </div>

        {/* Quick Stats widget */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Ringkasan Finansial Anda
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 block">Total Kunjungan Selesai</span>
                <span className="text-xl font-bold text-slate-800">
                  {completedOrders.length} Kunjungan
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Total Penarikan Sukses</span>
                <span className="text-xl font-bold text-emerald-700">
                  Rp{' '}
                  {myWithdrawals
                    .filter((w) => w.status === 'TRANSFERRED')
                    .reduce((sum, w) => sum + w.amount, 0)
                    .toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Pencairan dana diaudit Admin setiap hari kerja</span>
          </div>
        </div>
      </div>

      {/* Tabs / Ledger Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* 1. Riwayat Mutasi Pendapatan Kunjungan */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Mutasi Pendapatan Kunjungan Selesai</span>
          </h3>

          {completedOrders.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              Belum ada pendapatan kunjungan yang terselesaikan.
            </p>
          ) : (
            <div className="space-y-3">
              {completedOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-800">{order.serviceName}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      {order.patientName} • {order.scheduledDate} ({order.bookingCode})
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 text-sm block">
                      +Rp {order.nurseEarnings.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-400">85% Komisi Bersih</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Riwayat Pengajuan Penarikan Dana (Withdrawals) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
            <span>Riwayat Penarikan Dana (Payout)</span>
          </h3>

          {myWithdrawals.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              Belum ada riwayat penarikan saldo.
            </p>
          ) : (
            <div className="space-y-3">
              {myWithdrawals.map((w) => (
                <div
                  key={w.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500 font-semibold">
                        {w.withdrawalCode}
                      </span>
                      {w.status === 'TRANSFERRED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          TRANSFERRED
                        </span>
                      ) : w.status === 'PENDING' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          PENDING ADMIN
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          DITOLAK
                        </span>
                      )}
                    </div>
                    <div className="text-slate-600 mt-1">
                      {w.bankName} - {w.accountNumber} a.n {w.accountHolder}
                    </div>
                    {w.transferReference && (
                      <div className="text-[10px] text-teal-700 font-mono mt-0.5">
                        Ref: {w.transferReference}
                      </div>
                    )}
                  </div>
                  <div className="sm:text-right">
                    <span className="font-bold text-slate-900 text-sm block">
                      Rp {w.amount.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(w.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Withdrawal Request Modal */}
      <Modal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        title="Formulir Tarik Saldo Komisi Nakes"
        subtitle={`Saldo Tersedia: Rp ${currentBalance.toLocaleString('id-ID')}`}
        maxWidth="md"
      >
        <form onSubmit={handleWithdrawSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nominal Penarikan (Rp)
            </label>
            <input
              type="number"
              min={50000}
              max={currentBalance}
              required
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Minimal Rp 50.000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Minimal Rp 50.000</span>
              <button
                type="button"
                onClick={() => setWithdrawAmount(String(currentBalance))}
                className="text-teal-600 font-bold hover:underline"
              >
                Tarik Semua (Rp {currentBalance.toLocaleString('id-ID')})
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pilih Bank Tujuan
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
            >
              <option value="BCA (Bank Central Asia)">BCA (Bank Central Asia)</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="BRI (Bank Rakyat Indonesia)">BRI (Bank Rakyat Indonesia)</option>
              <option value="BNI (Bank Negara Indonesia)">BNI (Bank Negara Indonesia)</option>
              <option value="Bank Syariah Indonesia (BSI)">Bank Syariah Indonesia (BSI)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Rekening Bank
            </label>
            <input
              type="text"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Contoh: 8220194821"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Pemilik Rekening (Harus Sesuai Buku Tabungan)
            </label>
            <input
              type="text"
              required
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Nama lengkap di rekening"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 text-xs leading-relaxed">
            Permintaan penarikan akan diverifikasi oleh tim Finance Admin HomeCare dalam waktu 1x24 jam kerja.
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWithdrawModalOpen(false)}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-2 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/30 transition-all"
            >
              Kirim Pengajuan Payout
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
