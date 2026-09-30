import React, { useState } from 'react';
import {
  Search,
  Clock,
  Activity,
  Stethoscope,
  Syringe,
  Wind,
  HeartPulse,
  CheckCircle2,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { CareLevel, MedicalService } from '../../types';
import { CareLevelBadge } from '../common/Badge';

interface ServiceCatalogProps {
  onSelectService: (service: MedicalService) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onSelectService }) => {
  const { services } = useCare();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(250000);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'Syringe':
        return <Syringe className="w-6 h-6 text-teal-600" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-teal-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-teal-600" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-teal-600" />;
    }
  };

  const filteredServices = services.filter((s) => {
    if (!s.isActive) return false;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || s.careLevel === selectedLevel;
    const matchesPrice = s.price <= maxPrice;
    return matchesSearch && matchesLevel && matchesPrice;
  });

  return (
    <section className="space-y-6" id="service-catalog-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Katalog Layanan Keperawatan Rumah
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pilih tindakan medis sesuai resep dokter atau kebutuhan asuhan keperawatan keluarga Anda
          </p>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {(['all', 'Dasar', 'Menengah', 'Intensif'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === level
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {level === 'all' ? 'Semua Tingkat' : level}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Price Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tindakan (contoh: luka diabetes, infus, kateter, nebulizer)..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
          <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Maksimal Tarif:</span>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200">
            Rp {maxPrice.toLocaleString('id-ID')}
          </span>
          <input
            type="range"
            min={75000}
            max={250000}
            step={25000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-28 sm:w-36 accent-teal-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Service Cards Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">Tidak ada layanan yang cocok</h3>
          <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau batas tarif Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all hover:border-teal-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <CareLevelBadge level={service.careLevel} />
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 mt-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ± {service.durationMinutes} Menit
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Kategori: <strong>{service.category}</strong>
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                    Tarif Tindakan
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    Rp {service.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs shadow-teal-600/30 transition-all flex items-center gap-1.5 transform active:scale-95"
                >
                  <span>Pesan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
