
import { Copyright, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const clinicName = "Malhotra Dental Clinic";
  const address = "Moti bazaar Mandi Himachal Pradesh";
  const phone = "9418640470";

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">{clinicName}</h3>
            <p className="text-sm text-foreground/80">
              Providing top-quality dental care with a personal touch.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Contact Us</h3>
            <address className="not-italic text-sm text-foreground/80 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> 
                {address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" /> 
                <a href={`tel:${phone}`} className="hover:text-accent transition-colors">{phone}</a>
              </p>
            </address>
            <div className="mt-2">
               <Link 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                View on Google Maps
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/#services" className="text-foreground/80 hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/#book-appointment" className="text-foreground/80 hover:text-accent transition-colors">Book Appointment</Link></li>
              <li><Link href="/ai-assistant" className="text-foreground/80 hover:text-accent transition-colors">AI Assistant</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-foreground/60">
          <p className="flex items-center justify-center gap-1">
            <Copyright className="h-4 w-4" /> {currentYear} {clinicName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
