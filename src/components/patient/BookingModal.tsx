import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  ShieldCheck,
  CreditCard,
  User,
  Phone,
  Info,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking, MedicalService } from '../../types';
import { Modal } from '../common/Modal';
import { CareLevelBadge } from '../common/Badge';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: MedicalService | null;
  onBookingCreated: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
  onBookingCreated,
}) => {
  const { currentUser, createBooking } = useCare();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [complaints, setComplaints] = useState('');

  // Default initial values when opened
  useEffect(() => {
    if (currentUser) {
      setPatientName(currentUser.name);
      setPatientPhone(currentUser.phone);
      setPatientAddress(currentUser.address || '');
    }

    // Default to tomorrow 10:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setScheduledDate(dateStr);
    setScheduledTime('10:00');
    setComplaints('');
  }, [currentUser, isOpen]);

  if (!service) return null;

  const platformFee = 5000;
  const totalPrice = service.price + platformFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const booking = createBooking({
      patientId: currentUser.id,
      serviceId: service.id,
      scheduledDate,
      scheduledTime,
      complaints,
      address: patientAddress,
      phone: patientPhone,
    });

    if (booking) {
      onBookingCreated(booking);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Formulir Pemesanan Kunjungan Homecare"
      subtitle={`Layanan: ${service.name}`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Service Header Overview */}
        <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
              Tindakan Terpilih
            </span>
            <h4 className="text-sm sm:text-base font-bold text-teal-950 mt-0.5">
              {service.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <CareLevelBadge level={service.careLevel} />
              <span className="text-xs text-teal-700">Durasi ± {service.durationMinutes} menit</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Tarif Tindakan</span>
            <span className="text-base sm:text-lg font-black text-teal-900">
              Rp {service.price.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Patient & Location Information */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>Identitas & Lokasi Kunjungan Pasien</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Pasien yang Ditangani
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Nama lengkap pasien"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor Kontak / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Rumah (Penjemputan / Kunjungan)
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                rows={2}
                required
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, dan patokan lokasi..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Schedule & Complaints */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Waktu Kunjungan & Keluhan Klinis</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Kunjungan
              </label>
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jam Kedatangan Nakes
              </label>
              <input
                type="time"
                required
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Keluhan / Instruksi Khusus
            </label>
            <textarea
              rows={2}
              required
              value={complaints}
              onChange={(e) => setComplaints(e.target.value)}
              placeholder="Contoh: Perban basah perlu ganti steril, pasien ada riwayat vertigo dan alergi plester..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Transparent Price Breakdown */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <h5 className="text-xs font-bold text-slate-700 mb-3 flex items-center justify-between">
            <span>Rincian Biaya (Price Breakdown)</span>
            <span className="text-[11px] font-normal text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Proteksi Escrow 100%
            </span>
          </h5>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Biaya Tindakan Medis ({service.name})</span>
              <span className="font-semibold text-slate-800">
                Rp {service.price.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Layanan Aplikasi & Administrasi</span>
              <span className="font-semibold text-slate-800">
                Rp {platformFee.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>Jaminan Keamanan Rekening Penampung (Escrow)</span>
              <span className="font-semibold">GRATIS</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-900">Total Tagihan Pasien</span>
              <span className="font-extrabold text-base text-teal-700">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Submit button */}
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
            <CreditCard className="w-4 h-4" />
            Lanjut ke Pembayaran Escrow
          </button>
        </div>
      </form>
    </Modal>
  );
};
