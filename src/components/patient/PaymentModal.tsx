import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  CheckCircle2,
  Copy,
  Lock,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking, PaymentMethod } from '../../types';
import { Modal } from '../common/Modal';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  booking,
  onPaymentSuccess,
}) => {
  const { payBooking, addToast } = useCare();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('QRIS');
  const [copied, setCopied] = useState(false);

  if (!booking) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('info', 'Tersalin', 'Nomor rekening / kode bayar telah disalin ke papan klip.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    payBooking(booking.id, selectedMethod);
    onPaymentSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gateway Pembayaran Escrow HomeCare"
      subtitle={`Kode Pesanan: ${booking.bookingCode}`}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Escrow Guarantee Alert */}
        <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-xs text-teal-900 leading-relaxed">
            <strong>Proteksi Rekening Escrow:</strong> Dana Anda sebesar{' '}
            <span className="font-bold">Rp {booking.totalPrice.toLocaleString('id-ID')}</span> akan ditampung di sistem escrow terenkripsi HomeCare. Dana baru dilepaskan ke nakes setelah kunjungan selesai & Anda menyetujui lembar asuhan keperawatan.
          </div>
        </div>

        {/* Invoice Header */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block uppercase">
              Total Tagihan
            </span>
            <span className="text-2xl font-black text-slate-900">
              Rp {booking.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>{booking.serviceName}</div>
            <div className="text-emerald-700 font-semibold mt-0.5">Status: Siap Dibayar</div>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Pilih Kanal Pembayaran
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* BCA VA */}
            <button
              type="button"
              onClick={() => setSelectedMethod('BCA_VA')}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                selectedMethod === 'BCA_VA'
                  ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
                BCA
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900">BCA Virtual Account</div>
                <div className="text-[10px] text-slate-500">Verifikasi Otomatis</div>
              </div>
            </button>

            {/* Mandiri VA */}
            <button
              type="button"
              onClick={() => setSelectedMethod('MANDIRI_VA')}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                selectedMethod === 'MANDIRI_VA'
                  ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                MDR
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900">Mandiri VA</div>
                <div className="text-[10px] text-slate-500">Verifikasi Otomatis</div>
              </div>
            </button>

            {/* QRIS */}
            <button
              type="button"
              onClick={() => setSelectedMethod('QRIS')}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                selectedMethod === 'QRIS'
                  ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900">QRIS Instant</div>
                <div className="text-[10px] text-slate-500">Scan via All e-Wallet</div>
              </div>
            </button>

            {/* GoPay */}
            <button
              type="button"
              onClick={() => setSelectedMethod('GOPAY')}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                selectedMethod === 'GOPAY'
                  ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900">GoPay / e-Wallet</div>
                <div className="text-[10px] text-slate-500">1-Klik Pembayaran</div>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Payment Details Display */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
          {selectedMethod === 'QRIS' && (
            <div className="space-y-3">
              <div className="inline-block p-3 bg-white rounded-xl border border-slate-300 shadow-xs">
                {/* Visual mock QR code pattern */}
                <div className="w-36 h-36 bg-slate-900 rounded-lg p-2 flex flex-col justify-between items-center text-white relative">
                  <div className="flex justify-between w-full">
                    <div className="w-9 h-9 border-4 border-white bg-slate-900 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white"></div>
                    </div>
                    <div className="w-9 h-9 border-4 border-white bg-slate-900 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white"></div>
                    </div>
                  </div>
                  <div className="text-[9px] font-black tracking-widest text-teal-400">
                    CARE-ESCROW-QRIS
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-9 h-9 border-4 border-white bg-slate-900 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white"></div>
                    </div>
                    <div className="w-8 h-8 bg-teal-400 rounded-sm flex items-center justify-center text-slate-950 font-black text-[9px]">
                      CAH
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Pindai kode QRIS di atas menggunakan BCA, Mandiri Livin, GoPay, OVO, atau Dana.
              </p>
            </div>
          )}

          {selectedMethod === 'BCA_VA' && (
            <div className="space-y-2 py-2">
              <span className="text-xs text-slate-500 block">Nomor BCA Virtual Account:</span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl font-bold text-slate-900 tracking-wider">
                  8077 0812 3456 7890
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy('8077081234567890')}
                  className="p-1.5 text-slate-500 hover:text-teal-600 rounded-lg border border-slate-200 hover:bg-slate-50"
                  title="Salin Nomor VA"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] text-slate-400 block">Atas Nama: HomeCare Escrow / Pasien</span>
            </div>
          )}

          {selectedMethod === 'MANDIRI_VA' && (
            <div className="space-y-2 py-2">
              <span className="text-xs text-slate-500 block">Nomor Mandiri Virtual Account:</span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl font-bold text-slate-900 tracking-wider">
                  8890 0812 3456 7890
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy('8890081234567890')}
                  className="p-1.5 text-slate-500 hover:text-teal-600 rounded-lg border border-slate-200 hover:bg-slate-50"
                  title="Salin Nomor VA"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] text-slate-400 block">Atas Nama: HomeCare Escrow / Pasien</span>
            </div>
          )}

          {selectedMethod === 'GOPAY' && (
            <div className="space-y-2 py-2">
              <span className="text-xs text-slate-500 block">Nomor Ponsel Terhubung GoPay:</span>
              <span className="font-mono text-xl font-bold text-slate-900">
                0812-3456-7890
              </span>
              <p className="text-[11px] text-slate-500">
                Notifikasi konfirmasi pembayaran otomatis akan muncul di aplikasi Gojek Anda.
              </p>
            </div>
          )}
        </div>

        {/* Action Button: Bayar Sekarang */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Bayar Nanti
          </button>
          <button
            type="button"
            onClick={handleSimulatePayment}
            className="flex-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simulasi Bayar Sekarang (Escrow)</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
