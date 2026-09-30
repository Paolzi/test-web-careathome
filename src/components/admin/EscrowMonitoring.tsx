import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  CreditCard,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { BookingStatusBadge, EscrowBadge } from '../common/Badge';

export const EscrowMonitoring: React.FC = () => {
  const { bookings, metrics } = useCare();
  const [search, setSearch] = useState('');
  const [escrowFilter, setEscrowFilter] = useState<'ALL' | 'HELD' | 'RELEASED'>('ALL');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      b.patientName.toLowerCase().includes(search.toLowerCase()) ||
      (b.nurseName && b.nurseName.toLowerCase().includes(search.toLowerCase())) ||
      b.serviceName.toLowerCase().includes(search.toLowerCase());

    const matchesEscrow = escrowFilter === 'ALL' || b.escrowStatus === escrowFilter;
    return matchesSearch && matchesEscrow;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-6 h-6 text-purple-600" />
            <span>Audit Trail & Monitoring Rekening Escrow</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pengawasan dana proteksi pihak ketiga yang ditampung secara aman sebelum kunjungan nakes terverifikasi tuntas
          </p>
        </div>

        {/* Escrow Highlight Pill */}
        <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl flex items-center gap-3">
          <Lock className="w-4 h-4 text-amber-600" />
          <div>
            <span className="text-[10px] text-amber-800 font-bold uppercase block">
              Dana Tertampung di Escrow
            </span>
            <span className="text-base font-black text-amber-950">
              Rp {metrics.totalEscrowHeld.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID Pesanan, Pasien, atau Perawat..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold shrink-0">
          <button
            onClick={() => setEscrowFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              escrowFilter === 'ALL' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Semua ({bookings.length})
          </button>
          <button
            onClick={() => setEscrowFilter('HELD')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              escrowFilter === 'HELD' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Terkunci (Held)
          </button>
          <button
            onClick={() => setEscrowFilter('RELEASED')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              escrowFilter === 'RELEASED' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Dilepas (Released)
          </button>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Kode Transaksi</th>
                <th className="px-4 py-4">Pasien / Pemesan</th>
                <th className="px-4 py-4">Tindakan Medis</th>
                <th className="px-4 py-4">Perawat</th>
                <th className="px-4 py-4">Metode Bayar</th>
                <th className="px-4 py-4">Nominal Escrow</th>
                <th className="px-4 py-4">Status Transaksi</th>
                <th className="px-5 py-4">Status Escrow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-slate-800">
                    {b.bookingCode}
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {new Date(b.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{b.patientName}</div>
                    <div className="text-slate-400 text-[10px]">{b.patientPhone}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-800">{b.serviceName}</div>
                    <div className="text-[10px] text-slate-400">
                      Jadwal: {b.scheduledDate} {b.scheduledTime}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {b.nurseName ? (
                      <span className="font-semibold text-teal-800">{b.nurseName}</span>
                    ) : (
                      <span className="text-slate-400 italic">Belum Ada Nakes</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700">
                      {b.paymentMethod || 'PENDING'}
                    </span>
                  </td>

                  <td className="px-4 py-4 font-bold text-slate-900">
                    Rp {b.totalPrice.toLocaleString('id-ID')}
                  </td>

                  <td className="px-4 py-4">
                    <BookingStatusBadge status={b.status} />
                  </td>

                  <td className="px-5 py-4">
                    <EscrowBadge status={b.escrowStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
