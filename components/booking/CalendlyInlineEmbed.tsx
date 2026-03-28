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
    onEventScheduled: async (e) => {
      console.log("Event scheduled:", e.data.payload);

      // Extract Calendly event URI
      const eventUri = e.data.payload?.event?.uri;

      if (!eventUri) {
        console.error("No event URI found in Calendly payload");
        router.push("/confirmation?token=error");
        return;
      }

      // Implement polling mechanism
      const maxAttempts = 30; // 30 seconds timeout (30 attempts * 1 second)
      let attempts = 0;

      const pollForBooking = async (): Promise<void> => {
        try {
          attempts++;

          // Call polling endpoint
          const response = await fetch(
            `/api/bookings/poll?event_uri=${encodeURIComponent(eventUri)}`,
          );

          if (response.ok) {
            const data = await response.json();

            if (data.success && data.confirmationToken) {
              // Booking found, redirect with real token
              router.push(`/confirmation?token=${data.confirmationToken}`);
              return;
            }
          }

          // If booking not found yet and haven't reached timeout
          if (attempts < maxAttempts) {
            // Wait 1 second before next poll
            setTimeout(() => pollForBooking(), 1000);
          } else {
            // Timeout reached, redirect to error page
            console.error(
              "Polling timeout: booking not created within 30 seconds",
            );
            router.push("/confirmation?token=timeout");
          }
        } catch (error) {
          console.error("Polling error:", error);

          // Retry if haven't reached timeout
          if (attempts < maxAttempts) {
            setTimeout(() => pollForBooking(), 1000);
          } else {
            // Timeout reached, redirect to error page
            router.push("/confirmation?token=error");
          }
        }
      };

      // Start polling
      pollForBooking();
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
