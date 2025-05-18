
"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10 rounded-lg shadow-lg overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to <span className="text-primary">Malhotra Dental Clinic and Implant Center</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8">
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
        </div>
        <div className="mt-12 md:mt-16">
          <Image
            src="/images/chairs.jpg"
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
