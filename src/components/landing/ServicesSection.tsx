
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Activity } from "lucide-react"; // Using Activity for general dental work, could find more specific ones.

const ToothIconSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tooth h-10 w-10 text-primary mb-4">
    <path d="M9.34 2.577a2.5 2.5 0 0 1 5.32 0"/>
    <path d="M12.643 2.577c.635 1.147.969 2.431.969 3.738 0 1.79-.59 3.46-1.612 4.685-.419.49-.745.917-.976 1.252a3.499 3.499 0 0 1-2.048 0c-.23-.335-.557-.762-.976-1.252C6.973 9.775 6.383 8.105 6.383 6.315c0-1.307.334-2.591.969-3.738"/>
    <path d="M10.649 12.426c.33.198.707.358 1.101.478.395.12.812.181 1.25.181s.855-.06 1.25-.181c.394-.12.771-.28 1.101-.478"/>
    <path d="M18.09 13.052a6.282 6.282 0 0 1-2.456 2.988 5.27 5.27 0 0 1-7.268 0 6.281 6.281 0 0 1-2.456-2.988"/>
    <path d="M7.749 16.04a1 1 0 0 1 .5-1.922 4.003 4.003 0 0 0 3.751-.001 1 1 0 1 1 .5 1.923 6.005 6.005 0 0 1-4.751 0Z"/>
    <path d="M17.251 16.04a1 1 0 0 0-.5-1.922 4.003 4.003 0 0 1-3.751-.001 1 1 0 1 0-.5 1.923 6.005 6.005 0 0 0 4.751 0Z"/>
    <path d="M15.75 19s-.39-1.09-.931-2.124a4.32 4.32 0 0 0-5.638 0C8.64 17.91 8.25 19 8.25 19"/>
    <path d="M12 19v2.5"/>
  </svg>
);

const services = [
  {
    title: "Dental Implants",
    description: "Restore your smile with durable and natural-looking dental implants.",
    icon: <ToothIconSmall />,
  },
  {
    title: "Root Canal Treatment",
    description: "Relieve pain and save your natural tooth with our expert root canal therapy.",
    icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
  },
  {
    title: "General Dentistry",
    description: "Comprehensive care including cleanings, fillings, and preventive treatments.",
    icon: <Activity className="h-10 w-10 text-primary mb-4" />,
  },
  {
    title: "Cosmetic Dentistry",
    description: "Enhance your smile with teeth whitening, veneers, and other cosmetic procedures.",
    icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            We offer a comprehensive range of dental services to meet all your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
              <CardHeader className="items-center text-center">
                {service.icon}
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
