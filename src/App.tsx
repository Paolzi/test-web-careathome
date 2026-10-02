import React, { useState, useEffect, useCallback } from 'react';
import { CareProvider, useCare } from './context/CareContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';

// Patient Views
import { PatientHero } from './components/patient/PatientHero';
import { ServiceCatalog } from './components/patient/ServiceCatalog';
import { PatientOrders } from './components/patient/PatientOrders';
import { BookingModal } from './components/patient/BookingModal';
import { PaymentModal } from './components/patient/PaymentModal';
import { EReportModal } from './components/patient/EReportModal';
import { RatingModal } from './components/patient/RatingModal';

// Nurse Views
import { NurseStatusBanner } from './components/nurse/NurseStatusBanner';
import { NurseOrderFeed } from './components/nurse/NurseOrderFeed';
import { NurseActiveTasks } from './components/nurse/NurseActiveTasks';
import { NurseWallet } from './components/nurse/NurseWallet';
import { EReportFormModal } from './components/nurse/EReportFormModal';

// Admin Views
import { AdminOverview } from './components/admin/AdminOverview';
import { NurseLegalAudit } from './components/admin/NurseLegalAudit';
import { ServiceCatalogCrud } from './components/admin/ServiceCatalogCrud';
import { EscrowMonitoring } from './components/admin/EscrowMonitoring';
import { PayoutManagement } from './components/admin/PayoutManagement';

// Figma Snapshot Navigator Helper
import { FigmaSnapshotNavigator, FIGMA_SCREENS } from './components/common/FigmaSnapshotNavigator';

