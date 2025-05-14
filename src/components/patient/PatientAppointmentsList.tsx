
"use client";

import { useEffect, useState } from "react";
import type { Appointment } from "@/lib/types";
import { getAppointmentsByEmail } from "@/lib/actions";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarCheck, CalendarX, Hourglass, Loader2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

export function PatientAppointmentsList() {
  const { patient, isLoading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    if (!patient?.email) return;
    setIsLoading(true);
    try {
      const apps = await getAppointmentsByEmail(patient.email);
      setAppointments(apps);
    } catch (error) {
       toast({ title: "Error", description: "Failed to fetch your appointments.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!authLoading && patient?.email) {
      fetchAppointments();
      // In a real app with Firebase, set up a Firestore listener here for real-time updates
      // const q = query(collection(db, "appointments"), where("patientEmail", "==", patient.email));
      // const unsubscribe = onSnapshot(q, (snapshot) => {
      //   const updatedAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      //   setAppointments(updatedAppointments.sort((a, b) => (b.bookedAt as any) - (a.bookedAt as any)));
      //   setIsLoading(false);
      // });
      // return () => unsubscribe();
    } else if (!authLoading && !patient?.email) {
      setIsLoading(false); // Not logged in, stop loading
    }
  }, [patient, authLoading]);

  if (authLoading || (isLoading && !appointments.length)) {
    return <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <p className="ml-2">Loading your appointments...</p></div>;
  }

  if (!patient) {
     return <p className="text-center py-10 text-muted-foreground">Please log in to view your appointments.</p>;
  }

  if (appointments.length === 0) {
    return (
        <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">You have no appointments scheduled.</p>
            <Button onClick={fetchAppointments} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Check Again
            </Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <CardTitle className="text-2xl">Your Appointments</CardTitle>
            <Button onClick={fetchAppointments} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
        </div>
      {appointments.map((app) => (
        <Card key={app.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  Appointment on {format(new Date(app.appointmentDate), "MMMM dd, yyyy")}
                </CardTitle>
                <CardDescription>Time: {app.appointmentTime}</CardDescription>
              </div>
              <Badge
                variant={
                  app.status === "approved" ? "default" :
                  app.status === "cancelled" ? "destructive" : "secondary"
                }
                className="capitalize text-sm px-3 py-1"
              >
                {app.status === "approved" && <CalendarCheck className="mr-2 h-4 w-4"/>}
                {app.status === "cancelled" && <CalendarX className="mr-2 h-4 w-4"/>}
                {app.status === "pending" && <Hourglass className="mr-2 h-4 w-4"/>}
                {app.status}
              </Badge>
            </div>
          </CardHeader>
          {app.notes && (
            <CardContent>
              <p className="text-sm text-muted-foreground"><strong>Notes:</strong> {app.notes}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
