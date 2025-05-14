
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription, // Added FormDescription here
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription as CardDesc, CardHeader, CardTitle } from "@/components/ui/card"; // Aliased CardDescription to avoid conflict
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Users, LogIn } from "lucide-react";

const lookupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type LookupFormValues = z.infer<typeof lookupFormSchema>;

export function PatientLookupForm() {
  const { loginPatient, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LookupFormValues>({
    resolver: zodResolver(lookupFormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: LookupFormValues) {
    setError(null);
    const success = await loginPatient(data.email);
    if (success) {
      toast({ title: "Welcome!", description: "Loading your appointments..." });
      router.push("/patient-dashboard");
    } else {
      // This part might not be hit if loginPatient always returns true for demo
      setError("Could not find appointments for this email. Please ensure you used the same email as when booking.");
      toast({ title: "Lookup Failed", description: "No appointments found for this email.", variant: "destructive" });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <Users className="h-12 w-12 mx-auto text-primary" />
        <CardTitle className="text-2xl font-bold">Patient Portal</CardTitle>
        <CardDesc>Enter your email to view your appointment status.</CardDesc>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use the email you provided during appointment booking.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
               {isLoading ? "Loading..." : <> <LogIn className="mr-2 h-4 w-4" /> View Appointments </>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
