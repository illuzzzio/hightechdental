
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a more modern default than Geist for body
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"; // ShadCN Toaster

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Malhotra Dental Clinic',
  description: 'Expert dental care by Dr. Sidharth Malhotra. Services include implants, root canals, and more. Book your appointment today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
