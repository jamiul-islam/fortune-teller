import type { Metadata } from "next";
import "./globals.css";
import FooterSection from "@/components/sections/FooterSection";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", notoSans.variable)}>
      <body>
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
