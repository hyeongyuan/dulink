import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { SideMenu } from "@/components/SideMenu";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dulink",
  description: "A simple URL query parameter editor",
  openGraph: {
    title: "Dulink",
    description: "A simple URL query parameter editor",
    url: "https://dulink.vercel.app",
    siteName: "Dulink",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <div className="flex flex-row min-h-[calc(100vh-4rem)] bg-base-100">
          <SideMenu />
          <div className="w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
