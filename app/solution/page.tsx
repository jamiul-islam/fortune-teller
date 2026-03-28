"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconHome } from "@tabler/icons-react";
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
    <div className="min-h-screen relative bg-muted/30">
      <HeaderSection onBookingClick={handleBookingClick} />

      {/* Particles Background - Same as Categories Section */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center py-20 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl">
          {/* Page Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: "var(--font-serif)", marginBottom: ".8em" }}
          >
            {t("solution.title")}
          </motion.h2>

          <div className="space-y-6">
            {/* Personalized Video Card (if available) */}
            {booking.personalizedVideoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <Card
                  className="hover:shadow-md transition-shadow duration-200"
                  style={{ padding: ".8em" }}
                >
                  <CardHeader className="pb-4">
                    <div className="text-5xl mb-4">🎥</div>
                    <CardTitle className="text-xl font-bold">
                      Your Personal Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div
                      className="relative w-full rounded-lg overflow-hidden"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <iframe
                        src={booking.personalizedVideoUrl}
                        title="Personalized Video"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Fortune Note Card - Wide Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card
                className="hover:shadow-md transition-shadow duration-200"
                style={{ padding: ".8em" }}
              >
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4">✨</div>
                  <CardTitle className="text-xl font-bold">
                    {t("solution.fortuneNote")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-lg leading-relaxed text-foreground">
                    {fortuneNote}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reassuring Final Message Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                className="hover:shadow-md transition-shadow duration-200"
                style={{ padding: ".8em" }}
              >
                <CardHeader className="pb-4">
                  <div className="text-5xl mb-4">🌟</div>
                  <CardTitle className="text-xl font-bold">
                    Your Path Forward
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-lg leading-relaxed text-muted-foreground italic">
                    {t("solution.finalMessage")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Book Again Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center pt-8"
            >
              <Button
                onClick={handleBookAgain}
                variant="outline"
                size="lg"
                className="font-semibold"
              >
                {t("solution.bookAgain")}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
