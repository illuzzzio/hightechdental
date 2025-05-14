
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bookAppointment } from "@/lib/actions"; // Server action
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

const appointmentFormSchema = z.object({
  patientName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  patientEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  patientPhone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  appointmentDate: z.date({
    required_error: "A date for the appointment is required.",
  }),
  appointmentTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { // HH:MM format
    message: "Please enter a valid time in HH:MM format (e.g., 14:30).",
  }),
  notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export function AppointmentForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      appointmentDate: undefined,
      appointmentTime: "",
      notes: "",
    },
  });

  async function onSubmit(data: AppointmentFormValues) {
    setIsSubmitting(true);
    try {
      const result = await bookAppointment({
        ...data,
        appointmentDate: format(data.appointmentDate, "yyyy-MM-dd"), // Format date for server
      });

      if (result.success) {
        toast({
          title: "Appointment Booked!",
          description: "Your appointment request has been sent. We will contact you shortly.",
        });
        form.reset();
      } else {
        toast({
          title: "Booking Failed",
          description: result.error || "Could not book appointment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="book-appointment" className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background dark:from-secondary/10 dark:to-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Book an Appointment</CardTitle>
            <CardDescription>Fill out the form below to schedule your visit.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="patientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time (HH:MM)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="time" placeholder="e.g., 10:30" {...field} />
                             <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormDescription>Use 24-hour format (e.g., 14:30 for 2:30 PM)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Any specific concerns or requests?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Appointment"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
