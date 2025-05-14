
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AppointmentRequestsTable } from "@/components/admin/AppointmentRequestsTable";
import { ClearAppointmentsDialog } from "@/components/admin/ClearAppointmentsDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  const { doctor, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  // Callback for ClearAppointmentsDialog to refresh table data
  // This is a bit of a workaround as state is local to AppointmentRequestsTable.
  // A more robust solution might involve a shared state/context for appointments or a refetch prop.
  // For now, we'll rely on the internal refresh of AppointmentRequestsTable.
  const handleAppointmentsCleared = () => {
    // The table itself handles refetching on action, or listens to realtime updates
    // This function is mainly to satisfy the prop for ClearAppointmentsDialog
    console.log("Appointments cleared, table should refresh.");
  };

  useEffect(() => {
    if (!authLoading && !doctor) {
      router.replace("/admin-login");
    }
  }, [doctor, authLoading, router]);

  if (authLoading || !doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <ShieldCheck className="h-8 w-8" /> Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage patient appointments and clinic operations.</p>
        </div>
        <ClearAppointmentsDialog onAppointmentsCleared={handleAppointmentsCleared} />
      </header>
      
      <Separator />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Appointment Requests</CardTitle>
          <CardDescription>View, approve, or cancel incoming appointment requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentRequestsTable />
        </CardContent>
      </Card>

      {/* Future sections can be added here, e.g., Patient Management, Clinic Settings */}
    </div>
  );
}
