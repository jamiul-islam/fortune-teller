import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

// Interface for Calendly webhook payload
interface CalendlyWebhookPayload {
  event: string;
  payload: {
    event_uri: string;
    invitee: {
      uri: string;
      email: string;
      name: string;
      first_name?: string;
      last_name?: string;
      created_at: string;
      questions_and_answers?: Array<{
        question: string;
        answer: string;
        position: number;
      }>;
    };
    event: {
      uri: string;
      name: string;
      start_time: string;
      end_time: string;
    };
  };
}

// Helper function to verify webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  signingKey: string,
): boolean {
  try {
    const hmac = crypto.createHmac("sha256", signingKey);
    const digest = hmac.update(payload, "utf8").digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return false;
  }
}

// Helper function to extract booking fields from questions_and_answers
function extractBookingFields(
  invitee: CalendlyWebhookPayload["payload"]["invitee"],
) {
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

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("calendly-webhook-signature");

    // Verify signature
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
    if (!signingKey) {
      console.error("CALENDLY_WEBHOOK_SIGNING_KEY not configured");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 },
      );
    }

    if (!signature) {
      console.error("Missing webhook signature");
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 401 },
      );
    }

    const isValid = verifyWebhookSignature(rawBody, signature, signingKey);
    if (!isValid) {
      console.error(
        "Invalid webhook signature - potential security violation",
        {
          receivedSignature: signature,
          timestamp: new Date().toISOString(),
        },
      );
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 },
      );
    }

    // Parse the payload
    const webhookPayload: CalendlyWebhookPayload = JSON.parse(rawBody);

    // Only process invitee.created events
    if (webhookPayload.event !== "invitee.created") {
      return NextResponse.json({
        success: true,
        message: "Event type not processed",
      });
    }

    const { invitee, event: eventData, event_uri } = webhookPayload.payload;

    // Check for duplicate webhook (idempotency)
    const { data: existingBooking } = await supabaseAdmin
      .from("bookings")
      .select("id, confirmation_token")
      .eq("calendly_event_uri", event_uri)
      .single();

    if (existingBooking) {
      console.log("Duplicate webhook received for event:", event_uri);
      return NextResponse.json({
        success: true,
        message: "Booking already processed",
        confirmationToken: existingBooking.confirmation_token,
      });
    }

    // Extract booking fields
    const bookingFields = extractBookingFields(invitee);

    // Calculate duration
    const duration = calculateDuration(
      eventData.start_time,
      eventData.end_time,
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
        calendly_event_uri: event_uri,
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

    console.log("Booking stored successfully:", {
      bookingId: booking.id,
      email: booking.email,
      confirmationToken,
    });

    return NextResponse.json({
      success: true,
      message: "Booking processed successfully",
      confirmationToken,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
