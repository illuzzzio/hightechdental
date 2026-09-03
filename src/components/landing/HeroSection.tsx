
"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Clock3, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-secondary/50 via-background to-background py-12 shadow-lg md:py-20 dark:from-primary/10 dark:via-background dark:to-background">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Precision care. Comfortable visits.</p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">Malhotra Dental Clinic and Implant Center</span>
          </h1>
          <p className="mb-8 text-base text-foreground/80 md:text-xl">
            Expert dental care by Dr. Sidharth Malhotra. We offer a wide range of services from routine check-ups to advanced dental procedures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/#book-appointment">
                Book Appointment <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link href="/#services">
                Our Services
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {[
              [ShieldCheck, "Evidence-led treatment"],
              [Clock3, "Appointments that respect your time"],
              [Check, "Care for every stage of life"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-3 rounded-md border border-border/70 bg-background/60 px-4 py-3 text-sm">
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span>{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      <div className="mt-12 md:mt-16 space-y-6">
  <Image
    src="/images/introchair.jpg"
    alt="Malhotra Dental Clinic Interior"
    width={800}
    height={400}
    className="rounded-lg shadow-2xl mx-auto object-cover"
    data-ai-hint="dental clinic"
    priority
  />
  <Image
    src="/images/lab1.jpg"
    alt="Malhotra Dental Clinic Interior"
    width={800}
    height={400}
    className="rounded-lg shadow-2xl mx-auto object-cover"
    data-ai-hint="dental clinic"
    priority
  />
    <Image
    src="/images/tech.jpg"
    alt="Malhotra Dental Clinic Interior"
    width={800}
    height={400}
    className="rounded-lg shadow-2xl mx-auto object-cover"
    data-ai-hint="dental clinic"
    priority
  />
     <Image
    src="/images/zod.jpg"
    alt="Malhotra Dental Clinic Interior"
    width={800}
    height={400}
    className="rounded-lg shadow-2xl mx-auto object-cover"
    data-ai-hint="dental clinic"
    priority
  />
</div>

      </div>
    </section>
  );
}
