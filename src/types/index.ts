export type UserRole = 'patient' | 'nurse' | 'admin';

export type NurseVerificationStatus = 'APPROVED' | 'PENDING_VERIFICATION' | 'REJECTED';

export type CareLevel = 'Dasar' | 'Menengah' | 'Intensif';

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'          // Paid into escrow, waiting for nurse acceptance
  | 'ACCEPTED'      // Nurse accepted
  | 'EN_ROUTE'      // Nurse on the way (Menuju Lokasi)
  | 'IN_PROGRESS'   // Nurse doing procedure (Tindakan Berlangsung)
  | 'COMPLETED'     // Done & E-Report filled
  | 'CANCELLED';

export type EscrowStatus = 'PENDING' | 'HELD' | 'RELEASED' | 'REFUNDED';

export type PaymentMethod = 'BCA_VA' | 'MANDIRI_VA' | 'QRIS' | 'GOPAY';

export type WithdrawalStatus = 'PENDING' | 'TRANSFERRED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatarUrl?: string;
  createdAt: string;

  // Patient-specific fields
  address?: string;
  allergies?: string;
  specialConditions?: string;

  // Nurse-specific fields
  degree?: string; // e.g., 'S.Kep., Ns.'
  strNumber?: string;
  sipNumber?: string;
  documentUrl?: string;
  experienceYears?: number;
  verificationStatus?: NurseVerificationStatus;
  rejectionReason?: string;
  isOnline?: boolean;
  balance?: number; // Active earnings in IDR
  rating?: number; // 0 - 5
  reviewCount?: number;
}

export interface MedicalService {
  id: string;
  name: string;
  category: string;
  price: number; // In IDR (Tarif Tindakan)
  description: string;
  durationMinutes: number;
  careLevel: CareLevel;
  iconName: string;
  isActive: boolean;
}

export interface EReportVitalSigns {
  bloodPressure: string; // e.g. "120/80"
  pulse: number;         // bpm
  temperature: number;   // °C
  bloodSugar: number;    // mg/dL
  careNotes: string;
  recommendations: string;
  submittedAt: string;
}

export interface BookingReview {
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. "CAH-2026-0891"
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAddress: string;
  
  serviceId: string;
  serviceName: string;
  servicePrice: number; // Base fee
  platformFee: number;  // Rp 5.000 flat
  totalPrice: number;   // servicePrice + 5.000
  nurseEarnings: number;// servicePrice * 0.85

  scheduledDate: string;
  scheduledTime: string;
  complaints: string;

  status: BookingStatus;
  escrowStatus: EscrowStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;

  nurseId?: string;
  nurseName?: string;
  nurseDegree?: string;

  eReport?: EReportVitalSigns;
  review?: BookingReview;

  createdAt: string;
  updatedAt: string;
}

export interface Withdrawal {
  id: string;
  withdrawalCode: string; // e.g. "WD-7712"
  nurseId: string;
  nurseName: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: WithdrawalStatus;
  transferReference?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
