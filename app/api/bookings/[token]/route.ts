import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await params;

    // Validate token format (basic UUID validation)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!token || !uuidRegex.test(token)) {
      return NextResponse.json(
        { success: false, error: "Invalid token format" },
        { status: 401 },
      );
    }

    // Query Supabase for matching booking
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("confirmation_token", token)
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 },
      );
    }

    // Check token expiration
    const tokenExpiresAt = new Date(booking.token_expires_at);
    const now = new Date();

    if (tokenExpiresAt < now) {
      return NextResponse.json(
        { success: false, error: "Token has expired" },
        { status: 401 },
      );
    }

    // Return booking details
    return NextResponse.json({
      success: true,
      data: {
        firstName: booking.first_name,
        lastName: booking.last_name,
        email: booking.email,
        phone: booking.phone,
        dateOfBirth: booking.date_of_birth,
        duration: booking.duration,
        motherFirstName: booking.mother_first_name,
        motherLastName: booking.mother_last_name,
        motherDateOfBirth: booking.mother_date_of_birth,
        bookingTimestamp: booking.booking_timestamp,
      },
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching booking details",
      },
      { status: 500 },
    );
  }
}
