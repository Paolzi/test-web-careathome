import React from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign,
  Activity,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking } from '../../types';

interface NurseOrderFeedProps {
  onOrderAccepted: () => void;
}

export const NurseOrderFeed: React.FC<NurseOrderFeedProps> = ({ onOrderAccepted }) => {
  const { bookings, currentUser, nurseAcceptBooking, nurseRejectBooking } = useCare();

  if (!currentUser || currentUser.role !== 'nurse') return null;

  const isApproved = currentUser.verificationStatus === 'APPROVED';
  const isOnline = Boolean(currentUser.isOnline);

  // Incoming jobs: bookings that are PAID and haven't been assigned to a nurse
  const incomingOrders = bookings.filter(
    (b) => b.status === 'PAID' && (!b.nurseId || b.nurseId === currentUser.id)
  );

  const handleAccept = (bookingId: string) => {
    if (!isApproved) {
      alert('Akun Anda masih menunggu verifikasi audit STR/SIP dari Admin!');
      return;
    }
    nurseAcceptBooking(bookingId, currentUser.id);
    onOrderAccepted();
  };

  const handleReject = (bookingId: string) => {
    nurseRejectBooking(bookingId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-teal-600" />
            <span>Feed Order Kunjungan Masuk (Siap Diambil)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Order dari pasien yang telah melunasi pembayaran ke rekening Escrow HomeCare
          </p>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 self-start sm:self-auto">
          {incomingOrders.length} Order Tersedia
        </div>
      </div>

      {/* Notice if offline or pending */}
      {!isApproved && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>
            Status akun Anda masih <strong>PENDING_VERIFICATION</strong>. Anda dapat melihat feed tetapi belum dapat mengonfirmasi penerimaan tugas sampai diapprove oleh Admin.
          </span>
        </div>
      )}

      {isApproved && !isOnline && (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-xs text-slate-700 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-slate-500" />
            <span>Status Anda saat ini <strong>OFFLINE (Istirahat)</strong>. Aktifkan status online untuk menerima order.</span>
          </div>
        </div>
      )}

      {/* Orders List */}
      {incomingOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Saat Ini Tidak Ada Order Menunggu</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Semua permintaan kunjungan pasien telah ditugaskan. Tetap online agar notifikasi order baru segera masuk.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {incomingOrders.map((order) => {
            // Net Nurse Payout = 85% of service fee
            const nursePayout = order.nurseEarnings;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                      {order.bookingCode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" /> Dana Escrow Aman
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {order.serviceName}
                  </h3>

                  {/* Patient Info & Location */}
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <User className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{order.patientName}</span>
                      <span className="text-slate-400 font-normal">({order.patientPhone})</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{order.patientAddress}</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        {order.scheduledDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        Pukul {order.scheduledTime} WIB
                      </span>
                    </div>
                  </div>

                  {/* Medical Complaints */}
                  {order.complaints && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                      <strong className="text-slate-700 block mb-0.5">Keluhan Pasien:</strong>
                      {order.complaints}
                    </div>
                  )}
                </div>

                {/* Financial Payout & Action */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                      Upah Bersih Nakes (85%)
                    </span>
                    <span className="text-xl font-black text-emerald-700">
                      Rp {nursePayout.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Tarif Pasien: Rp {order.servicePrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(order.id)}
                      className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                    >
                      Abaikan
                    </button>
                    <button
                      onClick={() => handleAccept(order.id)}
                      disabled={!isApproved}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5 ${
                        isApproved
                          ? 'bg-teal-600 hover:bg-teal-700 shadow-teal-600/30 active:scale-95'
                          : 'bg-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Terima Order Kunjungan</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
