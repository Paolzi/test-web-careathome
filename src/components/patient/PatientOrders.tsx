import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  Star,
  ShieldCheck,
  CreditCard,
  User,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking } from '../../types';
import { BookingStatusBadge, EscrowBadge } from '../common/Badge';
import { EReportModal } from './EReportModal';
import { RatingModal } from './RatingModal';
import { PaymentModal } from './PaymentModal';

export const PatientOrders: React.FC = () => {
  const { bookings, currentUser } = useCare();

  const [selectedBookingForReport, setSelectedBookingForReport] = useState<Booking | null>(null);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState<Booking | null>(null);
  const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<Booking | null>(null);

  // Filter bookings for current logged in patient
  const myBookings = bookings.filter((b) => b.patientId === currentUser?.id);

  const getStepState = (booking: Booking, stepIndex: number) => {
    // Steps:
    // 0: Menunggu Pembayaran
    // 1: Pembayaran Selesai & Cari Nakes
    // 2: Nakes Menuju Lokasi (En Route)
    // 3: Tindakan Berlangsung (In Progress)
    // 4: Selesai & E-Report

    const statusMap: Record<Booking['status'], number> = {
      PENDING_PAYMENT: 0,
      PAID: 1,
      ACCEPTED: 1,
      EN_ROUTE: 2,
      IN_PROGRESS: 3,
      COMPLETED: 4,
      CANCELLED: -1,
    };

    const currentStep = statusMap[booking.status];
    if (booking.status === 'CANCELLED') return 'cancelled';
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Riwayat Pesanan & Rekam Asuhan Medis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pantau pergerakan nakes, status tindakan real-time, dan akses lembar E-Report digital Anda
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 self-start sm:self-auto">
          Total {myBookings.length} Pesanan Terdaftar
        </div>
      </div>

      {myBookings.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Belum Ada Pesanan Aktif</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Anda belum pernah memesan perawat homecare. Silakan kunjungi katalog layanan untuk memanggil nakes berlisensi resmi.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {myBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all hover:border-teal-300"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-100">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {booking.bookingCode}
                      </span>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {booking.serviceName}
                    </h3>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                  <span className="text-xs text-slate-400">Total Tagihan (Escrow)</span>
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    Rp {booking.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Real-time Step Progress Timeline */}
              {booking.status !== 'CANCELLED' && (
                <div className="py-6 px-2">
                  <div className="relative">
                    {/* Background line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />

                    <div className="relative z-10 grid grid-cols-4 gap-1 text-center">
                      {/* Step 1: Menunggu Perawat */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            getStepState(booking, 1) === 'completed'
                              ? 'bg-teal-600 text-white border-teal-600'
                              : getStepState(booking, 1) === 'active'
                              ? 'bg-teal-50 text-teal-700 border-teal-600 ring-4 ring-teal-100'
                              : 'bg-white text-slate-400 border-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 mt-2 block">
                          Menunggu Nakes
                        </span>
                        <span className="text-[9px] text-slate-400 hidden sm:block">
                          {booking.status === 'PENDING_PAYMENT' ? 'Belum dibayar' : 'Dana di Escrow'}
                        </span>
                      </div>

                      {/* Step 2: Diterima / Menuju Lokasi */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            getStepState(booking, 2) === 'completed'
                              ? 'bg-teal-600 text-white border-teal-600'
                              : getStepState(booking, 2) === 'active'
                              ? 'bg-teal-50 text-teal-700 border-teal-600 ring-4 ring-teal-100 animate-pulse'
                              : 'bg-white text-slate-400 border-slate-200'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 mt-2 block">
                          Menuju Lokasi
                        </span>
                        <span className="text-[9px] text-slate-400 hidden sm:block">
                          {booking.nurseName || 'Mencari nakes...'}
                        </span>
                      </div>

                      {/* Step 3: Tindakan Berlangsung */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            getStepState(booking, 3) === 'completed'
                              ? 'bg-teal-600 text-white border-teal-600'
                              : getStepState(booking, 3) === 'active'
                              ? 'bg-teal-50 text-teal-700 border-teal-600 ring-4 ring-teal-100 animate-pulse'
                              : 'bg-white text-slate-400 border-slate-200'
                          }`}
                        >
                          <Activity className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 mt-2 block">
                          Tindakan Medis
                        </span>
                        <span className="text-[9px] text-slate-400 hidden sm:block">
                          Asuhan Steril
                        </span>
                      </div>

                      {/* Step 4: Selesai & E-Report */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                            getStepState(booking, 4) === 'completed' || getStepState(booking, 4) === 'active'
                              ? 'bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-100'
                              : 'bg-white text-slate-400 border-slate-200'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 mt-2 block">
                          Selesai & E-Report
                        </span>
                        <span className="text-[9px] text-slate-400 hidden sm:block">
                          Tervalidasi
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Meta Info & Assigned Nurse */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Jadwal Kunjungan</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{booking.scheduledDate} ({booking.scheduledTime} WIB)</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Alamat Kunjungan</span>
                  <div className="font-semibold text-slate-800 truncate" title={booking.patientAddress}>
                    {booking.patientAddress}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Perawat Bertugas</span>
                  <div className="font-semibold text-teal-900 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>{booking.nurseName ? `${booking.nurseName} (${booking.nurseDegree || 'Nakes'})` : 'Menunggu konfirmasi nakes'}</span>
                  </div>
                </div>
              </div>

              {/* Complaints Note */}
              {booking.complaints && (
                <div className="mt-3 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-700">Catatan Keluhan:</strong> {booking.complaints}
                </div>
              )}

              {/* Review Snippet if already rated */}
              {booking.review && (
                <div className="mt-3 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-start gap-2 text-xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-950 flex items-center gap-2">
                      <span>Ulasan Anda ({booking.review.rating} Bintang)</span>
                      <span className="text-[10px] text-amber-700 font-normal">
                        {new Date(booking.review.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-amber-900 mt-0.5 italic">"{booking.review.comment}"</p>
                  </div>
                </div>
              )}

              {/* Order Actions Footer */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <EscrowBadge status={booking.escrowStatus} />
                </div>

                <div className="flex items-center gap-2">
                  {/* Action 1: Pending Payment */}
                  {booking.status === 'PENDING_PAYMENT' && (
                    <button
                      onClick={() => setSelectedBookingForPayment(booking)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Bayar Sekarang (Escrow)</span>
                    </button>
                  )}

                  {/* Action 2: View E-Report */}
                  {booking.eReport && (
                    <button
                      onClick={() => setSelectedBookingForReport(booking)}
                      className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      <span>Lihat E-Report Asuhan Medis</span>
                    </button>
                  )}

                  {/* Action 3: Review & Release Escrow */}
                  {booking.status === 'COMPLETED' && !booking.review && (
                    <button
                      onClick={() => setSelectedBookingForRating(booking)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Beri Ulasan Layanan</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <EReportModal
        isOpen={Boolean(selectedBookingForReport)}
        onClose={() => setSelectedBookingForReport(null)}
        booking={selectedBookingForReport}
      />

      <RatingModal
        isOpen={Boolean(selectedBookingForRating)}
        onClose={() => setSelectedBookingForRating(null)}
        booking={selectedBookingForRating}
      />

      <PaymentModal
        isOpen={Boolean(selectedBookingForPayment)}
        onClose={() => setSelectedBookingForPayment(null)}
        booking={selectedBookingForPayment}
        onPaymentSuccess={() => {}}
      />
    </div>
  );
};
