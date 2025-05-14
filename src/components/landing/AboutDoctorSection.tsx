
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Award } from "lucide-react";

export function AboutDoctorSection() {
  return (
    <section id="about-doctor" className="py-16 md:py-24 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">Meet Dr. Sidharth Malhotra</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/images/sid.jpg"
              alt="Dr. Sidharth Malhotra"
              width={300}
              height={300}
              className="rounded-full shadow-xl object-cover border-4 border-primary"
              data-ai-hint="doctor portrait"
            />
          </div>
          <div className="md:w-2/3">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Stethoscope className="h-7 w-7 text-primary" />
                  Dr. Sidharth Malhotra, BDS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/90">
                <p className="text-lg">
                  Dr. Sidharth Malhotra is a dedicated and experienced dentist with over two decades of experience, committed to providing the highest quality dental care. With a passion for creating healthy and beautiful smiles, Dr. Malhotra stays updated with the latest advancements in dentistry to offer state-of-the-art treatments.
                </p>
                <p>
                  His patient-centric approach ensures that every individual receives personalized care tailored to their unique needs and concerns. Whether it's a routine check-up or a complex dental procedure, you can trust Dr. Malhotra for compassionate and professional service.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="font-medium">Specializes in Implants, Root Canals, and Cosmetic Dentistry.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
