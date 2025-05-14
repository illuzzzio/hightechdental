
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PatientAppointmentsList } from "@/components/patient/PatientAppointmentsList";
import { Loader2, UserCheck } from "lucide-react";

export default function PatientDashboardPage() {
  const { patient, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !patient) {
      router.replace("/patient-login");
    }
  }, [patient, authLoading, router]);

  if (authLoading || !patient) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading your portal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
           <UserCheck className="h-8 w-8" /> Patient Portal
        </h1>
        <p className="text-muted-foreground">View your appointment history and status below, {patient.email}.</p>
      </header>
      <PatientAppointmentsList />
    </div>
  );
}
