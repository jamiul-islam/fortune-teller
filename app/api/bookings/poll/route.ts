import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

// Interface for Calendly scheduled event response
interface CalendlyScheduledEvent {
  resource: {
    uri: string;
    name: string;
    status: string;
    start_time: string;
    end_time: string;
    event_type: string;
    location: {
      type: string;
      location?: string;
    };
    invitees_counter: {
      total: number;
      active: number;
      limit: number;
    };
    created_at: string;
    updated_at: string;
  };
}

// Interface for Calendly invitee response
interface CalendlyInvitee {
  resource: {
    uri: string;
    email: string;
    name: string;
    first_name?: string;
    last_name?: string;
    status: string;
    questions_and_answers?: Array<{
      question: string;
      answer: string;
      position: number;
    }>;
    timezone: string;
    created_at: string;
    updated_at: string;
  };
}

// Helper function to extract booking fields from questions_and_answers
function extractBookingFields(invitee: CalendlyInvitee["resource"]) {
  const fields = {
    firstName: invitee.first_name || invitee.name.split(" ")[0] || "",
    lastName:
      invitee.last_name || invitee.name.split(" ").slice(1).join(" ") || "",
    email: invitee.email,
    phone: "",
    dateOfBirth: "",
    motherFirstName: null as string | null,
    motherLastName: null as string | null,
    motherDateOfBirth: null as string | null,
  };

  // Extract custom fields from questions_and_answers
  if (invitee.questions_and_answers) {
    for (const qa of invitee.questions_and_answers) {
      const question = qa.question.toLowerCase();
      const answer = qa.answer;

      if (question.includes("phone") || question.includes("number")) {
        fields.phone = answer;
      } else if (
        question.includes("date of birth") &&
        !question.includes("mother")
      ) {
        fields.dateOfBirth = answer;
      } else if (
        question.includes("mother") &&
        question.includes("first name")
      ) {
        fields.motherFirstName = answer || null;
      } else if (
        question.includes("mother") &&
        question.includes("last name")
      ) {
        fields.motherLastName = answer || null;
      } else if (
        question.includes("mother") &&
        question.includes("date of birth")
      ) {
        fields.motherDateOfBirth = answer || null;
      }
    }
  }

  return fields;
}

// Helper function to calculate duration from start and end times
function calculateDuration(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

  // Round to nearest standard duration (15, 30, or 60)
  if (durationMinutes <= 20) return 15;
  if (durationMinutes <= 45) return 30;
  return 60;
}

export async function GET(request: NextRequest) {
  try {
    // Extract event_uri from query parameters
    const searchParams = request.nextUrl.searchParams;
    const eventUri = searchParams.get("event_uri");

    // Validate event_uri parameter
    if (!eventUri) {
      return NextResponse.json(
        { success: false, message: "Missing event_uri parameter" },
        { status: 400 },
      );
    }

    // Check if booking already exists in Supabase (idempotency)
    const { data: existingBooking } = await supabaseAdmin
      .from("bookings")
      .select("confirmation_token")
      .eq("calendly_event_uri", eventUri)
      .single();

    if (existingBooking) {
      // Booking already created, return existing token
      return NextResponse.json({
        success: true,
        confirmationToken: existingBooking.confirmation_token,
      });
    }

    // Fetch event from Calendly API
    const calendlyToken = process.env.CALENDLY_API_PERSONAL_ACCESS_TOKEN;
    if (!calendlyToken) {
      console.error("CALENDLY_API_PERSONAL_ACCESS_TOKEN not configured");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 },
      );
    }

    const eventResponse = await fetch(eventUri, {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!eventResponse.ok) {
      // Event not found yet in Calendly
      return NextResponse.json(
        { success: false, message: "Event not found in Calendly" },
        { status: 404 },
      );
    }

    const eventData: CalendlyScheduledEvent = await eventResponse.json();

    // Fetch invitees for this event
    const inviteesResponse = await fetch(`${eventUri}/invitees`, {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!inviteesResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch invitees" },
        { status: 404 },
      );
    }

    const inviteesData = await inviteesResponse.json();
    const invitees = inviteesData.collection;

    if (!invitees || invitees.length === 0) {
      return NextResponse.json(
        { success: false, message: "No invitees found" },
        { status: 404 },
      );
    }

    // Get the first invitee (should only be one for single-person bookings)
    const inviteeUri = invitees[0].uri;

    // Fetch full invitee details
    const inviteeResponse = await fetch(inviteeUri, {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!inviteeResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch invitee details" },
        { status: 404 },
      );
    }

    const inviteeData: CalendlyInvitee = await inviteeResponse.json();
    const invitee = inviteeData.resource;

    // Extract booking fields
    const bookingFields = extractBookingFields(invitee);

    // Calculate duration
    const duration = calculateDuration(
      eventData.resource.start_time,
      eventData.resource.end_time,
    );

    // Generate confirmation token
    const confirmationToken = crypto.randomUUID();

    // Calculate token expiration (7 days from now)
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setDate(
      tokenExpiresAt.getDate() +
        parseInt(process.env.TOKEN_EXPIRATION_DAYS || "7"),
    );

    // Store booking in Supabase
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        confirmation_token: confirmationToken,
        calendly_event_uri: eventUri,
        first_name: bookingFields.firstName,
        last_name: bookingFields.lastName,
        email: bookingFields.email,
        phone: bookingFields.phone || null,
        date_of_birth: bookingFields.dateOfBirth || null,
        mother_first_name: bookingFields.motherFirstName,
        mother_last_name: bookingFields.motherLastName,
        mother_date_of_birth: bookingFields.motherDateOfBirth,
        duration,
        booking_timestamp: invitee.created_at,
        token_expires_at: tokenExpiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error storing booking in Supabase:", error);
      return NextResponse.json(
        { success: false, message: "Failed to store booking" },
        { status: 500 },
      );
    }

    console.log("Booking created from Calendly API:", {
      bookingId: booking.id,
      email: booking.email,
      confirmationToken,
    });

    // Return confirmation token
    return NextResponse.json({
      success: true,
      confirmationToken: booking.confirmation_token,
    });
  } catch (error) {
    console.error("Error in polling endpoint:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
