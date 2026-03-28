"use client";

import { Button } from "@/components/ui/Button";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "fr" : "en";

    startTransition(() => {
      // Set cookie for locale persistence
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      // Reload to apply new locale
      window.location.reload();
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      disabled={isPending}
      className="font-semibold"
    >
      {locale === "en" ? "FR" : "EN"}
    </Button>
  );
}
