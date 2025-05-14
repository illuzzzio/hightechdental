
export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  status: "pending" | "approved" | "cancelled";
  bookedAt: any; // Firestore Timestamp or Date
  notes?: string; // Optional notes from patient or doctor
}

export interface Patient {
  email: string;
  name?: string; // Optional, could be fetched if patient creates an account
}

export interface Doctor {
  username: string; // For login, e.g., sidharth5450
  // Potentially other doctor-specific info
}