// Types
import { Booking, MedicalService, UserRole } from './types';
import { HeartHandshake, CheckCircle2, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, switchUserById, services, bookings } = useCare();

  const [currentScreenId, setCurrentScreenId] = useState<string>('landing');
  const [activeTab, setActiveTab] = useState<string>('services');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authDefaultRole, setAuthDefaultRole] = useState<UserRole>('patient');
  const [isViewingLanding, setIsViewingLanding] = useState<boolean>(false);

  // Booking & Payment modals for patients
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<MedicalService | null>(null);
  const [activeBookingForPayment, setActiveBookingForPayment] = useState<Booking | null>(null);

  // Modals for Figma snapshot previews
  const [previewBookingForReport, setPreviewBookingForReport] = useState<Booking | null>(null);
  const [previewBookingForRating, setPreviewBookingForRating] = useState<Booking | null>(null);
  const [previewBookingForReportForm, setPreviewBookingForReportForm] = useState<Booking | null>(null);

  const closeAllModals = useCallback(() => {
    setIsAuthModalOpen(false);
    setSelectedServiceForBooking(null);
    setActiveBookingForPayment(null);
    setPreviewBookingForReport(null);
    setPreviewBookingForRating(null);
    setPreviewBookingForReportForm(null);
  }, []);

  const handleSelectScreen = useCallback(
    (screenId: string) => {
      setCurrentScreenId(screenId);
      if (window.location.hash !== '#' + screenId) {
        window.location.hash = '#' + screenId;
      }
      closeAllModals();

      const completedBooking =
        bookings.find((b) => b.status === 'COMPLETED' && b.eReport) || bookings[0];
      const pendingBooking =
        bookings.find((b) => b.status === 'PENDING_PAYMENT') || bookings[0];
      const activeBooking =
        bookings.find((b) => b.status === 'IN_PROGRESS' || b.status === 'EN_ROUTE') || bookings[0];
      const targetService = services[0] || null;

      switch (screenId) {
        // 1. Publik & Auth
        case 'landing':
          setIsViewingLanding(true);
          break;
        case 'auth-login':
          setIsViewingLanding(true);
          setIsAuthModalOpen(true);
          setAuthMode('login');
          setAuthDefaultRole('patient');
          break;
        case 'auth-register-patient':
          setIsViewingLanding(true);
          setIsAuthModalOpen(true);
          setAuthMode('register');
          setAuthDefaultRole('patient');
          break;
        case 'auth-register-nurse':
          setIsViewingLanding(true);
          setIsAuthModalOpen(true);
          setAuthMode('register');
          setAuthDefaultRole('nurse');
          break;

        // 2. Pasien
        case 'patient-services':
          switchUserById('usr-patient-01');
          setIsViewingLanding(false);
          setActiveTab('services');
          break;
        case 'patient-booking':
          switchUserById('usr-patient-01');
          setIsViewingLanding(false);
          setActiveTab('services');
          setSelectedServiceForBooking(targetService);
          break;
        case 'patient-payment':
          switchUserById('usr-patient-01');
          setIsViewingLanding(false);
          setActiveTab('orders');
          setActiveBookingForPayment(pendingBooking);
          break;
        case 'patient-orders':
          switchUserById('usr-patient-01');
          setIsViewingLanding(false);
          setActiveTab('orders');
          break;
        case 'patient-ereport':
          switchUserById('usr-patient-01');
          setIsViewingLanding(false);
          setActiveTab('orders');
          setPreviewBookingForReport(completedBooking);
          break;
        case 'patient-rating':
          switchUserById('usr-patient-01');
          setIsViewingLanding(false);
          setActiveTab('orders');
          setPreviewBookingForRating(completedBooking);
          break;

        // 3. Perawat
        case 'nurse-feed':
          switchUserById('usr-nurse-01');
          setIsViewingLanding(false);
          setActiveTab('feed');
          break;
        case 'nurse-active':
          switchUserById('usr-nurse-01');
          setIsViewingLanding(false);
          setActiveTab('active-task');
          break;
        case 'nurse-ereport-form':
          switchUserById('usr-nurse-01');
          setIsViewingLanding(false);
          setActiveTab('active-task');
          setPreviewBookingForReportForm(activeBooking);
          break;
        case 'nurse-wallet':
          switchUserById('usr-nurse-01');
          setIsViewingLanding(false);
          setActiveTab('wallet');
          break;

        // 4. Admin
        case 'admin-overview':
          switchUserById('usr-admin-01');
          setIsViewingLanding(false);
          setActiveTab('overview');
          break;
        case 'admin-verification':
          switchUserById('usr-admin-01');
          setIsViewingLanding(false);
          setActiveTab('verification');
          break;
        case 'admin-services':
          switchUserById('usr-admin-01');
          setIsViewingLanding(false);
          setActiveTab('services-crud');
          break;
        case 'admin-escrow':
          switchUserById('usr-admin-01');
          setIsViewingLanding(false);
          setActiveTab('escrow');
          break;
        case 'admin-payouts':
          switchUserById('usr-admin-01');
          setIsViewingLanding(false);
          setActiveTab('payouts');
          break;
        default:
          break;
      }
    },
    [bookings, services, switchUserById, closeAllModals]
  );

  const handleSelectScreenRef = React.useRef(handleSelectScreen);
  handleSelectScreenRef.current = handleSelectScreen;

  // Sync hash on initial load or browser forward/back
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && FIGMA_SCREENS.some((s) => s.id === hash)) {
        handleSelectScreenRef.current(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Auto-adjust default tab when user switches role
  useEffect(() => {
    if (!currentUser) {
      setIsViewingLanding(true);
    } else {
      setIsViewingLanding(false);
      if (currentUser.role === 'patient') {
        if (activeTab !== 'services' && activeTab !== 'orders') {
          setActiveTab('services');
        }
      } else if (currentUser.role === 'nurse') {
        if (activeTab !== 'feed' && activeTab !== 'active-task' && activeTab !== 'wallet') {
          setActiveTab('feed');
        }
      } else if (currentUser.role === 'admin') {
        if (
          activeTab !== 'overview' &&
          activeTab !== 'verification' &&
          activeTab !== 'services-crud' &&
          activeTab !== 'escrow' &&
          activeTab !== 'payouts'
        ) {
          setActiveTab('overview');
        }
      }
    }
  }, [currentUser?.role, currentUser?.id]);

  const handleOpenAuth = (mode: 'login' | 'register', defaultRole: UserRole = 'patient') => {
    setAuthMode(mode);
    setAuthDefaultRole(defaultRole);
    setIsAuthModalOpen(true);
  };

  const handleBookingCreated = (booking: Booking) => {
    setActiveBookingForPayment(booking);
  };

  const handlePaymentSuccess = () => {
    setActiveBookingForPayment(null);
    setActiveTab('orders');
  };

  const handleDemoRoleSelect = (userId: string, defaultTab: string) => {
    switchUserById(userId);
    setActiveTab(defaultTab);
    setIsViewingLanding(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-500 selection:text-white">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Navbar with brand HomeCare and prominent Login / Register buttons */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setIsViewingLanding(false);
          setActiveTab(tab);
        }}
        onOpenAuth={handleOpenAuth}
        onGoHome={() => setIsViewingLanding(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ================= LANDING PAGE VIEW (When not logged in or viewing landing) ================= */}
        {(!currentUser || isViewingLanding) ? (
          <LandingPage
            onOpenAuth={handleOpenAuth}
            onSelectService={(service) => {
              setSelectedServiceForBooking(service);
              if (!currentUser) {
                handleOpenAuth('login', 'patient');
              }
            }}
            onSelectDemoRole={handleDemoRoleSelect}
          />
        ) : (
          /* ================= LOGGED IN ROLE DASHBOARDS ================= */
          <div>
            {/* Quick banner indicating active persona */}
            <div className="mb-6 p-3 rounded-2xl bg-teal-50/90 border border-teal-200 flex items-center justify-between gap-3 text-xs text-teal-950">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse"></span>
                <span>
                  Sesi Aktif: <strong>{currentUser.name}</strong> ({currentUser.role.toUpperCase()})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsViewingLanding(true)}
                  className="font-bold text-teal-700 hover:text-teal-900 underline cursor-pointer"
                >
                  Kembali ke Landing Page
                </button>
              </div>
            </div>

            {/* ROLE 1: PASIEN */}
            {currentUser.role === 'patient' && (
              <div>
                {activeTab === 'services' && (
                  <div className="space-y-8 animate-fade-in">
                    <PatientHero
                      onExplore={() => {
                        const el = document.getElementById('service-catalog-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                    <ServiceCatalog
                      onSelectService={(service) => setSelectedServiceForBooking(service)}
                    />
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="animate-fade-in">
                    <PatientOrders />
                  </div>
                )}
              </div>
            )}

            {/* ROLE 2: PERAWAT */}
            {currentUser.role === 'nurse' && (
              <div className="space-y-6 animate-fade-in">
                <NurseStatusBanner />

                {activeTab === 'feed' && (
                  <NurseOrderFeed
                    onOrderAccepted={() => setActiveTab('active-task')}
                  />
                )}

                {activeTab === 'active-task' && <NurseActiveTasks />}

                {activeTab === 'wallet' && <NurseWallet />}
              </div>
            )}

            {/* ROLE 3: ADMIN */}
            {currentUser.role === 'admin' && (
              <div className="space-y-6 animate-fade-in">
                {activeTab === 'overview' && (
                  <AdminOverview onNavigate={(tab) => setActiveTab(tab)} />
                )}

                {activeTab === 'verification' && <NurseLegalAudit />}

                {activeTab === 'services-crud' && <ServiceCatalogCrud />}

                {activeTab === 'escrow' && <EscrowMonitoring />}

                {activeTab === 'payouts' && <PayoutManagement />}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Patient Modals */}
      <BookingModal
        isOpen={Boolean(selectedServiceForBooking)}
        onClose={() => setSelectedServiceForBooking(null)}
        service={selectedServiceForBooking}
        onBookingCreated={handleBookingCreated}
      />

      <PaymentModal
        isOpen={Boolean(activeBookingForPayment)}
        onClose={() => setActiveBookingForPayment(null)}
        booking={activeBookingForPayment}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Auth Modal with Initial Mode & Role support */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        defaultRole={authDefaultRole}
      />

      {/* Figma Snapshot Preview Modals */}
      <EReportModal
        isOpen={Boolean(previewBookingForReport)}
        onClose={() => setPreviewBookingForReport(null)}
        booking={previewBookingForReport}
      />

      <RatingModal
        isOpen={Boolean(previewBookingForRating)}
        onClose={() => setPreviewBookingForRating(null)}
        booking={previewBookingForRating}
      />

      <EReportFormModal
        isOpen={Boolean(previewBookingForReportForm)}
        onClose={() => setPreviewBookingForReportForm(null)}
        booking={previewBookingForReportForm}
      />

      {/* Floating Figma Snapshot Navigator */}
      <FigmaSnapshotNavigator
        currentScreenId={currentScreenId}
        onSelectScreen={handleSelectScreen}
      />

      {/* Footer with HomeCare branding */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Home<span className="text-teal-400">Care</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Platform pemesanan perawat medis bersertifikat terintegrasi pendukung target <strong>UN SDG 3 (Kehidupan Sehat & Sejahtera)</strong>. Layanan asuhan keperawatan mandiri di rumah dengan jaminan escrow terpercaya.
              </p>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Layanan Klinis Unggulan
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li>Perawatan Luka Diabetes & Ulkus</li>
                <li>Pemasangan Kateter Urine Foley</li>
                <li>Pemberian Infus & Nutrisi Parenteral</li>
                <li>Terapi Nebulizer Asma & PPOK</li>
                <li>Fisioterapi Pascastroke & Mobilisasi</li>
              </ul>
            </div>

            {/* Col 3: Compliance & Security */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Legalitas & Escrow
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Verifikasi STR & SIP Nakes Resmi
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Rekening Escrow Penampung Terlindungi
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  E-Report Rekam Medis Standar PPNI
                </li>
                <li className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Pencairan Dompet Nakes 85% Bersih
                </li>
              </ul>
            </div>

            {/* Col 4: SDG 3 Impact */}
            <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-800/60">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4" />
                <span>UN SDG 3 Commitment</span>
              </div>
              <p className="text-[11px] text-teal-100/80 leading-relaxed">
                Menjamin akses universal terhadap asuhan kesehatan berkualitas, terjangkau, dan humanis di lingkungan rumah pasien.
              </p>
              <div className="mt-3 text-[10px] text-teal-400 font-mono">
                HomeCare Indonesia • 2026
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div>
              &copy; 2026 HomeCare Medical Network. Hak Cipta Dilindungi.
            </div>
            <div className="flex items-center gap-4">
              <span>Syarat & Ketentuan</span>
              <span>Kebijakan Privasi Medis</span>
              <span>Standar Keperawatan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CareProvider>
      <MainContent />
    </CareProvider>
  );
}
