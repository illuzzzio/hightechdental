
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AboutDoctorSection } from "@/components/landing/AboutDoctorSection";
import { LocationSection } from "@/components/landing/LocationSection";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-20">
      <HeroSection />
      <Separator />
      <ServicesSection />
      <Separator />
      <AboutDoctorSection />
      <Separator />
      <LocationSection />
      <Separator />
      <AppointmentForm />
    </div>
  );
}
