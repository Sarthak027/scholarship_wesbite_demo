import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Confirm Scholarship - Your Gateway To A Brighter Future",
  description: "Unlock a world of opportunities with scholarships tailored to your dream career.",
};

import AdminLayoutWrapper from "@/components/layout/AdminLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased bg-gray-50`}
        suppressHydrationWarning={true}
      >
        <AdminLayoutWrapper>
          {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}
