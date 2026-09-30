import React from 'react';
import {
  FileText,
  Activity,
  Heart,
  Thermometer,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Download,
  Award,
} from 'lucide-react';
import { Booking } from '../../types';
import { Modal } from '../common/Modal';

interface EReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export const EReportModal: React.FC<EReportModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!booking || !booking.eReport) return null;

  const { eReport } = booking;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <span>Lembar Asuhan Keperawatan Digital (E-Report)</span>
        </div>
      }
      subtitle={`No. Rekam Asuhan: ${booking.bookingCode} • Pasien: ${booking.patientName}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-800 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
              Tindakan Selesai & Tervalidasi
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">{booking.serviceName}</h4>
            <div className="flex items-center gap-3 text-xs text-teal-100/80 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                {booking.scheduledDate} {booking.scheduledTime} WIB
              </span>
              <span>• Alamat: {booking.patientAddress}</span>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
            <span className="text-xs text-teal-200">Perawat Penanggung Jawab</span>
            <div className="font-bold text-white text-sm flex items-center gap-1.5 mt-0.5">
              <Award className="w-4 h-4 text-teal-400" />
              <span>{booking.nurseName || 'Ns. Profesional'}</span>
            </div>
            <span className="text-[11px] text-teal-300 font-mono">STR Terdaftar Resmi</span>
          </div>
        </div>

        {/* Vital Signs Matrix */}
        <div>
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Tanda-Tanda Vital Pasien (Vital Signs)</span>
          </h5>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Blood Pressure */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold text-slate-500">Tekanan Darah</span>
                <Activity className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-xl font-black text-slate-900">{eReport.bloodPressure}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">mmHg (Normal: 120/80)</div>
            </div>

            {/* Pulse */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold text-slate-500">Denyut Nadi</span>
                <Heart className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xl font-black text-slate-900">{eReport.pulse}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">x/menit (60-100 bpm)</div>
            </div>

            {/* Temperature */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold text-slate-500">Suhu Tubuh</span>
                <Thermometer className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-xl font-black text-slate-900">{eReport.temperature}°C</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Afebris (36.5 - 37.5)</div>
            </div>

            {/* Blood Sugar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[11px] font-semibold text-slate-500">Gula Darah Acak</span>
                <Droplet className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-xl font-black text-slate-900">{eReport.bloodSugar}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">mg/dL (GDA)</div>
            </div>
          </div>
        </div>

        {/* Clinical Care Notes & Recommendations */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Catatan Perkembangan & Asuhan Keperawatan</span>
            </h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              {eReport.careNotes}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80">
            <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Rekomendasi Pemulihan di Rumah (Untuk Pasien & Keluarga)</span>
            </h5>
            <p className="text-xs sm:text-sm text-teal-950 leading-relaxed whitespace-pre-line bg-white/80 p-3 rounded-xl border border-teal-100">
              {eReport.recommendations}
            </p>
          </div>
        </div>

        {/* Digital Signature & Footer */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ditandatangani secara digital oleh <strong>{booking.nurseName}</strong></span>
          </div>
          <div>
            Tanggal Terbit: {new Date(eReport.submittedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })} WIB
          </div>
        </div>
      </div>
    </Modal>
  );
};
