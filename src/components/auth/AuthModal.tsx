import React, { useState } from 'react';
import {
  HeartHandshake,
  User,
  Stethoscope,
  Shield,
  Upload,
  Eye,
  EyeOff,
  CheckCircle2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useCare } from '../../context/CareContext';
import { Modal } from '../common/Modal';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  defaultRole = 'patient',
}) => {
  const { login, registerPatient, registerNurse } = useCare();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(defaultRole);
    }
  }, [isOpen, initialMode, defaultRole]);

  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Common Register States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Patient Register States
  const [regAddress, setRegAddress] = useState('');
  const [regAllergies, setRegAllergies] = useState('');
  const [regSpecialConditions, setRegSpecialConditions] = useState('');

  // Nurse Register States
  const [regDegree, setRegDegree] = useState('S.Kep., Ns.');
  const [regStrNumber, setRegStrNumber] = useState('');
  const [regSipNumber, setRegSipNumber] = useState('');
  const [regExperienceYears, setRegExperienceYears] = useState(3);
  const [regDocumentPreview, setRegDocumentPreview] = useState(
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80'
  );

  // Demo 1-Click Autofill
  const fillDemoAccount = (role: UserRole, status?: string) => {
    setSelectedRole(role);
    setMode('login');
    if (role === 'patient') {
      setLoginEmail('pasien.hendra@gmail.com');
      setLoginPassword('pasien123');
    } else if (role === 'nurse') {
      if (status === 'pending') {
        setLoginEmail('nurse.anita@homecare.id');
        setLoginPassword('perawat123');
      } else {
        setLoginEmail('nurse.budi@homecare.id');
        setLoginPassword('perawat123');
      }
    } else if (role === 'admin') {
      setLoginEmail('admin@homecare.id');
      setLoginPassword('admin123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, selectedRole);
    if (success) {
      onClose();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    if (selectedRole === 'patient') {
      const ok = registerPatient({
        name: regName,
        email: regEmail,
        phone: regPhone,
        address: regAddress,
        allergies: regAllergies,
        specialConditions: regSpecialConditions,
      });
      if (ok) onClose();
    } else if (selectedRole === 'nurse') {
      const ok = registerNurse({
        name: regName,
        degree: regDegree,
        email: regEmail,
        phone: regPhone,
        strNumber: regStrNumber,
        sipNumber: regSipNumber,
        experienceYears: Number(regExperienceYears),
        documentUrl: regDocumentPreview,
      });
      if (ok) onClose();
    }
  };

  const handleMockFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setRegDocumentPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span>Portal Akses HomeCare</span>
        </div>
      }
      subtitle="Masuk atau daftarkan akun baru Anda sebagai Pasien, Nakes, atau Admin"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Mode Switcher: Login / Register */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
              mode === 'login'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Masuk ke Akun
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all ${
              mode === 'register'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Pendaftaran Baru
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Pilih Peran Pengguna
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedRole('patient')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'patient'
                  ? 'border-teal-600 bg-teal-50/80 text-teal-900 font-bold shadow-xs ring-1 ring-teal-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <User className="w-5 h-5 text-teal-600" />
              <span className="text-xs">Pasien / Keluarga</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('nurse')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'nurse'
                  ? 'border-teal-600 bg-teal-50/80 text-teal-900 font-bold shadow-xs ring-1 ring-teal-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <span className="text-xs">Perawat Homecare</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('admin')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedRole === 'admin'
                  ? 'border-purple-600 bg-purple-50/80 text-purple-900 font-bold shadow-xs ring-1 ring-purple-500'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="text-xs">Admin & Finance</span>
            </button>
          </div>
        </div>

        {/* 1-Click Quick Demo Accounts Helper */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>1-Click Akun Demo Cepat:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('patient')}
              className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-700 transition-all text-center"
            >
              Pasien (Hendra)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('nurse', 'verified')}
              className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-700 transition-all text-center"
            >
              Perawat (Ns. Budi)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('nurse', 'pending')}
              className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-amber-500 hover:text-amber-700 transition-all text-center"
            >
              Perawat (Ns. Anita)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('admin')}
              className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-purple-500 hover:text-purple-700 transition-all text-center"
            >
              Admin (Siti)
            </button>
          </div>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Pengguna
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/30 transition-all mt-2"
            >
              Masuk Sekarang
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {selectedRole === 'admin' ? (
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs leading-relaxed">
                <strong>Catatan Admin:</strong> Akun Administrator hanya dibuat oleh tim operasional internal. Gunakan akun demo default <code>admin@homecare.id</code> untuk menguji panel audit dan finansial.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder={selectedRole === 'nurse' ? 'Ns. Dewi Lestari, S.Kep.' : 'Budi Hartono'}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {selectedRole === 'nurse' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gelar Keperawatan
                      </label>
                      <input
                        type="text"
                        required
                        value={regDegree}
                        onChange={(e) => setRegDegree(e.target.value)}
                        placeholder="S.Kep., Ns. / Amd.Kep."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor HP / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Patient-specific fields */}
                {selectedRole === 'patient' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Alamat Domisili Lengkap (Untuk Kunjungan Nakes)
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="Jl. Raya Darmo No. 12, RT 02/RW 01, Surabaya..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Riwayat Alergi (Opsional)
                        </label>
                        <input
                          type="text"
                          value={regAllergies}
                          onChange={(e) => setRegAllergies(e.target.value)}
                          placeholder="Alergi penisilin, plester, dll."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Kondisi Khusus / Riwayat Sakit
                        </label>
                        <input
                          type="text"
                          value={regSpecialConditions}
                          onChange={(e) => setRegSpecialConditions(e.target.value)}
                          placeholder="Pascastroke, diabetes, dll."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Nurse-specific fields */}
                {selectedRole === 'nurse' && (
                  <div className="space-y-3 p-3.5 bg-teal-50/50 rounded-xl border border-teal-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor STR Perawat Aktif
                        </label>
                        <input
                          type="text"
                          required
                          value={regStrNumber}
                          onChange={(e) => setRegStrNumber(e.target.value)}
                          placeholder="19920315-STR-2024"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor SIP / SIKP
                        </label>
                        <input
                          type="text"
                          required
                          value={regSipNumber}
                          onChange={(e) => setRegSipNumber(e.target.value)}
                          placeholder="446/SIP.N/2024/DKS"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Pengalaman Kerja (Tahun)
                        </label>
                        <input
                          type="number"
                          min={1}
                          required
                          value={regExperienceYears}
                          onChange={(e) => setRegExperienceYears(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                        />
                      </div>
                    </div>

                    {/* Mock STR/SIP Upload Preview */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Unggah Foto Dokumen STR / SIP (Audit Legalitas)
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-3 py-2 bg-white border border-teal-400 rounded-lg text-xs font-semibold text-teal-700 hover:bg-teal-50 flex items-center gap-1.5 shrink-0">
                          <Upload className="w-4 h-4" /> Pilih File Gambar/PDF
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                            onChange={handleMockFileUpload}
                          />
                        </label>
                        {regDocumentPreview && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-2.5 py-1.5 rounded-lg border">
                            <FileText className="w-4 h-4 text-teal-600" />
                            <span className="truncate max-w-[200px]">Dokumen_STR_SIP.pdf</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        *Akun perawat baru akan berstatus <strong>PENDING_VERIFICATION</strong> hingga diaudit oleh Admin.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Konfirmasi Kata Sandi
                    </label>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Ketik ulang kata sandi"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/30 transition-all mt-2"
                >
                  Daftar Sebagai {selectedRole === 'nurse' ? 'Perawat' : 'Pasien'}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </Modal>
  );
};
