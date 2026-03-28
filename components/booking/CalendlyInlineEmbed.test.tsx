import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fc from "fast-check";

/**
 * Bug Condition Exploration Test for Calendly Booking Confirmation Flow
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 2.1, 2.2**
 *
 * This test explores the race condition bug where users are redirected with token=pending
 * before the webhook creates the actual booking with a real UUID token.
 *
 * **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * **DO NOT attempt to fix the test or the code when it fails.**
 *
 * The test encodes the expected behavior: redirect should happen with a valid UUID token
 * only after the webhook has created the booking.
 */

// Mock router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Calendly hook
let onEventScheduledCallback: ((e: any) => void) | null = null;
vi.mock("react-calendly", () => ({
  InlineWidget: ({ url }: { url: string }) => (
    <div data-testid="calendly-widget">{url}</div>
  ),
  useCalendlyEventListener: ({
    onEventScheduled,
  }: {
    onEventScheduled: (e: any) => void;
  }) => {
    onEventScheduledCallback = onEventScheduled;
  },
}));

describe("Bug Condition Exploration: Race Condition Between Redirect and Webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    onEventScheduledCallback = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * Property 1: Expected Behavior - Valid Token After Webhook Completion
   *
   * **GOAL**: Verify that after the fix, the system redirects with a valid UUID token
   * after the webhook completes (not "pending")
   *
   * **Expected Behavior**: When onEventScheduled fires, the system should poll the
   * /api/bookings/poll endpoint until the webhook creates the booking, then redirect
   * with a valid UUID token
   *
   * **EXPECTED OUTCOME**: Test PASSES on fixed code (confirms race condition is resolved)
   */
  it("Property 1: Should redirect with valid UUID token after webhook completes (NOT token=pending)", async () => {
    // Import the component to trigger the useCalendlyEventListener hook
    const { CalendlyInlineEmbed } = await import("./CalendlyInlineEmbed");
    const { render } = await import("@testing-library/react");

    // Render the component to set up the event listener
    render(<CalendlyInlineEmbed isOpen={true} onClose={() => {}} />);

    // Property-based test: Generate random Calendly event URIs
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          eventUri: fc.webUrl({ validSchemes: ["https"] }),
          inviteeEmail: fc.emailAddress(),
          inviteeName: fc.string({ minLength: 3, maxLength: 50 }),
        }),
        async (calendlyEvent) => {
          // Reset mock before each property test
          mockPush.mockClear();

          // Generate a valid UUID token for this test
          const validToken = "12345678-1234-1234-1234-123456789abc";

          // Mock fetch to simulate polling endpoint behavior
          // First call returns 404 (booking not found yet)
          // Second call returns success with valid token (webhook completed)
          let pollCallCount = 0;
          global.fetch = vi.fn().mockImplementation(async () => {
            pollCallCount++;

            // Simulate webhook delay - first poll returns 404
            if (pollCallCount === 1) {
              return {
                ok: false,
                status: 404,
                json: async () => ({
                  success: false,
                  message: "Booking not found yet",
                }),
              };
            }

            // Second poll returns success (webhook completed)
            return {
              ok: true,
              status: 200,
              json: async () => ({
                success: true,
                confirmationToken: validToken,
              }),
            };
          });

          // Simulate Calendly event_scheduled callback
          const eventPayload = {
            data: {
              payload: {
                event: {
                  uri: calendlyEvent.eventUri,
                },
                invitee: {
                  email: calendlyEvent.inviteeEmail,
                  name: calendlyEvent.inviteeName,
                },
              },
            },
          };

          // Trigger the onEventScheduled callback
          if (onEventScheduledCallback) {
            onEventScheduledCallback(eventPayload);
          }

          // Wait for polling to complete (2 seconds: first poll + 1 second delay + second poll)
          await new Promise((resolve) => setTimeout(resolve, 2500));

          // ASSERTION: The redirect URL should contain a valid UUID token, NOT "pending"
          expect(mockPush).toHaveBeenCalled();
          const redirectUrl = mockPush.mock.calls[0][0];

          // Extract token from redirect URL
          const tokenMatch = redirectUrl.match(/token=([^&]+)/);
          expect(tokenMatch).toBeTruthy();

          const token = tokenMatch![1];

          // UUID regex pattern
          const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

          // CRITICAL ASSERTION: Token should be a valid UUID, NOT "pending"
          // This will PASS on fixed code, confirming the race condition is resolved
          expect(token).not.toBe("pending");
          expect(token).toMatch(uuidRegex);
          expect(token).toBe(validToken);
        },
      ),
      {
        numRuns: 2, // Run 2 test cases (reduced from 10 to avoid timeout)
        verbose: true,
      },
    );
  }, 30000); // 30 second timeout for property-based test

  /**
   * Unit Test: Verify fixed behavior - polls and redirects with valid UUID token
   *
   * This test documents the fixed behavior after implementing the polling mechanism.
   */
  it("Documents fixed behavior: Polls and redirects with valid UUID token", async () => {
    const { CalendlyInlineEmbed } = await import("./CalendlyInlineEmbed");
    const { render } = await import("@testing-library/react");

    // Clear all mocks before this test
    vi.clearAllMocks();
    mockPush.mockClear();

    render(<CalendlyInlineEmbed isOpen={true} onClose={() => {}} />);

    const validToken = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

    // Mock fetch to simulate successful polling
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        confirmationToken: validToken,
      }),
    });

    const eventPayload = {
      data: {
        payload: {
          event: {
            uri: "https://api.calendly.com/scheduled_events/TEST123",
          },
          invitee: {
            email: "test@example.com",
            name: "Test User",
          },
        },
      },
    };

    if (onEventScheduledCallback) {
      onEventScheduledCallback(eventPayload);
    }

    // Wait for polling to complete
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Fixed behavior: redirects to /confirmation?token={valid-uuid}
    expect(mockPush).toHaveBeenCalledWith(`/confirmation?token=${validToken}`);
  });
});
