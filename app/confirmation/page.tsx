"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconSparkles } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import HeaderSection from "@/components/sections/HeaderSection";

interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  duration: 15 | 30 | 60;
  motherFirstName?: string;
  motherLastName?: string;
  motherDateOfBirth?: string;
  bookingTimestamp: string;
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();
  const token = searchParams.get("token");

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("No confirmation token provided");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings/${token}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setError(data.error || "Failed to fetch booking details");
          setLoading(false);
          return;
        }

        setBooking(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("An error occurred while fetching booking details");
        setLoading(false);
      }
    };

    fetchBooking();
  }, [token]);

  const handleYourSolution = () => {
    router.push(`/solution?token=${token}`);
  };

  const handleNewConsultation = () => {
    router.push("/");
  };

  const handleBookingClick = () => {
    router.push("/");
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.pathname.includes("/embed/")) {
        videoId = urlObj.pathname.split("/embed/")[1].split("?")[0];
      } else if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v") || "";
      } else if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
      }
    } catch (error) {
      console.error("Invalid video URL:", error);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-background">
        <HeaderSection onBookingClick={handleBookingClick} />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Loading your booking details...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen relative bg-background">
        <HeaderSection onBookingClick={handleBookingClick} />

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm">
              <CardContent className="py-8">
                <Alert variant="destructive" className="mb-6">
                  <IconAlertCircle />
                  <AlertTitle>Booking Not Found</AlertTitle>
                  <AlertDescription>
                    {error ||
                      "We couldn't find your booking. The token may be invalid or expired."}
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground mb-6">
                  Your confirmation link may have expired (tokens are valid for
                  7 days) or the booking could not be found.
                </p>
                <Button onClick={handleNewConsultation} className="w-full">
                  Book a New Consultation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const welcomeVideoUrl = process.env.NEXT_PUBLIC_WELCOME_VIDEO_URL;
  const embedUrl = welcomeVideoUrl ? getYouTubeEmbedUrl(welcomeVideoUrl) : null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <HeaderSection onBookingClick={handleBookingClick} />

      {/* Video Background - Same as Hero Section */}
      <div className="absolute inset-0 z-0">
        {!videoError && embedUrl ? (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <iframe
              src={embedUrl}
              title="Welcome Background Video"
              className="absolute pointer-events-none"
              allow="autoplay; encrypted-media"
              onError={() => setVideoError(true)}
              style={{
                border: "none",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                height: "56.25vw",
                minHeight: "100vh",
                minWidth: "177.77vh",
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        {/* Dark overlay for text readability - 75% opacity */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content - Vertically and horizontally centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-6"
        >
          <IconSparkles
            className="w-16 h-16 mx-auto mb-6"
            style={{
              color: "#ffd700",
              filter: "drop-shadow(0 2px 8px rgba(255, 215, 0, 0.5))",
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            color: "#FFFFFF",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {t("confirmation.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl"
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.7)",
            padding: ".8em 0",
          }}
        >
          Hello {booking.firstName} {booking.lastName}, your {booking.duration}
          -minute consultation has been confirmed.
        </motion.p>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <Button
            onClick={handleYourSolution}
            size="lg"
            className="font-semibold text-lg px-8 py-6 h-auto shadow-2xl"
            style={{
              backgroundColor: "#ffd700",
              color: "#000000",
              boxShadow: "0 4px 20px rgba(255, 215, 0, 0.5)",
            }}
          >
            <IconSparkles className="mr-2" />
            {t("confirmation.yourSolution")}
          </Button>
          <Button
            onClick={handleNewConsultation}
            variant="outline"
            size="lg"
            className="font-semibold text-lg px-8 py-6 h-auto shadow-2xl border-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#FFFFFF",
              borderColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
            }}
          >
            {t("confirmation.newConsultation")}
          </Button>
        </motion.div>

        {/* Booking Details Card - Subtle at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-md w-full"
        >
          <Card
            className="bg-card/10 backdrop-blur-md border-white/20"
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <CardContent className="py-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Email:
                </span>
                <span className="font-medium" style={{ color: "#FFFFFF" }}>
                  {booking.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Phone:
                </span>
                <span className="font-medium" style={{ color: "#FFFFFF" }}>
                  {booking.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Duration:
                </span>
                <span className="font-medium" style={{ color: "#FFFFFF" }}>
                  {booking.duration} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Booked:
                </span>
                <span className="font-medium" style={{ color: "#FFFFFF" }}>
                  {new Date(booking.bookingTimestamp).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
