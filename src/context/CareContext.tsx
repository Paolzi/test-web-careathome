import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Booking,
  BookingStatus,
  CareLevel,
  EReportVitalSigns,
  MedicalService,
  PaymentMethod,
  ToastMessage,
  User,
  UserRole,
  Withdrawal,
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_SERVICES,
  INITIAL_USERS,
  INITIAL_WITHDRAWALS,
} from '../data/initialData';

interface CareContextType {
  currentUser: User | null;
  users: User[];
  services: MedicalService[];
  bookings: Booking[];
  withdrawals: Withdrawal[];
  toasts: ToastMessage[];

  // Toast
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Auth
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchUserById: (userId: string) => void;
  registerPatient: (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    allergies?: string;
    specialConditions?: string;
  }) => boolean;
  registerNurse: (data: {
    name: string;
    degree: string;
    email: string;
    phone: string;
    strNumber: string;
    sipNumber: string;
    experienceYears: number;
    documentUrl?: string;
  }) => boolean;
  resetAllData: () => void;

  // Nurse Actions
  toggleNurseOnline: (nurseId: string) => void;
  nurseAcceptBooking: (bookingId: string, nurseId: string) => void;
  nurseRejectBooking: (bookingId: string) => void;
  nurseUpdateBookingStatus: (bookingId: string, status: 'EN_ROUTE' | 'IN_PROGRESS') => void;
  nurseSubmitEReport: (
    bookingId: string,
    report: Omit<EReportVitalSigns, 'submittedAt'>
  ) => void;
  nurseRequestWithdrawal: (
    nurseId: string,
    amount: number,
    bankName: string,
    accountNumber: string,
    accountHolder: string
  ) => boolean;

  // Patient Actions
  createBooking: (data: {
    patientId: string;
    serviceId: string;
    scheduledDate: string;
    scheduledTime: string;
    complaints: string;
    address?: string;
    phone?: string;
  }) => Booking | null;
  payBooking: (bookingId: string, paymentMethod: PaymentMethod) => void;
  patientConfirmAndRate: (
    bookingId: string,
    rating: number,
    comment: string
  ) => void;

  // Admin Actions
  adminApproveNurse: (nurseId: string) => void;
  adminRejectNurse: (nurseId: string, reason: string) => void;
  adminAddService: (service: Omit<MedicalService, 'id' | 'isActive'>) => void;
  adminUpdateService: (serviceId: string, updates: Partial<MedicalService>) => void;
  adminToggleService: (serviceId: string) => void;
  adminApproveWithdrawal: (withdrawalId: string, referenceNumber: string) => void;
  adminRejectWithdrawal: (withdrawalId: string, reason: string) => void;

  // Financial & KPI Metrics
  metrics: {
    totalGMV: number;
    platformNetRevenue: number;
    completedVisits: number;
    totalEscrowHeld: number;
    totalNurses: number;
    verifiedNurses: number;
    pendingNurses: number;
  };
}

const STORAGE_KEY = 'homecare_db_v2';

const CareContext = createContext<CareContextType | undefined>(undefined);

