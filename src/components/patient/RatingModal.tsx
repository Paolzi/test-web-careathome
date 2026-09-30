import React, { useState } from 'react';
import { Star, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Booking } from '../../types';
import { Modal } from '../common/Modal';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const { patientConfirmAndRate } = useCare();
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [comment, setComment] = useState('');

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patientConfirmAndRate(booking.id, stars, comment);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ulasan & Konfirmasi Kepuasan Pasien"
      subtitle={`Layanan: ${booking.serviceName} • Nakes: ${booking.nurseName || 'Perawat'}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-200 shadow-xs">
          <Star className="w-7 h-7 fill-amber-400" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">
            Bagaimana Pengalaman Kunjungan Medis Anda?
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Penilaian Anda membantu menjaga standar pelayanan mutu klinis HomeCare.
          </p>
        </div>

        {/* 5-Star Interactive Rating */}
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((index) => {
            const isFilled = (hoverStars || stars) >= index;
            return (
              <button
                type="button"
                key={index}
                onClick={() => setStars(index)}
                onMouseEnter={() => setHoverStars(index)}
                onMouseLeave={() => setHoverStars(0)}
                className="p-1.5 focus:outline-none transform hover:scale-125 transition-transform"
                aria-label={`Beri bintang ${index}`}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                      : 'text-slate-200'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="text-xs font-bold text-slate-700">
          {stars === 5 && 'Luar Biasa! Sangat Puas & Profesional'}
          {stars === 4 && 'Sangat Baik & Ramah'}
          {stars === 3 && 'Cukup Memuaskan'}
          {stars === 2 && 'Perlu Peningkatan'}
          {stars === 1 && 'Kurang Memuaskan'}
        </div>

        {/* Comment Textarea */}
        <div className="text-left">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Komentar / Masukan Terhadap Nakes
          </label>
          <textarea
            rows={3}
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan keramahan, ketelitian, kebersihan, atau komunikasi perawat selama tindakan berlangsung..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Escrow Release Notice */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-left flex items-start gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            Dengan mengirimkan ulasan ini, Anda mengonfirmasi bahwa tindakan medis telah selesai secara memuaskan.
          </span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Tutup
          </button>
          <button
            type="submit"
            className="flex-2 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Kirim Ulasan & Selesaikan</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
