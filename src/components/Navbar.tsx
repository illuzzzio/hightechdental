
"use client";

import Link from "next/link";
import { Stethoscope, User, LogOut, BotMessageSquare, Home, Users, ShieldPlus, CalendarPlus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const ToothIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tooth">
    <path d="M9.34 2.577a2.5 2.5 0 0 1 5.32 0"/>
    <path d="MM12.643 2.577c.635 1.147.969 2.431.969 3.738 0 1.79-.59 3.46-1.612 4.685-.419.49-.745.917-.976 1.252a3.499 3.499 0 0 1-2.048 0c-.23-.335-.557-.762-.976-1.252C6.973 9.775 6.383 8.105 6.383 6.315c0-1.307.334-2.591.969-3.738"/>
    <path d="M10.649 12.426c.33.198.707.358 1.101.478.395.12.812.181 1.25.181s.855-.06 1.25-.181c.394-.12.771-.28 1.101-.478"/>
    <path d="M18.09 13.052a6.282 6.282 0 0 1-2.456 2.988 5.27 5.27 0 0 1-7.268 0 6.281 6.281 0 0 1-2.456-2.988"/>
    <path d="M7.749 16.04a1 1 0 0 1 .5-1.922 4.003 4.003 0 0 0 3.751-.001 1 1 0 1 1 .5 1.923 6.005 6.005 0 0 1-4.751 0Z"/>
    <path d="M17.251 16.04a1 1 0 0 0-.5-1.922 4.003 4.003 0 0 1-3.751-.001 1 1 0 1 0-.5 1.923 6.005 6.005 0 0 0 4.751 0Z"/>
    <path d="M15.75 19s-.39-1.09-.931-2.124a4.32 4.32 0 0 0-5.638 0C8.64 17.91 8.25 19 8.25 19"/>
    <path d="M12 19v2.5"/>
  </svg>
);


export function Navbar() {
  const { doctor, patient, logoutDoctor, logoutPatient } = useAuth();
  const router = useRouter();

  const handleDoctorLogout = () => {
    logoutDoctor();
    router.push("/");
  };

  const handlePatientLogout = () => {
    logoutPatient();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <ToothIcon />
          <span className="font-bold text-lg tracking-tight text-primary">Malhotra Dental Clinic</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Home
          </Link>
           <Link href="/pricing" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#services" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Services
          </Link>
          <Link href="/#book-appointment" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
            Book Appointment
          </Link>
          <Link href="/ai-assistant" className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground flex items-center gap-1">
            <BotMessageSquare className="h-4 w-4" /> AI Assistant
          </Link>
          
          {doctor ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. Sidharth</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Admin
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/admin-dashboard')}>
                  <ShieldPlus className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDoctorLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : patient ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Users className="h-4 w-4"/></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Patient</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {patient.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/patient-dashboard')}>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  <span>My Appointments</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePatientLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem onClick={() => router.push('/admin-login')}>
                  <ShieldPlus className="mr-2 h-4 w-4" /> Doctor Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/patient-login')}>
                  <Users className="mr-2 h-4 w-4" /> Patient Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
