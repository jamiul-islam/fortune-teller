"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconSparkles, IconHome } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import HeaderSection from "@/components/sections/HeaderSection";
import Particles from "@/components/ui/Particles";

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
  personalizedVideoUrl?: string;
}

export default function SolutionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();
  const token = searchParams.get("token");

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [fortuneNote, setFortuneNote] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("No confirmation token provided");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch booking details
        const bookingResponse = await fetch(`/api/bookings/${token}`);
        const bookingData = await bookingResponse.json();

        if (!bookingResponse.ok || !bookingData.success) {
          setError(bookingData.error || "Failed to fetch booking details");
          setLoading(false);
          return;
        }

        setBooking(bookingData.data);

        // Fetch fortune note
        const fortuneResponse = await fetch("/api/fortune-notes/random");
        const fortuneData = await fortuneResponse.json();

        if (fortuneResponse.ok && fortuneData.fortuneNote) {
          setFortuneNote(fortuneData.fortuneNote);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while loading your solution");
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleBookAgain = () => {
    router.push("/");
  };

  const handleBookingClick = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen relative bg-background">
        <HeaderSection onBookingClick={handleBookingClick} />

        {/* Subtle Particle Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Particles
            particleColors={["#737373"]}
            particleCount={200}
            particleSpread={15}
            speed={0.05}
            particleBaseSize={80}
            moveParticlesOnHover={false}
            alphaParticles
            disableRotation={false}
            pixelRatio={1}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t("solution.loading")}</p>
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

        {/* Subtle Particle Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Particles
            particleColors={["#737373"]}
            particleCount={200}
            particleSpread={15}
            speed={0.05}
            particleBaseSize={80}
            moveParticlesOnHover={false}
            alphaParticles
            disableRotation={false}
            pixelRatio={1}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-md">
              <CardHeader>
                <Alert variant="destructive">
                  <IconAlertCircle />
                  <AlertTitle>{t("solution.error.title")}</AlertTitle>
                  <AlertDescription>
                    {error || t("solution.error.description")}
                  </AlertDescription>
                </Alert>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("solution.error.expired")}
                </p>
                <Button onClick={handleBookAgain} className="w-full">
                  <IconHome className="mr-2" />
                  {t("confirmation.newConsultation")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-background">
      <HeaderSection onBookingClick={handleBookingClick} />

      {/* Subtle Particle Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Particles
          particleColors={["#737373"]}
          particleCount={200}
          particleSpread={15}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Card className="text-center">
              <CardHeader>
                <IconSparkles className="w-12 h-12 mx-auto mb-4 text-accent-gold" />
                <CardTitle className="text-2xl md:text-3xl">
                  {t("solution.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hello {booking.firstName}, here is your personalized guidance.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personalized Video (if available) */}
          {booking.personalizedVideoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Personal Message</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={booking.personalizedVideoUrl}
                      title="Personalized Video"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Fortune Note Card - Special Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card className="border-accent-gold/20 bg-gradient-to-br from-muted/50 to-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent-gold">
                  <IconSparkles className="w-6 h-6" />
                  {t("solution.fortuneNote")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{fortuneNote}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reassuring Final Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="text-center">
              <CardContent className="py-8">
                <p className="text-lg text-muted-foreground italic">
                  {t("solution.finalMessage")}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Discreet Book Again Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <Button
              onClick={handleBookAgain}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-accent-gold transition-colors"
            >
              {t("solution.bookAgain")}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
