import type { Metadata } from "next";
import "./globals.css";
import FooterSection from "@/components/sections/FooterSection";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "iTellFortune",
  description: "Fortune-telling consultation booking platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn("font-sans", notoSans.variable)}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <FooterSection />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
