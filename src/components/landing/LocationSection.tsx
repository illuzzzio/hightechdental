
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LocationSection() {
  const address = "Moti bazaar Mandi Himachal Pradesh";
  const phone = "9418640470";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="location" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">Visit Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Card className="shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Our Clinic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-foreground/80">{address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a href={`tel:${phone}`} className="text-foreground/80 hover:text-primary transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                <Button asChild className="mt-4 w-full md:w-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Get Directions <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-lg shadow-xl overflow-hidden">
            {/* Placeholder for an actual map embed or a static map image */}
            <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src="https://placehold.co/600x400.png" // Placeholder for map image
                alt="Clinic Location Map"
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="map location"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
