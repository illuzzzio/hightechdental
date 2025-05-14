
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ShieldAlert, LogIn } from "lucide-react";

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function AdminLoginForm() {
  const { loginDoctor, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    setError(null);
    const success = await loginDoctor(data.username, data.password);
    if (success) {
      toast({ title: "Login Successful", description: "Redirecting to dashboard..." });
      router.push("/admin-dashboard");
    } else {
      setError("Invalid username or password.");
      toast({ title: "Login Failed", description: "Invalid username or password.", variant: "destructive" });
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <ShieldAlert className="h-12 w-12 mx-auto text-primary" />
        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="sidharth5450" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : <> <LogIn className="mr-2 h-4 w-4" /> Log In </>}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
