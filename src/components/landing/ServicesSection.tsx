import Link from "next/link"; // Use this for internal links; for external, use <a>
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Activity } from "lucide-react";

const ToothIconSmall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tooth h-10 w-10 text-primary mb-4">
    {/* SVG paths */}
  </svg>
);

const services = [
  {
    title: "Dental Implants",
    description: "Restore your smile with durable and natural-looking dental implants.",
    icon: <ToothIconSmall />,
    link: "https://youtu.be/aCtIQ_tAzlQ?si=6HsXxPTV6hMkWPza", // Replace with actual video link
  },
  {
    title: "Root Canal Treatment",
    description: "Relieve pain and save your natural tooth with our expert root canal therapy.",
    icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
    link: "https://youtube.com/shorts/uHlGsTGTRwQ?si=hkjsmfwBc1tHtv-U", // Replace with actual video link
  },
  {
    title: "ORTHODONTICS (BRACES) and General Dentistry",
    description: "(Orthodontics) aims to improve both the aesthetic and functional aspects of a person's smile and bite. Orthodontic treatment can involve a variety of appliances, including braces, clear aligners, and removable retainers, to gradually move teeth into their desired positions",
    icon: <Activity className="h-10 w-10 text-primary mb-4" />,
    link: "https://youtube.com/shorts/PDudwluMKCo?si=E4cDwqSU7WuZFt9E", // Replace with actual video link
  },
  {
    title: "Cosmetic Dentistry",
    description: "Enhance your smile with teeth whitening, veneers, and other cosmetic procedures.",
    icon: <CheckCircle2 className="h-10 w-10 text-primary mb-4" />,
    link: "https://youtube.com/shorts/CfNtcsnvPxY?si=rQUigaU0RpN_Bos1", // Replace with actual video link
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
            <a
              key={service.title}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col"
            >
              <Card className="flex-grow h-full">
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="text-xl text-primary hover:underline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
