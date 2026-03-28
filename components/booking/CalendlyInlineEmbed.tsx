"use client";

import { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";

interface CalendlyInlineEmbedProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    name?: string;
    email?: string;
  };
}

export function CalendlyInlineEmbed({
  isOpen,
  onClose,
  prefill,
}: CalendlyInlineEmbedProps) {
  const router = useRouter();
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    // Check if NEXT_PUBLIC_CALENDLY_URL exists
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    if (!url) {
      setEmbedError(true);
      console.error("NEXT_PUBLIC_CALENDLY_URL is not configured");
    } else {
      setCalendlyUrl(url);
    }
  }, []);

  // Listen for Calendly event_scheduled postMessage
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      console.log("Event scheduled:", e.data.payload);
      // Redirect to confirmation page with pending token
      router.push("/confirmation?token=pending");
    },
  });

  const handleRetry = () => {
    setEmbedError(false);
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    if (url) {
      setCalendlyUrl(url);
    } else {
      setEmbedError(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-hidden p-0"
        style={{ maxWidth: "90vw" }}
      >
        <DialogHeader
          className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 text-center"
          style={{ marginTop: ".8rem" }}
        >
          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
            Book Your Reading
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base md:text-lg">
            Choose your consultation duration and complete your booking
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
          {embedError || !calendlyUrl ? (
            <Alert variant="destructive" className="mb-4">
              <IconAlertCircle className="h-4 w-4" />
              <AlertTitle className="text-sm sm:text-base">
                Booking System Error
              </AlertTitle>
              <AlertDescription className="text-xs sm:text-sm">
                Unable to load the booking system. Please try again or contact
                support.
              </AlertDescription>
              <Button
                onClick={handleRetry}
                variant="outline"
                className="mt-4"
                size="sm"
              >
                Retry
              </Button>
            </Alert>
          ) : (
            <div className="w-full" style={{ height: "70vh" }}>
              <InlineWidget
                url={calendlyUrl}
                prefill={prefill}
                styles={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
