import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fc from "fast-check";
import { GET } from "./route";
import { NextRequest } from "next/server";
import crypto from "crypto";

/**
 * Preservation Property Tests for Token Validation
 *
 * **Validates: Requirements 3.2, 3.3**
 *
 * These tests verify that token validation behavior remains unchanged by the bugfix.
 * They observe and capture the current behavior on UNFIXED code.
 *
 * **EXPECTED OUTCOME**: Tests PASS on unfixed code (confirms baseline behavior to preserve)
 */

// Mock Supabase
vi.mock("@/lib/supabase", () => ({
  supabaseAdmin: {
    from: vi.fn(),
  },
}));

// Import after mocking
const { supabaseAdmin: mockSupabaseAdmin } = await import("@/lib/supabase");

describe("Preservation Property Tests: Token Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Property 2.4: Valid Token Returns Booking Details
   *
   * **Validates: Requirement 3.2**
   *
   * For all valid UUID tokens, the system SHALL CONTINUE TO return booking details
   * successfully.
   */
  it("Property 2.4: Valid UUID tokens return booking details successfully", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          firstName: fc.string({ minLength: 1, maxLength: 50 }),
          lastName: fc.string({ minLength: 1, maxLength: 50 }),
          email: fc.emailAddress(),
          phone: fc.string({ minLength: 10, maxLength: 15 }),
          duration: fc.constantFrom(15, 30, 60),
        }),
        async (bookingData) => {
          const validToken = crypto.randomUUID();

          // Mock Supabase to return booking with non-expired token
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + 7);

          const mockSelect = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: crypto.randomUUID(),
                  confirmation_token: validToken,
                  first_name: bookingData.firstName,
                  last_name: bookingData.lastName,
                  email: bookingData.email,
                  phone: bookingData.phone,
                  date_of_birth: null,
                  duration: bookingData.duration,
                  mother_first_name: null,
                  mother_last_name: null,
                  mother_date_of_birth: null,
                  booking_timestamp: new Date().toISOString(),
                  token_expires_at: futureDate.toISOString(),
                },
                error: null,
              }),
            }),
          });

          mockSupabaseAdmin.from.mockReturnValue({
            select: mockSelect,
          });

          // Create request
          const request = new NextRequest(
            `http://localhost/api/bookings/${validToken}`,
          );

          // Call API handler
          const response = await GET(request, {
            params: Promise.resolve({ token: validToken }),
          });
          const data = await response.json();

          // ASSERTION: Should return booking details successfully
          expect(response.status).toBe(200);
          expect(data.success).toBe(true);
          expect(data.data).toBeDefined();
          expect(data.data.firstName).toBe(bookingData.firstName);
          expect(data.data.lastName).toBe(bookingData.lastName);
          expect(data.data.email).toBe(bookingData.email);
          expect(data.data.duration).toBe(bookingData.duration);
        },
      ),
      {
        numRuns: 5,
      },
    );
  });

  /**
   * Property 2.5: Invalid Token Format Returns 401
   *
   * **Validates: Requirement 3.3**
   *
   * For all invalid token formats (non-UUID), the system SHALL CONTINUE TO return
   * 401 status with "Invalid token format" error.
   */
  it("Property 2.5: Invalid token formats return 401 error", async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate invalid tokens (not UUID format)
        fc.oneof(
          fc.constant("pending"),
          fc.constant("invalid"),
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.integer(),
          fc.constant(""),
          fc.constant("abc-123-def"),
        ),
        async (invalidToken) => {
          // Skip if by chance we generate a valid UUID
          const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (uuidRegex.test(String(invalidToken))) {
            return true; // Skip this test case
          }

          const request = new NextRequest(
            `http://localhost/api/bookings/${invalidToken}`,
          );

          const response = await GET(request, {
            params: Promise.resolve({ token: String(invalidToken) }),
          });
          const data = await response.json();

          // ASSERTION: Should return 401 with invalid token format error
          expect(response.status).toBe(401);
          expect(data.success).toBe(false);
          expect(data.error).toBe("Invalid token format");
        },
      ),
      {
        numRuns: 10,
      },
    );
  });

  /**
   * Property 2.6: Non-Existent Token Returns 404
   *
   * **Validates: Requirement 3.3**
   *
   * For all valid UUID tokens that don't exist in the database, the system SHALL
   * CONTINUE TO return 404 status with "Booking not found" error.
   */
  it("Property 2.6: Non-existent tokens return 404 error", async () => {
    await fc.assert(
      fc.asyncProperty(fc.uuid(), async (nonExistentToken) => {
        // Mock Supabase to return no booking
        const mockSelect = vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: "PGRST116" }, // Supabase error for no rows
            }),
          }),
        });

        mockSupabaseAdmin.from.mockReturnValue({
          select: mockSelect,
        });

        const request = new NextRequest(
          `http://localhost/api/bookings/${nonExistentToken}`,
        );

        const response = await GET(request, {
          params: Promise.resolve({ token: nonExistentToken }),
        });
        const data = await response.json();

        // ASSERTION: Should return 404 with booking not found error
        expect(response.status).toBe(404);
        expect(data.success).toBe(false);
        expect(data.error).toBe("Booking not found");
      }),
      {
        numRuns: 5,
      },
    );
  });

  /**
   * Property 2.7: Expired Token Returns 401
   *
   * **Validates: Requirement 3.3**
   *
   * For all expired tokens, the system SHALL CONTINUE TO return 401 status with
   * "Token has expired" error.
   */
  it("Property 2.7: Expired tokens return 401 error", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          firstName: fc.string({ minLength: 1, maxLength: 50 }),
          email: fc.emailAddress(),
          daysExpired: fc.integer({ min: 1, max: 365 }),
        }),
        async (testData) => {
          const expiredToken = crypto.randomUUID();

          // Mock Supabase to return booking with expired token
          const pastDate = new Date();
          pastDate.setDate(pastDate.getDate() - testData.daysExpired);

          const mockSelect = vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: {
                  id: crypto.randomUUID(),
                  confirmation_token: expiredToken,
                  first_name: testData.firstName,
                  last_name: "Test",
                  email: testData.email,
                  phone: null,
                  date_of_birth: null,
                  duration: 30,
                  mother_first_name: null,
                  mother_last_name: null,
                  mother_date_of_birth: null,
                  booking_timestamp: new Date().toISOString(),
                  token_expires_at: pastDate.toISOString(),
                },
                error: null,
              }),
            }),
          });

          mockSupabaseAdmin.from.mockReturnValue({
            select: mockSelect,
          });

          const request = new NextRequest(
            `http://localhost/api/bookings/${expiredToken}`,
          );

          const response = await GET(request, {
            params: Promise.resolve({ token: expiredToken }),
          });
          const data = await response.json();

          // ASSERTION: Should return 401 with token expired error
          expect(response.status).toBe(401);
          expect(data.success).toBe(false);
          expect(data.error).toBe("Token has expired");
        },
      ),
      {
        numRuns: 5,
      },
    );
  });

  /**
   * Unit Test: Specific test for "pending" token (the bug symptom)
   *
   * **Validates: Requirement 3.3**
   */
  it('Unit Test: "pending" token returns 401 Invalid token format', async () => {
    const request = new NextRequest("http://localhost/api/bookings/pending");

    const response = await GET(request, {
      params: Promise.resolve({ token: "pending" }),
    });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid token format");
  });

  /**
   * Unit Test: Empty token returns 401
   *
   * **Validates: Requirement 3.3**
   */
  it("Unit Test: Empty token returns 401 Invalid token format", async () => {
    const request = new NextRequest("http://localhost/api/bookings/");

    const response = await GET(request, {
      params: Promise.resolve({ token: "" }),
    });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Invalid token format");
  });
});