export const CareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state initialization
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [services, setServices] = useState<MedicalService[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_withdrawals`);
    return saved ? JSON.parse(saved) : INITIAL_WITHDRAWALS;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_current_user_id`);
    return saved || null; // Start on landing page when not logged in
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_withdrawals`, JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(`${STORAGE_KEY}_current_user_id`, currentUserId);
    } else {
      localStorage.removeItem(`${STORAGE_KEY}_current_user_id`);
    }
  }, [currentUserId]);

  const currentUser = useMemo(() => {
    return users.find((u) => u.id === currentUserId) || null;
  }, [users, currentUserId]);

  // Toast Helper
  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#0284C7', '#10B981', '#F59E0B'],
      });
    } catch {
      // safe fallback
    }
  };

  // Auth Operations
  const login = (email: string, role?: UserRole): boolean => {
    const targetUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && (!role || u.role === role)
    );
    if (targetUser) {
      setCurrentUserId(targetUser.id);
      addToast('success', 'Berhasil Masuk', `Selamat datang kembali, ${targetUser.name}!`);
      return true;
    }
    addToast('error', 'Gagal Masuk', 'Kredensial atau peran yang Anda pilih tidak ditemukan.');
    return false;
  };

  const logout = () => {
    setCurrentUserId(null);
    addToast('info', 'Telah Keluar', 'Sesi Anda telah diakhiri dengan aman.');
  };

  const switchUserById = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      addToast('info', 'Beralih Akun (Demo)', `Kini Anda bertindak sebagai: ${target.name} (${target.role.toUpperCase()})`);
    }
  };

  const registerPatient = (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    allergies?: string;
    specialConditions?: string;
  }): boolean => {
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      addToast('error', 'Email Sudah Terdaftar', 'Silakan gunakan email lain atau langsung masuk.');
      return false;
    }

    const newUser: User = {
      id: `usr-patient-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'patient',
      phone: data.phone,
      address: data.address,
      allergies: data.allergies || 'Tidak ada riwayat alergi',
      specialConditions: data.specialConditions || 'Tidak ada kondisi khusus',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    triggerCelebration();
    addToast('success', 'Registrasi Pasien Berhasil', 'Akun pasien Anda telah aktif dan siap memesan layanan.');
    return true;
  };

  const registerNurse = (data: {
    name: string;
    degree: string;
    email: string;
    phone: string;
    strNumber: string;
    sipNumber: string;
    experienceYears: number;
    documentUrl?: string;
  }): boolean => {
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      addToast('error', 'Email Sudah Terdaftar', 'Silakan gunakan email lain atau masuk.');
      return false;
    }

    const newNurse: User = {
      id: `usr-nurse-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: 'nurse',
      degree: data.degree,
      phone: data.phone,
      strNumber: data.strNumber,
      sipNumber: data.sipNumber,
      experienceYears: data.experienceYears,
      documentUrl:
        data.documentUrl ||
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
      verificationStatus: 'PENDING_VERIFICATION',
      isOnline: false,
      balance: 0,
      rating: 0,
      reviewCount: 0,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newNurse]);
    setCurrentUserId(newNurse.id);
    addToast(
      'warning',
      'Pendaftaran Menunggu Verifikasi',
      'Data STR/SIP Anda sedang dalam peninjauan oleh tim Admin HomeCare.'
    );
    return true;
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_users`);
    localStorage.removeItem(`${STORAGE_KEY}_services`);
    localStorage.removeItem(`${STORAGE_KEY}_bookings`);
    localStorage.removeItem(`${STORAGE_KEY}_withdrawals`);
    localStorage.removeItem(`${STORAGE_KEY}_current_user_id`);

    setUsers(INITIAL_USERS);
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setWithdrawals(INITIAL_WITHDRAWALS);
    setCurrentUserId(null); // Reset back to landing page

    addToast('info', 'Reset Database', 'Semua data dan skenario demo telah dikembalikan ke kondisi awal.');
  };

  // Nurse Actions
  const toggleNurseOnline = (nurseId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === nurseId && u.role === 'nurse') {
          if (u.verificationStatus !== 'APPROVED') {
            addToast('warning', 'Akun Belum Terverifikasi', 'Anda harus menunggu persetujuan Admin sebelum dapat Online.');
            return u;
          }
          const nextState = !u.isOnline;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? 'Status: Siap Bertugas (Online)' : 'Status: Sedang Istirahat (Offline)',
            nextState
              ? 'Anda kini dapat menerima order kunjungan baru dari pasien.'
              : 'Order baru tidak akan diteruskan ke akun Anda sementara waktu.'
          );
          return { ...u, isOnline: nextState };
        }
        return u;
      })
    );
  };

  const nurseAcceptBooking = (bookingId: string, nurseId: string) => {
    const nurse = users.find((u) => u.id === nurseId);
    if (!nurse || nurse.verificationStatus !== 'APPROVED') {
      addToast('error', 'Akses Ditolak', 'Hanya perawat terverifikasi yang dapat menerima order.');
      return;
    }

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'ACCEPTED',
            nurseId: nurse.id,
            nurseName: nurse.name,
            nurseDegree: nurse.degree,
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );

    triggerCelebration();
    addToast('success', 'Order Diterima!', 'Silakan periksa detail alamat dan segera lakukan kontak dengan pasien.');
  };

  const nurseRejectBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'PAID', // Keep PAID in pool for another nurse
            nurseId: undefined,
            nurseName: undefined,
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );
    addToast('info', 'Order Dilepaskan', 'Order telah dikembalikan ke feed untuk perawat lain.');
  };

  const nurseUpdateBookingStatus = (bookingId: string, status: 'EN_ROUTE' | 'IN_PROGRESS') => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status, updatedAt: new Date().toISOString() };
        }
        return b;
      })
    );

    if (status === 'EN_ROUTE') {
      addToast('info', 'Menuju Lokasi', 'Status diperbarui: Anda sedang dalam perjalanan ke rumah pasien.');
    } else {
      addToast('info', 'Tindakan Berlangsung', 'Status diperbarui: Tindakan medis asuhan keperawatan dimulai.');
    }
  };

  const nurseSubmitEReport = (
    bookingId: string,
    reportData: Omit<EReportVitalSigns, 'submittedAt'>
  ) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    const fullReport: EReportVitalSigns = {
      ...reportData,
      submittedAt: new Date().toISOString(),
    };

    // Update booking to completed
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'COMPLETED',
            escrowStatus: 'RELEASED',
            eReport: fullReport,
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );

    // Release 85% earnings into nurse active balance
    const earnings = targetBooking.nurseEarnings;
    if (targetBooking.nurseId) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === targetBooking.nurseId) {
            return {
              ...u,
              balance: (u.balance || 0) + earnings,
            };
          }
          return u;
        })
      );
    }

    triggerCelebration();
    addToast(
      'success',
      'E-Report Berhasil Disimpan & Order Selesai!',
      `Honor tindakan sebesar Rp ${earnings.toLocaleString('id-ID')} telah dikreditkan ke dompet Anda.`
    );
  };

  const nurseRequestWithdrawal = (
    nurseId: string,
    amount: number,
    bankName: string,
    accountNumber: string,
    accountHolder: string
  ): boolean => {
    const nurse = users.find((u) => u.id === nurseId);
    if (!nurse) return false;

    const currentBalance = nurse.balance || 0;
    if (amount <= 0 || amount > currentBalance) {
      addToast('error', 'Saldo Tidak Mencukupi', 'Nominal penarikan melebihi saldo aktif Anda.');
      return false;
    }

    // Deduct nurse balance immediately
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === nurseId) {
          return { ...u, balance: (u.balance || 0) - amount };
        }
        return u;
      })
    );

    const newWithdrawal: Withdrawal = {
      id: `wd-${Date.now()}`,
      withdrawalCode: `WD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      nurseId,
      nurseName: nurse.name,
      amount,
      bankName,
      accountNumber,
      accountHolder,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setWithdrawals((prev) => [newWithdrawal, ...prev]);
    addToast(
      'success',
      'Pengajuan Penarikan Terkirim',
      `Permintaan tarik saldo Rp ${amount.toLocaleString('id-ID')} ke rekening ${bankName} berstatus PENDING.`
    );
    return true;
  };

  // Patient Actions
  const createBooking = (data: {
    patientId: string;
    serviceId: string;
    scheduledDate: string;
    scheduledTime: string;
    complaints: string;
    address?: string;
    phone?: string;
  }): Booking | null => {
    const service = services.find((s) => s.id === data.serviceId);
    const patient = users.find((u) => u.id === data.patientId);

    if (!service || !patient) {
      addToast('error', 'Pemesanan Gagal', 'Data layanan atau pasien tidak valid.');
      return null;
    }

    const platformFee = 5000;
    const totalPrice = service.price + platformFee;
    const nurseEarnings = Math.round(service.price * 0.85);

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode: `HC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: data.phone || patient.phone || '',
      patientAddress: data.address || patient.address || 'Alamat Belum Diisi',
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      platformFee,
      totalPrice,
      nurseEarnings,
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      complaints: data.complaints,
      status: 'PENDING_PAYMENT',
      escrowStatus: 'HELD',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    addToast('info', 'Pemesanan Dibuat', 'Silakan selesaikan pembayaran untuk memanggil perawat terdekat.');
    return newBooking;
  };

  const payBooking = (bookingId: string, paymentMethod: PaymentMethod) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'PAID',
            escrowStatus: 'HELD',
            paymentMethod,
            paymentDate: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );

    triggerCelebration();
    addToast(
      'success',
      'Pembayaran Berhasil Diterima!',
      'Dana Anda aman dalam Escrow HomeCare. Sistem sedang menyiarkan order ke nakes terdekat.'
    );
  };

  const patientConfirmAndRate = (
    bookingId: string,
    rating: number,
    comment: string
  ) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            review: {
              rating,
              comment,
              createdAt: new Date().toISOString(),
            },
            updatedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );

    // Update nurse rating in users table
    if (booking.nurseId) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === booking.nurseId) {
            const curCount = u.reviewCount || 0;
            const curRating = u.rating || 5;
            const newCount = curCount + 1;
            const newRating = Number(((curRating * curCount + rating) / newCount).toFixed(1));
            return {
              ...u,
              reviewCount: newCount,
              rating: newRating,
            };
          }
          return u;
        })
      );
    }

    triggerCelebration();
    addToast('success', 'Ulasan Terkirim', 'Terima kasih atas penilaian Anda terhadap layanan nakes!');
  };

  // Admin Actions
  const adminApproveNurse = (nurseId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === nurseId && u.role === 'nurse') {
          return {
            ...u,
            verificationStatus: 'APPROVED',
            rejectionReason: undefined,
          };
        }
        return u;
      })
    );
    triggerCelebration();
    addToast('success', 'Perawat Disetujui!', 'Legalitas STR/SIP telah divalidasi. Perawat kini dapat online.');
  };

  const adminRejectNurse = (nurseId: string, reason: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === nurseId && u.role === 'nurse') {
          return {
            ...u,
            verificationStatus: 'REJECTED',
            rejectionReason: reason,
            isOnline: false,
          };
        }
        return u;
      })
    );
    addToast('warning', 'Pendaftaran Perawat Ditolak', `Alasan: ${reason}`);
  };

  const adminAddService = (serviceData: Omit<MedicalService, 'id' | 'isActive'>) => {
    const newService: MedicalService = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      isActive: true,
    };
    setServices((prev) => [...prev, newService]);
    addToast('success', 'Layanan Ditambahkan', `Layanan medis "${newService.name}" siap dipesan.`);
  };

  const adminUpdateService = (serviceId: string, updates: Partial<MedicalService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, ...updates } : s))
    );
    addToast('success', 'Katalog Diperbarui', 'Perubahan tarif atau informasi layanan telah disimpan.');
  };

  const adminToggleService = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const nextActive = !s.isActive;
          addToast(
            'info',
            'Status Layanan Berubah',
            `Layanan "${s.name}" kini ${nextActive ? 'AKTIF' : 'NONAKTIF'}.`
          );
          return { ...s, isActive: nextActive };
        }
        return s;
      })
    );
  };

  const adminApproveWithdrawal = (withdrawalId: string, referenceNumber: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => {
        if (w.id === withdrawalId) {
          return {
            ...w,
            status: 'TRANSFERRED',
            transferReference: referenceNumber,
            updatedAt: new Date().toISOString(),
          };
        }
        return w;
      })
    );
    triggerCelebration();
    addToast(
      'success',
      'Pencairan Dana Berhasil',
      `Dana telah ditransfer ke nakes dengan No. Ref: ${referenceNumber}`
    );
  };

  const adminRejectWithdrawal = (withdrawalId: string, reason: string) => {
    const target = withdrawals.find((w) => w.id === withdrawalId);
    if (!target) return;

    // Refund amount back to nurse balance
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === target.nurseId) {
          return { ...u, balance: (u.balance || 0) + target.amount };
        }
        return u;
      })
    );

    setWithdrawals((prev) =>
      prev.map((w) => {
        if (w.id === withdrawalId) {
          return {
            ...w,
            status: 'REJECTED',
            rejectionReason: reason,
            updatedAt: new Date().toISOString(),
          };
        }
        return w;
      })
    );

    addToast('warning', 'Pencairan Ditolak', `Dana dikembalikan ke saldo perawat. Alasan: ${reason}`);
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    let totalGMV = 0;
    let platformNetRevenue = 0;
    let completedVisits = 0;
    let totalEscrowHeld = 0;

    bookings.forEach((b) => {
      if (b.status !== 'PENDING_PAYMENT' && b.status !== 'CANCELLED') {
        totalGMV += b.totalPrice;
      }

      if (b.status === 'COMPLETED') {
        completedVisits += 1;
        // Platform keeps 15% of service fee + Rp 5.000 app fee
        platformNetRevenue += Math.round(b.servicePrice * 0.15) + b.platformFee;
      }

      if (b.escrowStatus === 'HELD' && b.status !== 'PENDING_PAYMENT') {
        totalEscrowHeld += b.totalPrice;
      }
    });

    const nurseUsers = users.filter((u) => u.role === 'nurse');
    const verifiedNurses = nurseUsers.filter((u) => u.verificationStatus === 'APPROVED').length;
    const pendingNurses = nurseUsers.filter((u) => u.verificationStatus === 'PENDING_VERIFICATION').length;

    return {
      totalGMV,
      platformNetRevenue,
      completedVisits,
      totalEscrowHeld,
      totalNurses: nurseUsers.length,
      verifiedNurses,
      pendingNurses,
    };
  }, [bookings, users]);

  return (
    <CareContext.Provider
      value={{
        currentUser,
        users,
        services,
        bookings,
        withdrawals,
        toasts,
        addToast,
        removeToast,
        login,
        logout,
        switchUserById,
        registerPatient,
        registerNurse,
        resetAllData,
        toggleNurseOnline,
        nurseAcceptBooking,
        nurseRejectBooking,
        nurseUpdateBookingStatus,
        nurseSubmitEReport,
        nurseRequestWithdrawal,
        createBooking,
        payBooking,
        patientConfirmAndRate,
        adminApproveNurse,
        adminRejectNurse,
        adminAddService,
        adminUpdateService,
        adminToggleService,
        adminApproveWithdrawal,
        adminRejectWithdrawal,
        metrics,
      }}
    >
      {children}
    </CareContext.Provider>
  );
};

export const useCare = () => {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error('useCare must be used within a CareProvider');
  }
  return context;
};
