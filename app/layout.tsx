import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SecurityProvider } from "@/components/security-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Growth Portal | Premium Coaching",
  description: "Transform your business in 52 weeks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-sans bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster
          position="top-center"
          richColors
          expand={false}
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #f4f4f5',
              borderRadius: '1.25rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              padding: '1rem',
            },
            className: 'font-outfit font-bold',
          }}
        />
        <SecurityProvider />
      </body>
    </html>
  );
}
