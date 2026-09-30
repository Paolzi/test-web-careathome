import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Power,
  Clock,
  DollarSign,
  Activity,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { CareLevel, MedicalService } from '../../types';
import { CareLevelBadge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const ServiceCatalogCrud: React.FC = () => {
  const { services, adminAddService, adminUpdateService, adminToggleService } = useCare();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<MedicalService | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number>(100000);
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [careLevel, setCareLevel] = useState<CareLevel>('Menengah');
  const [iconName, setIconName] = useState('Activity');

  const openAddModal = () => {
    setName('');
    setCategory('General Care');
    setPrice(120000);
    setDescription('');
    setDurationMinutes(40);
    setCareLevel('Menengah');
    setIconName('Activity');
    setIsAddModalOpen(true);
  };

  const openEditModal = (s: MedicalService) => {
    setEditingService(s);
    setName(s.name);
    setCategory(s.category);
    setPrice(s.price);
    setDescription(s.description);
    setDurationMinutes(s.durationMinutes);
    setCareLevel(s.careLevel);
    setIconName(s.iconName);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminAddService({
      name,
      category,
      price: Number(price),
      description,
      durationMinutes: Number(durationMinutes),
      careLevel,
      iconName,
    });
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    adminUpdateService(editingService.id, {
      name,
      category,
      price: Number(price),
      description,
      durationMinutes: Number(durationMinutes),
      careLevel,
      iconName,
    });
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-600" />
            <span>Master Data Katalog Layanan & Tarif Medis</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola tindakan medis, penyesuaian tarif dasar, durasi tindakan, dan ketersediaan layanan
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Nama Tindakan & Kategori</th>
                <th className="px-4 py-4">Tingkat Tindakan</th>
                <th className="px-4 py-4">Durasi Sesi</th>
                <th className="px-4 py-4">Tarif Pasien (Rp)</th>
                <th className="px-4 py-4">Honor Nakes (85%)</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-5 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900 text-sm">{service.name}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Kategori: <strong className="text-slate-600">{service.category}</strong>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <CareLevelBadge level={service.careLevel} />
                  </td>

                  <td className="px-4 py-4 text-slate-700 font-semibold">
                    ± {service.durationMinutes} Menit
                  </td>

                  <td className="px-4 py-4 font-bold text-slate-900">
                    Rp {service.price.toLocaleString('id-ID')}
                  </td>

                  <td className="px-4 py-4 font-bold text-emerald-700">
                    Rp {Math.round(service.price * 0.85).toLocaleString('id-ID')}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        service.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {service.isActive ? 'AKTIF' : 'NONAKTIF'}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(service)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-slate-50 transition-colors"
                        title="Edit Layanan"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => adminToggleService(service.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          service.isActive
                            ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                            : 'border-slate-300 text-slate-400 hover:bg-slate-100'
                        }`}
                        title={service.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Tindakan Medis Baru"
        maxWidth="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Tindakan Medis
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Perawatan Luka Pascaoperasi"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Layanan
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Wound Care / General"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Tindakan
              </label>
              <select
                value={careLevel}
                onChange={(e) => setCareLevel(e.target.value as CareLevel)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              >
                <option value="Dasar">Dasar</option>
                <option value="Menengah">Menengah</option>
                <option value="Intensif">Intensif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tarif Dasar Tindakan (Rp)
              </label>
              <input
                type="number"
                min={50000}
                step={5000}
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-[10px] text-slate-400">
                Honor Nakes (85%): Rp {Math.round(price * 0.85).toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimasi Durasi (Menit)
              </label>
              <input
                type="number"
                min={15}
                max={180}
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi Prosedur Medis
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan standar operasional prosedur aseptik dan peralatan yang dibawa perawat..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs"
            >
              Simpan Layanan Baru
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={Boolean(editingService)}
        onClose={() => setEditingService(null)}
        title="Edit Master Layanan Medis"
        maxWidth="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Tindakan Medis
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Tindakan
              </label>
              <select
                value={careLevel}
                onChange={(e) => setCareLevel(e.target.value as CareLevel)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              >
                <option value="Dasar">Dasar</option>
                <option value="Menengah">Menengah</option>
                <option value="Intensif">Intensif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tarif Dasar Tindakan (Rp)
              </label>
              <input
                type="number"
                min={50000}
                step={5000}
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
              <span className="text-[10px] text-slate-400">
                Honor Nakes (85%): Rp {Math.round(price * 0.85).toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Durasi (Menit)
              </label>
              <input
                type="number"
                min={15}
                max={180}
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi Prosedur
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs"
            >
              Perbarui Layanan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
