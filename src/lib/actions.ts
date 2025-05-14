
"use server";

import type { Appointment } from "./types";
// import { db } from "./firebase"; // Assuming db is your Firestore instance
// import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc, query, where, writeBatch } from "firebase/firestore";
import { revalidatePath } from "next/cache";

// Initialize in-memory store on the globalThis object to persist across hot reloads in development
// Using unique names for global variables to avoid potential conflicts.
if (typeof (globalThis as any).appointments_db_malhotra === 'undefined') {
  (globalThis as any).appointments_db_malhotra = [];
}
if (typeof (globalThis as any).nextId_db_malhotra === 'undefined') {
  (globalThis as any).nextId_db_malhotra = 1;
}

// Use a direct reference to the global array for modifications
const appointments_db: Appointment[] = (globalThis as any).appointments_db_malhotra;

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
    // Increment nextId directly on globalThis
    const newAppointmentId = ((globalThis as any).nextId_db_malhotra++).toString();
    const newAppointment: Appointment = {
      ...data,
      id: newAppointmentId,
      status: "pending",
      bookedAt: new Date(), // In Firestore, use serverTimestamp()
    };
    appointments_db.push(newAppointment); // Push to the global array
    
    revalidatePath("/admin-dashboard"); // Revalidate admin dashboard to show new appointment
    revalidatePath("/patient-dashboard"); // Revalidate patient dashboard
    return { success: true, appointmentId: newAppointment.id };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return { success: false, error: "Failed to book appointment." };
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  // Return a copy sorted by newest first
  return [...appointments_db].sort((a,b) => (new Date(b.bookedAt).getTime()) - (new Date(a.bookedAt).getTime()));
}

export async function getAppointmentsByEmail(email: string): Promise<Appointment[]> {
  // Filter from the global array and return a sorted copy
  return appointments_db.filter(app => app.patientEmail === email).sort((a,b) => (new Date(b.bookedAt).getTime()) - (new Date(a.bookedAt).getTime()));
}

export async function updateAppointmentStatus(appointmentId: string, status: "approved" | "cancelled"): Promise<{ success: boolean; error?: string }> {
  try {
    const appIndex = appointments_db.findIndex(app => app.id === appointmentId);
    if (appIndex > -1) {
      appointments_db[appIndex].status = status; // Modify the global array
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
    // Clear the global array in place and reset the global ID counter
    appointments_db.length = 0; 
    (globalThis as any).nextId_db_malhotra = 1;

    revalidatePath("/admin-dashboard");
    revalidatePath("/patient-dashboard");
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
