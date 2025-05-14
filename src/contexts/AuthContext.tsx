
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Doctor, Patient } from '@/lib/types';

interface AuthContextProps {
  doctor: Doctor | null;
  patient: Patient | null;
  loginDoctor: (username: string, pass: string) => Promise<boolean>; // Simplified, pass actual credentials
  logoutDoctor: () => void;
  loginPatient: (email: string) => Promise<boolean>; // Lookup patient by email
  logoutPatient: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hardcoded doctor credentials (for demo purposes)
const DOCTOR_USERNAME = "sidharth5450";
const DOCTOR_PASSWORD = "Assassin@1212";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted login state (optional)
    const storedDoctor = localStorage.getItem("doctor");
    const storedPatientEmail = localStorage.getItem("patientEmail");
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor));
    }
    if (storedPatientEmail) {
      setPatient({ email: storedPatientEmail });
    }
    setIsLoading(false);
  }, []);

  const loginDoctor = async (username: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call / actual auth
    await new Promise(resolve => setTimeout(resolve, 500)); 
    if (username === DOCTOR_USERNAME && pass === DOCTOR_PASSWORD) {
      const doctorData = { username };
      setDoctor(doctorData);
      localStorage.setItem("doctor", JSON.stringify(doctorData));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logoutDoctor = () => {
    setDoctor(null);
    localStorage.removeItem("doctor");
  };

  const loginPatient = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    // In a real app, you'd check if this email has appointments
    // For now, we just "log in" any email
    await new Promise(resolve => setTimeout(resolve, 500));
    const patientData = { email };
    setPatient(patientData);
    localStorage.setItem("patientEmail", email);
    setIsLoading(false);
    return true; 
  };

  const logoutPatient = () => {
    setPatient(null);
    localStorage.removeItem("patientEmail");
  };

  return (
    <AuthContext.Provider
      value={{ doctor, patient, loginDoctor, logoutDoctor, loginPatient, logoutPatient, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
