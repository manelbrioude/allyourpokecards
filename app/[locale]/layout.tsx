"use client";

import localFont from "next/font/local";
import "./globals.css";
import { CardsProvider } from "@/context/CardsContext";
import { CollectionProvider } from "@/context/CollectionContext";
import Menu from "@/app/[locale]/components/Menu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  params: paramsPromise,
  children,
}: {
  params: Promise<{ locale: string }>; // Adjust for Promise type
  children: React.ReactNode;
}) {
  // Await the promise to access locale
  const { locale } = await paramsPromise;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CardsProvider>
          <CollectionProvider>
            <Menu />
            {children}
          </CollectionProvider>
        </CardsProvider>
      </body>
    </html>
  );
}
