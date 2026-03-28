import { describe, it, expect, beforeEach, vi } from "vitest";
import { GET } from "./route";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest } from "next/server";

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(),
  },
}));

// Mock global fetch
global.fetch = vi.fn();

describe("GET /api/bookings/poll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CALENDLY_API_PERSONAL_ACCESS_TOKEN = "test-token";
    process.env.TOKEN_EXPIRATION_DAYS = "7";
  });

  it("should return 400 if event_uri parameter is missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/bookings/poll");

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      success: false,
      message: "Missing event_uri parameter",
    });
  });

  it("should return existing token if booking already exists in Supabase", async () => {
    const mockToken = "550e8400-e29b-41d4-a716-446655440000";
    const mockFrom = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { confirmation_token: mockToken },
            error: null,
          }),
        }),
      }),
    });

    vi.mocked(supabaseAdmin.from).mockImplementation(mockFrom);

    const request = new NextRequest(
      "http://localhost:3000/api/bookings/poll?event_uri=https://api.calendly.com/scheduled_events/test123",
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      success: true,
      confirmationToken: mockToken,
    });
  });

  it("should return 404 if event not found in Calendly API", async () => {
    // Mock Supabase - no existing booking
    const mockFrom = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      }),
    });

    vi.mocked(supabaseAdmin.from).mockImplementation(mockFrom);

    // Mock Calendly API - event not found
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const request = new NextRequest(
      "http://localhost:3000/api/bookings/poll?event_uri=https://api.calendly.com/scheduled_events/test123",
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toEqual({
      success: false,
      message: "Event not found in Calendly",
    });
  });

  it("should create booking and return token when event found in Calendly", async () => {
    const eventUri = "https://api.calendly.com/scheduled_events/test123";
    const mockToken = "550e8400-e29b-41d4-a716-446655440000";

    // Mock Supabase - no existing booking
    const mockSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: null,
          error: null,
        }),
      }),
    });

    const mockInsert = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: {
            id: 1,
            confirmation_token: mockToken,
            email: "test@example.com",
          },
          error: null,
        }),
      }),
    });

    const mockFrom = vi.fn((table: string) => {
      if (table === "bookings") {
        return {
          select: mockSelect,
          insert: mockInsert,
        };
      }
    });

    vi.mocked(supabaseAdmin.from).mockImplementation(mockFrom);

    // Mock Calendly API responses
    vi.mocked(global.fetch)
      // Event fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          resource: {
            uri: eventUri,
            name: "Test Meeting",
            status: "active",
            start_time: "2026-03-30T10:00:00Z",
            end_time: "2026-03-30T10:30:00Z",
            created_at: "2026-03-29T10:00:00Z",
          },
        }),
      } as Response)
      // Invitees fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          collection: [
            {
              uri: "https://api.calendly.com/invitees/inv123",
            },
          ],
        }),
      } as Response)
      // Invitee details fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          resource: {
            uri: "https://api.calendly.com/invitees/inv123",
            email: "test@example.com",
            name: "John Doe",
            first_name: "John",
            last_name: "Doe",
            status: "active",
            created_at: "2026-03-29T10:00:00Z",
            questions_and_answers: [
              {
                question: "Phone Number",
                answer: "123-456-7890",
                position: 0,
              },
            ],
          },
        }),
      } as Response);

    const request = new NextRequest(
      `http://localhost:3000/api/bookings/poll?event_uri=${encodeURIComponent(eventUri)}`,
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      success: true,
      confirmationToken: mockToken,
    });

    // Verify booking was inserted
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        calendly_event_uri: eventUri,
        first_name: "John",
        last_name: "Doe",
        email: "test@example.com",
        phone: "123-456-7890",
        duration: 30,
      }),
    );
  });

  it("should return 500 if CALENDLY_API_PERSONAL_ACCESS_TOKEN is not configured", async () => {
    delete process.env.CALENDLY_API_PERSONAL_ACCESS_TOKEN;

    // Mock Supabase - no existing booking
    const mockFrom = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      }),
    });

    vi.mocked(supabaseAdmin.from).mockImplementation(mockFrom);

    const request = new NextRequest(
      "http://localhost:3000/api/bookings/poll?event_uri=https://api.calendly.com/scheduled_events/test123",
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: "Server configuration error",
    });
  });
});
