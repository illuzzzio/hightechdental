
"use client";

import { useEffect, useState, useTransition } from "react";
import type { Appointment } from "@/lib/types";
import { getAppointments, updateAppointmentStatus } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle, XCircle, Hourglass, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AppointmentRequestsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const apps = await getAppointments();
      setAppointments(apps);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch appointments.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // In a real app with Firebase, set up a Firestore listener here for real-time updates
    // const unsubscribe = onSnapshot(collection(db, "appointments"), (snapshot) => {
    //   const updatedAppointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
    //   setAppointments(updatedAppointments.sort((a, b) => (b.bookedAt as any) - (a.bookedAt as any)));
    //   setIsLoading(false);
    // });
    // return () => unsubscribe();
  }, []);

  const handleStatusUpdate = (id: string, status: "approved" | "cancelled") => {
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, status);
      if (result.success) {
        toast({ title: "Status Updated", description: `Appointment ${status}.` });
        fetchAppointments(); // Re-fetch to update UI, or rely on listener
      } else {
        toast({ title: "Update Failed", description: result.error, variant: "destructive" });
      }
    });
  };

  if (isLoading && appointments.length === 0) {
    return <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /> <p className="ml-2">Loading appointments...</p></div>;
  }

  if (appointments.length === 0) {
    return <p className="text-center py-10 text-muted-foreground">No appointment requests found.</p>;
  }

  return (
    <div className="space-y-4">
        <div className="flex justify-end">
             <Button onClick={fetchAppointments} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
        </div>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((app) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div className="font-medium">{app.patientName}</div>
                  <div className="text-sm text-muted-foreground">{app.patientEmail}</div>
                </TableCell>
                <TableCell>{app.patientPhone}</TableCell>
                <TableCell>
                  {format(new Date(app.appointmentDate), "MMM dd, yyyy")} at {app.appointmentTime}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      app.status === "approved" ? "default" :
                      app.status === "cancelled" ? "destructive" : "secondary"
                    }
                    className="capitalize"
                  >
                    {app.status === "approved" && <CheckCircle className="mr-1 h-3 w-3"/>}
                    {app.status === "cancelled" && <XCircle className="mr-1 h-3 w-3"/>}
                    {app.status === "pending" && <Hourglass className="mr-1 h-3 w-3"/>}
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {app.status === "pending" && (
                    <div className="flex gap-2 justify-end">
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" disabled={isPending}>
                            <CheckCircle className="mr-1 h-4 w-4" /> Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Approve Appointment?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will confirm the appointment for {app.patientName} on {format(new Date(app.appointmentDate), "MMM dd, yyyy")} at {app.appointmentTime}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleStatusUpdate(app.id, "approved")} className="bg-green-600 hover:bg-green-700">Approve</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700" disabled={isPending}>
                            <XCircle className="mr-1 h-4 w-4" /> Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will cancel the appointment for {app.patientName}. The patient will be notified.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleStatusUpdate(app.id, "cancelled")} className="bg-red-600 hover:bg-red-700">Cancel Appointment</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                   {(app.status === "approved" || app.status === "cancelled") && (
                     <Button variant="ghost" size="sm" disabled>No actions</Button>
                   )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
