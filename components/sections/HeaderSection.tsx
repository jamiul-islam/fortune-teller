"use client";

import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslations } from "next-intl";
import { IconPhone } from "@tabler/icons-react";

export default function HeaderSection() {
  const t = useTranslations("header");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label={t("phone")}
          >
            <IconPhone size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}
