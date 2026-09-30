import React, { useState } from 'react';
import {
  FileText,
  Activity,
  Heart,
  Thermometer,
  Droplet,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking } from '../../types';
import { Modal } from '../common/Modal';

interface EReportFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export const EReportFormModal: React.FC<EReportFormModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const { nurseSubmitEReport } = useCare();

  const [bloodPressure, setBloodPressure] = useState('120/80');
  const [pulse, setPulse] = useState(78);
  const [temperature, setTemperature] = useState(36.6);
  const [bloodSugar, setBloodSugar] = useState(115);
  const [careNotes, setCareNotes] = useState('');
  const [recommendations, setRecommendations] = useState('');

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careNotes.trim() || !recommendations.trim()) {
      alert('Mohon isi catatan asuhan dan rekomendasi perawatan rumah!');
      return;
    }

    nurseSubmitEReport(booking.id, {
      bloodPressure,
      pulse: Number(pulse),
      temperature: Number(temperature),
      bloodSugar: Number(bloodSugar),
      careNotes,
      recommendations,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pengisian Lembar Asuhan Keperawatan Digital (E-Report)"
      subtitle={`No. Pesanan: ${booking.bookingCode} • Pasien: ${booking.patientName}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Banner */}
        <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <span>
            Pengiriman E-Report ini akan mengonfirmasi penyelesaian tindakan klinis dan otomatis mentransfer honor bersih sebesar{' '}
            <strong className="text-teal-950 font-bold">
              Rp {booking.nurseEarnings.toLocaleString('id-ID')}
            </strong>{' '}
            ke Saldo Aktif dompet Anda.
          </span>
        </div>

        {/* Vital Signs Grid */}
        <div className="space-y-2">
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Tanda-Tanda Vital Wajib (Vital Signs)</span>
          </h5>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* BP */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-rose-500" />
                <span>Tekanan Darah</span>
              </label>
              <input
                type="text"
                required
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="120/80"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[10px] text-slate-400">mmHg</span>
            </div>

            {/* Pulse */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                <span>Denyut Nadi</span>
              </label>
              <input
                type="number"
                required
                value={pulse}
                onChange={(e) => setPulse(Number(e.target.value))}
                placeholder="78"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[10px] text-slate-400">x/menit (bpm)</span>
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                <span>Suhu Tubuh</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                placeholder="36.6"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[10px] text-slate-400">°Celsius</span>
            </div>

            {/* Blood Sugar */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-sky-500" />
                <span>Gula Darah Acak</span>
              </label>
              <input
                type="number"
                required
                value={bloodSugar}
                onChange={(e) => setBloodSugar(Number(e.target.value))}
                placeholder="110"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[10px] text-slate-400">mg/dL</span>
            </div>
          </div>
        </div>

        {/* Clinical Care Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Catatan Asuhan Keperawatan & Prosedur yang Dilakukan
          </label>
          <textarea
            rows={3}
            required
            value={careNotes}
            onChange={(e) => setCareNotes(e.target.value)}
            placeholder="Tuliskan tindakan aseptik yang telah dilakukan, kondisi fisik luka/infus/alat medis, respon pasien saat tindakan..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Homecare Recommendations */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Rekomendasi & Edukasi Perawatan Mandiri di Rumah
          </label>
          <textarea
            rows={2}
            required
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            placeholder="Instruksi untuk pasien atau keluarga (misal: jadwal minum obat, posisi baring miring, cara menjaga balutan kering)..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/30 transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Kirim E-Report & Cairkan Komisi</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
