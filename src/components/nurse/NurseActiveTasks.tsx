import React, { useState } from 'react';
import {
  Activity,
  Navigation,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  FileText,
  AlertCircle,
  Play,
  Sparkles,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking } from '../../types';
import { BookingStatusBadge } from '../common/Badge';
import { EReportFormModal } from './EReportFormModal';
import { EReportModal } from '../patient/EReportModal';

export const NurseActiveTasks: React.FC = () => {
  const { bookings, currentUser, nurseUpdateBookingStatus } = useCare();
  const [selectedBookingForReport, setSelectedBookingForReport] = useState<Booking | null>(null);
  const [viewOnlyBooking, setViewOnlyBooking] = useState<Booking | null>(null);

  if (!currentUser || currentUser.role !== 'nurse') return null;

  // Active tasks for this nurse: ACCEPTED, EN_ROUTE, IN_PROGRESS, or COMPLETED
  const myTasks = bookings.filter((b) => b.nurseId === currentUser.id);
  const activeTasks = myTasks.filter(
    (b) => b.status === 'ACCEPTED' || b.status === 'EN_ROUTE' || b.status === 'IN_PROGRESS'
  );
  const completedTasks = myTasks.filter((b) => b.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-6 h-6 text-teal-600" />
          <span>Manajemen Tugas Kunjungan Aktif</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Perbarui status perjalanan Anda, lakukan asuhan keperawatan profesional, dan isi lembar E-Report digital
        </p>
      </div>

      {/* Active In-Progress Tasks */}
      {activeTasks.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">Tidak Ada Tugas Aktif Berjalan</h3>
          <p className="text-xs text-slate-500 mt-1">
            Silakan buka tab "Order Masuk (Feed)" untuk menerima pesanan kunjungan baru dari pasien.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Tugas yang Sedang Berlangsung ({activeTasks.length})
          </h3>

          <div className="grid grid-cols-1 gap-5">
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-3xl border-2 border-teal-500/80 shadow-md p-5 sm:p-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600">
                      {task.bookingCode}
                    </span>
                    <BookingStatusBadge status={task.status} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">Honor Bersih Anda:</span>
                    <span className="text-base font-black text-emerald-700 ml-1.5">
                      Rp {task.nurseEarnings.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mt-3">
                  {task.serviceName}
                </h4>

                {/* Patient Information Box */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-semibold">Nama Pasien:</span>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-teal-600" />
                      <span>{task.patientName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 mt-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.patientPhone}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5 font-semibold">Alamat Tujuan:</span>
                    <div className="font-semibold text-slate-800 flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{task.patientAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Complaints */}
                {task.complaints && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950">
                    <strong>Catatan Keluhan Pasien:</strong> {task.complaints}
                  </div>
                )}

                {/* Interactive Workflow Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Jadwal: {task.scheduledDate} ({task.scheduledTime} WIB)
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Step 1: Accepted -> Click to go En Route */}
                    {task.status === 'ACCEPTED' && (
                      <button
                        onClick={() => nurseUpdateBookingStatus(task.id, 'EN_ROUTE')}
                        className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/30 transition-all flex items-center gap-1.5"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Mulai Menuju Lokasi (En Route)</span>
                      </button>
                    )}

                    {/* Step 2: En Route -> Click to start procedure */}
                    {task.status === 'EN_ROUTE' && (
                      <button
                        onClick={() => nurseUpdateBookingStatus(task.id, 'IN_PROGRESS')}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-4 h-4" />
                        <span>Tiba di Lokasi & Mulai Tindakan</span>
                      </button>
                    )}

                    {/* Step 3: In Progress -> Complete and Fill E-Report */}
                    {task.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => setSelectedBookingForReport(task)}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5 animate-pulse"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Selesaikan Tindakan & Isi E-Report</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks History */}
      {completedTasks.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Riwayat Tugas Selesai ({completedTasks.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-slate-500 font-bold">{task.bookingCode}</span>
                    <BookingStatusBadge status="COMPLETED" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{task.serviceName}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Pasien: {task.patientName} • {task.scheduledDate}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Honor Bersih</span>
                    <span className="font-bold text-emerald-700">
                      Rp {task.nurseEarnings.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => setViewOnlyBooking(task)}
                    className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-semibold hover:bg-teal-100 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lihat E-Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <EReportFormModal
        isOpen={Boolean(selectedBookingForReport)}
        onClose={() => setSelectedBookingForReport(null)}
        booking={selectedBookingForReport}
      />

      <EReportModal
        isOpen={Boolean(viewOnlyBooking)}
        onClose={() => setViewOnlyBooking(null)}
        booking={viewOnlyBooking}
      />
    </div>
  );
};
