
"use server";

import type { Appointment } from "./types";
// import { db } from "./firebase"; // Assuming db is your Firestore instance
// import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc, query, where, writeBatch } from "firebase/firestore";
import { revalidatePath } from "next/cache";

// Simulating Firestore for now
let appointments_db: Appointment[] = [];
let nextId = 1;

interface BookAppointmentData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}

export async function bookAppointment(data: BookAppointmentData): Promise<{ success: boolean; appointmentId?: string; error?: string }> {
  try {
    // Simulate Firestore addDoc
    const newAppointment: Appointment = {
      ...data,
      id: (nextId++).toString(),
      status: "pending",
      bookedAt: new Date(), // In Firestore, use serverTimestamp()
    };
    appointments_db.push(newAppointment);
    
    // console.log("Booking appointment (simulated):", newAppointment);
    // const docRef = await addDoc(collection(db, "appointments"), {
    //   ...data,
    //   status: "pending",
    //   bookedAt: serverTimestamp(),
    // });

    revalidatePath("/admin-dashboard"); // Revalidate admin dashboard to show new appointment
    return { success: true, appointmentId: newAppointment.id };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return { success: false, error: "Failed to book appointment." };
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  // Simulate Firestore getDocs
  // const querySnapshot = await getDocs(collection(db, "appointments"));
  // const appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  // return appointments.sort((a, b) => (b.bookedAt as any) - (a.bookedAt as any)); // Sort by newest first
  return [...appointments_db].sort((a,b) => (new Date(b.bookedAt).getTime()) - (new Date(a.bookedAt).getTime()));
}

export async function getAppointmentsByEmail(email: string): Promise<Appointment[]> {
  // Simulate Firestore query
  // const q = query(collection(db, "appointments"), where("patientEmail", "==", email));
  // const querySnapshot = await getDocs(q);
  // const appointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  // return appointments.sort((a, b) => (b.bookedAt as any) - (a.bookedAt as any));
  return appointments_db.filter(app => app.patientEmail === email).sort((a,b) => (new Date(b.bookedAt).getTime()) - (new Date(a.bookedAt).getTime()));
}

export async function updateAppointmentStatus(appointmentId: string, status: "approved" | "cancelled"): Promise<{ success: boolean; error?: string }> {
  try {
    // Simulate Firestore updateDoc
    // const appointmentRef = doc(db, "appointments", appointmentId);
    // await updateDoc(appointmentRef, { status });
    const appIndex = appointments_db.findIndex(app => app.id === appointmentId);
    if (appIndex > -1) {
      appointments_db[appIndex].status = status;
    } else {
      return { success: false, error: "Appointment not found." };
    }
    
    revalidatePath("/admin-dashboard");
    revalidatePath("/patient-dashboard"); // Also revalidate patient dashboard
    return { success: true };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function clearAllAppointments(): Promise<{ success: boolean; error?: string }> {
  try {
    // Simulate Firestore batch delete
    // const querySnapshot = await getDocs(collection(db, "appointments"));
    // const batch = writeBatch(db);
    // querySnapshot.docs.forEach(document => {
    //   batch.delete(document.ref);
    // });
    // await batch.commit();
    appointments_db = [];
    nextId = 1; // Reset ID counter for simulation

    revalidatePath("/admin-dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error clearing appointments:", error);
    return { success: false, error: "Failed to clear appointments." };
  }
}

// Dental AI Assistant flow call
import { dentalAssistant as dentalAssistantFlow, type DentalAssistantInput, type DentalAssistantOutput } from '@/ai/flows/dental-assistant';

export async function getDentalAssistantResponse(input: DentalAssistantInput): Promise<DentalAssistantOutput | { error: string }> {
  try {
    const response = await dentalAssistantFlow(input);
    return response;
  } catch (error: any) {
    console.error("Error calling dental assistant flow:", error);
    return { error: error.message || "Failed to get response from AI assistant." };
  }
}
