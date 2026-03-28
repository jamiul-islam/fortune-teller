"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IconAlertCircle, IconSparkles } from "@tabler/icons-react";
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
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations();
  const token = searchParams.get("token");

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                  <AlertTitle>Booking Not Found</AlertTitle>
                  <AlertDescription>
                    {error ||
                      "We couldn't find your booking. The token may be invalid or expired."}
                  </AlertDescription>
                </Alert>
              </CardHeader>
              <CardContent>
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
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Card className="text-center">
              <CardHeader>
                <IconSparkles className="w-12 h-12 mx-auto mb-4 text-accent-gold" />
                <CardTitle className="text-2xl md:text-3xl">
                  {t("confirmation.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hello {booking.firstName} {booking.lastName}, your{" "}
                  {booking.duration}-minute consultation has been confirmed.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Welcome Video */}
          {welcomeVideoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={welcomeVideoUrl}
                      title="Welcome Video"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Button
              onClick={handleYourSolution}
              size="lg"
              className="w-full h-auto py-6 text-lg transition-transform hover:scale-102"
            >
              <IconSparkles className="mr-2" />
              {t("confirmation.yourSolution")}
            </Button>
            <Button
              onClick={handleNewConsultation}
              variant="outline"
              size="lg"
              className="w-full h-auto py-6 text-lg transition-transform hover:scale-102"
            >
              {t("confirmation.newConsultation")}
            </Button>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{booking.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{booking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">
                    {booking.duration} minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booked:</span>
                  <span className="font-medium">
                    {new Date(booking.bookingTimestamp).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
