import type { Metadata } from "next";
import "./globals.css";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "iTellFortune",
  description: "Fortune-telling consultation booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
