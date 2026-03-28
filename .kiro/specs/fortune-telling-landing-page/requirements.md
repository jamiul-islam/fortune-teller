# Requirements Document

## Introduction

A NextJS fortune-telling landing page application, called iTellFortune, that enables users to book consultations through Calendly Premium inline embed with Stripe payment processing. The application provides an immersive, mystical user experience with fullscreen video backgrounds, smooth animations, and a streamlined booking flow. After payment confirmation, Calendly sends webhook notifications to the NextJS backend, which securely stores booking data in Supabase and generates unique confirmation tokens. Users are redirected to a post-payment confirmation page featuring a welcome video, personalized fortune notes, and navigation to their solution details. The fortune teller receives instant alerts (Calendly mobile app + SMS) for immediate callback.

## Glossary

- **Landing_Page**: The main public-facing page where users learn about services and initiate bookings
- **Booking_System**: The Calendly Premium integration that handles appointment scheduling and payment processing (Calendly manages Stripe integration internally)
- **Calendly_Inline_Embed**: The Calendly embed method where the booking interface appears directly embedded on the page (not popup or redirect)
- **Confirmation_Page**: The post-payment interface where users view welcome video, fortune note, and navigation options
- **Post_Payment_Interface**: The complete confirmation experience including welcome video, solution card, personalized video, fortune note, and booking options
- **Fortune_Note**: A simple, powerful message selected from a JSON file containing 10 pre-written fortune messages
- **Consultation_Category**: One of five marketing categories displayed on the landing page (Love & Relationships, Career & Success, Health & Energy, Natural Treatments, Destiny & Spirituality, Specific Questions)
- **Supabase_Database**: The database system storing user bookings received from Calendly webhooks
- **Hero_Section**: The fullscreen video section at the top of the landing page
- **Duration_Option**: The consultation length choices (15, 30, or 60 minutes)
- **Calendly_Webhook**: The secure server-to-server notification sent by Calendly when an event is scheduled
- **Webhook_Endpoint**: The NextJS API route that receives and processes Calendly webhook notifications
- **Confirmation_Token**: A unique, secure identifier used to fetch booking details on the confirmation page
- **Fortune_Teller**: The service provider who receives instant alerts and calls clients back
- **Booking_Fields**: Required and optional information collected during Calendly booking (name, DOB, phone, email, mother's info)
- **Solution_Card**: A pre-designed visual summary displayed on the "Your Solution" page
- **Welcome_Video**: A video thanking the client, displayed on the confirmation page after payment

## Requirements

### Requirement 1: Hero Section Display

**User Story:** As a visitor, I want to see an immersive hero section with autoplay video, so that I feel engaged with the mystical atmosphere immediately.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a fullscreen hero section with autoplay background video
2. THE Hero_Section SHALL display the main title "Your future is trying to speak to you"
3. THE Hero_Section SHALL display the subtitle "Clarity. Guidance. Immediate answers"
4. THE Hero_Section SHALL display a call-to-action button labeled "Book a Reading"
5. THE Hero_Section SHALL occupy 100vh of viewport height

### Requirement 2: Consultation Category Display

**User Story:** As a visitor, I want to see the types of consultations offered, so that I understand what guidance is available.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a section titled "What is your urgent concern today?"
2. THE Landing_Page SHALL display five Consultation_Category groups with their subcategories:
   - Love & Relationships (Love problems, Couple repair, Reconciliation, Soulmate guidance, Breakups)
   - Career & Success (Business success, Career blockage, Financial opportunities)
   - Health & Energy (Natural healing, Energy cleansing, Emotional balance)
   - Natural Treatments (Natural healing for all illnesses, Energy via natural treatment, Feminine fertility, Masculine fertility, Feminine endurance, Masculine endurance, Natural recovery for complex conditions)
   - Destiny & Spirituality (Luck, Destiny, Spiritual messages, Life path)
   - Specific Questions (Any personal question)
3. THE Landing_Page SHALL display Consultation_Category information for marketing purposes only
4. THE Landing_Page SHALL NOT require users to select a category before booking

### Requirement 3: Calendly Inline Embed Integration with Instant Alerts

**User Story:** As a user, I want to book and pay for a consultation directly on the page with instant confirmation, so that I can quickly secure my appointment and the fortune teller can call me back immediately.

#### Acceptance Criteria

1. WHEN a user clicks "Book a Reading", THE Booking_System SHALL display the Calendly_Inline_Embed directly on the page
2. THE Booking_System SHALL use Calendly inline embed method only (not popup or redirect methods)
3. THE Booking_System SHALL process payments through Calendly's integrated Stripe payment system (configured in Calendly dashboard, not in NextJS code)
4. THE Booking_System SHALL support three Duration_Options with corresponding prices: 15 minutes (£30), 30 minutes (£50), and 60 minutes (£100)
5. THE Booking_System SHALL collect the following Booking_Fields: First Name (required), Last Name (required), Date of Birth (required), Mother's First Name (optional), Mother's Last Name (optional), Mother's Date of Birth (optional), Phone Number (required), Email Address (required)
6. WHEN a booking is confirmed with payment, THE Booking_System SHALL send an instant alert to the Fortune_Teller via Calendly mobile app
7. WHEN a booking is confirmed with payment, THE Booking_System SHALL send an SMS notification to the Fortune_Teller
8. THE Calendly account SHALL be configured with Stripe test mode during development (configured in Calendly dashboard by intern, not in application code)

### Requirement 4: Calendly Webhook Integration for Secure Event Reception

**User Story:** As a system, I want to securely receive booking data from Calendly via webhooks, so that I can process confirmed bookings and redirect users to the confirmation page.

#### Acceptance Criteria

1. THE Booking_System SHALL implement a Webhook_Endpoint as a NextJS API route to receive Calendly webhook notifications
2. WHEN Calendly sends a webhook notification for a scheduled event, THE Webhook_Endpoint SHALL verify the webhook signature for security
3. THE Webhook_Endpoint SHALL extract all Booking_Fields from the webhook payload (First Name, Last Name, Date of Birth, Phone Number, Email Address, Mother's First Name, Mother's Last Name, Mother's Date of Birth)
4. THE Webhook_Endpoint SHALL extract the selected Duration_Option from the webhook payload
5. THE Webhook_Endpoint SHALL extract the booking timestamp and event URI from the webhook payload
6. WHEN webhook signature verification fails, THE Webhook_Endpoint SHALL reject the request and log the security violation
7. THE Webhook_Endpoint SHALL use Calendly webhook subscription API to register for "invitee.created" events

### Requirement 5: Booking Data Storage and Confirmation Token Generation

**User Story:** As a system administrator, I want confirmed bookings stored in Supabase with secure tokens, so that I can track consultations and enable secure confirmation page access.

#### Acceptance Criteria

1. WHEN booking data is received from Calendly_Webhook, THE Booking_System SHALL store the data in Supabase_Database
2. THE Supabase_Database SHALL store First Name, Last Name, Date of Birth, Phone Number, and Email Address as required fields
3. THE Supabase_Database SHALL store Mother's First Name, Mother's Last Name, and Mother's Date of Birth as optional fields
4. THE Supabase_Database SHALL store the selected Duration_Option and booking timestamp
5. THE Supabase_Database SHALL associate each booking with the unique event identifier from Calendly
6. WHEN storing a booking, THE Booking_System SHALL generate a unique Confirmation_Token for secure access
7. THE Booking_System SHALL store the Confirmation_Token in Supabase_Database associated with the booking record

### Requirement 6: Fortune Notes JSON Configuration

**User Story:** As a content manager, I want fortune notes stored in a JSON file, so that I can easily manage and update the personalized messages.

#### Acceptance Criteria

1. THE Confirmation_Page SHALL load fortune notes from a JSON configuration file
2. THE JSON file SHALL contain exactly 10 Fortune_Note messages
3. THE JSON file SHALL include the following Fortune_Note messages:
   - "Your path is opening. The confusion you feel now is temporary, and clarity is already moving toward you."
   - "You are protected. The energy around you is shifting in your favor, even if you don't see it yet."
   - "Your situation is solvable. A breakthrough is forming, and the pressure you feel will soon release."
   - "Someone is thinking about you more than you realize. A reconnection or understanding is approaching."
   - "Your future is not blocked — it is reorganizing itself to bring you something better than what you lost."
   - "Your health and energy will rise again. Your body and spirit are entering a phase of recovery and strength."
   - "Success is coming. A small decision or change will unlock a much bigger opportunity for you."
   - "Your heart will heal. What feels heavy today will soon feel lighter, and emotional balance will return."
   - "You are not alone. A guiding force is watching over you and helping you move toward the right direction."
   - "Your intuition is waking up. Trust the signs you're receiving — they are leading you exactly where you need to go."
4. THE JSON file SHALL be located in the project configuration directory

### Requirement 7: Post-Payment Confirmation Interface

**User Story:** As a user who just completed payment, I want to see a welcome video and access my personalized solution, so that I receive immediate value while waiting for the callback.

#### Acceptance Criteria

1. WHEN a user completes booking with payment, THE Booking_System SHALL redirect the user to the Confirmation_Page with a Confirmation_Token
2. THE Confirmation_Page SHALL display a Welcome_Video thanking the client for booking
3. THE Confirmation_Page SHALL display two navigation buttons: "Your Solution" and "New Consultation"
4. WHEN a user clicks "Your Solution", THE Confirmation_Page SHALL navigate to the solution display page
5. THE solution display page SHALL display a pre-designed Solution_Card as a visual summary
6. WHERE a personalized video is available, THE solution display page SHALL display the personalized video
7. THE solution display page SHALL display one Fortune_Note selected from the JSON file
8. THE solution display page SHALL display a reassuring final message
9. THE solution display page SHALL display a discreet link to book another consultation
10. WHEN a user clicks "New Consultation", THE Confirmation_Page SHALL navigate to the booking options page
11. THE Confirmation_Page SHALL fetch booking details securely using the Confirmation_Token

### Requirement 8: Secure Confirmation Page Data Retrieval

**User Story:** As a system, I want to securely provide booking details to the confirmation page, so that users can only access their own booking information.

#### Acceptance Criteria

1. THE Confirmation_Page SHALL implement a NextJS API route to fetch booking details by Confirmation_Token
2. WHEN the Confirmation_Page receives a Confirmation_Token, THE API route SHALL query Supabase_Database for the associated booking
3. THE API route SHALL return booking details only if the Confirmation_Token is valid and not expired
4. THE API route SHALL return all Booking_Fields and Duration_Option for display purposes
5. WHEN a Confirmation_Token is invalid or expired, THE API route SHALL return an error response
6. THE Confirmation_Token SHALL expire after 7 days for security purposes

### Requirement 9: Post-Payment Redirect Mechanism

**User Story:** As a user who completes payment, I want to be automatically redirected to my confirmation page, so that I can immediately access my personalized content.

#### Acceptance Criteria

1. THE Booking_System SHALL configure Calendly to redirect users after successful booking completion
2. WHEN a webhook is received and processed, THE Webhook_Endpoint SHALL generate a Confirmation_Token
3. THE Booking_System SHALL use Calendly's redirect URL feature to send users to the Confirmation_Page with the Confirmation_Token as a URL parameter
4. THE redirect URL SHALL follow the format: /confirmation?token={Confirmation_Token}
5. WHEN the Calendly_Inline_Embed detects a successful booking, THE Booking_System SHALL handle the redirect client-side if server-side redirect is not available

### Requirement 10: Social Proof Display

**User Story:** As a potential customer, I want to see testimonials from previous clients, so that I can trust the service quality.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a section titled "They found their answers"
2. THE Landing_Page SHALL display at least three client testimonials
3. THE Landing_Page SHALL occupy 100vh of viewport height for the social proof section

### Requirement 11: Trust and Guarantee Display

**User Story:** As a user, I want to understand the service guarantees, so that I feel confident about booking.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a section titled "A reliable and confidential consultation"
2. THE Landing_Page SHALL display three trust indicators with icons: confidentiality, immediate response, and personalized guidance
3. THE Landing_Page SHALL occupy 100vh of viewport height for the trust section

### Requirement 12: Intern Setup Documentation

**User Story:** As an intern agent, I want step-by-step documentation for setting up Calendly and Stripe integration, so that I can configure the system correctly.

#### Acceptance Criteria

1. THE Booking_System SHALL include documentation in the "intern-agent-doc" directory
2. THE documentation SHALL provide step-by-step instructions for creating a Calendly Premium account
3. THE documentation SHALL provide step-by-step instructions for connecting Stripe business account to Calendly (this is configured entirely within the Calendly dashboard)
4. THE documentation SHALL provide instructions for configuring Stripe test mode vs live mode in the Calendly dashboard
5. THE documentation SHALL provide instructions for configuring the three Duration_Options with prices: £30 (15 min), £50 (30 min), £100 (60 min)
6. THE documentation SHALL provide instructions for configuring Calendly mobile app notifications
7. THE documentation SHALL provide instructions for configuring SMS notifications for the Fortune_Teller
8. THE documentation SHALL provide instructions for configuring custom Booking_Fields in Calendly
9. THE documentation SHALL provide instructions for setting up Calendly webhook subscriptions
10. THE documentation SHALL provide instructions for obtaining Calendly webhook signing key for signature verification
11. THE documentation SHALL provide instructions for configuring Calendly inline embed on NextJS pages

### Requirement 13: Visual Design and Animation

**User Story:** As a visitor, I want to experience smooth animations and modern design, so that the application feels professional and engaging.

#### Acceptance Criteria

1. THE Landing_Page SHALL implement scroll-based animations using Motion.js
2. THE Landing_Page SHALL implement parallax effects for visual depth
3. THE Landing_Page SHALL use a mystical premium color palette with cosmic purples, mystic gold, and celestial accents
4. THE Landing_Page SHALL apply 100vh section heights throughout the page
5. THE Landing_Page SHALL follow Microsoft HCI principles for navigation and interaction design

### Requirement 14: Responsive Design

**User Story:** As a mobile user, I want the application to work seamlessly on my device, so that I can book consultations from anywhere.

#### Acceptance Criteria

1. THE Landing_Page SHALL display correctly on mobile devices with screen widths from 320px to 768px
2. THE Landing_Page SHALL display correctly on tablet devices with screen widths from 768px to 1024px
3. THE Landing_Page SHALL display correctly on desktop devices with screen widths above 1024px
4. THE Landing_Page SHALL maintain 100vh section heights across all device sizes
5. WHEN viewport width is below 768px, THE Landing_Page SHALL adjust button sizes and text for touch interaction

### Requirement 15: Footer Information

**User Story:** As a user, I want to access legal and contact information, so that I can understand terms and reach support if needed.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a footer section with three links: Legal notice, Privacy policy, and Contact
2. WHEN a user clicks a footer link, THE Landing_Page SHALL navigate to the corresponding information page
3. THE Landing_Page SHALL display the footer at the bottom of all pages

### Requirement 16: Video Content Management

**User Story:** As a content administrator, I want to manage video content for the hero section, so that I can update the user experience.

#### Acceptance Criteria

1. THE Landing_Page SHALL load hero video from a configurable video source URL
2. THE Landing_Page SHALL display a fallback image if video fails to load
3. THE Landing_Page SHALL optimize video loading for performance

### Requirement 17: Performance Optimization

**User Story:** As a user, I want the page to load quickly, so that I don't lose interest while waiting.

#### Acceptance Criteria

1. THE Landing_Page SHALL achieve a Lighthouse performance score above 80
2. THE Landing_Page SHALL lazy-load video content below the fold
3. THE Landing_Page SHALL optimize images for web delivery
4. THE Landing_Page SHALL implement code splitting for faster initial page load

### Requirement 18: Deployment Configuration

**User Story:** As a developer, I want the application deployed on Vercel, so that it's accessible to users with high availability.

#### Acceptance Criteria

1. THE Landing_Page SHALL be deployed on Vercel platform
2. THE Landing_Page SHALL use environment variables for Calendly webhook signing key, Calendly API token, and Supabase credentials
3. THE Landing_Page SHALL implement proper error handling for API failures
4. THE Webhook_Endpoint SHALL be accessible at a public URL for Calendly webhook delivery

### Requirement 19: Language Support

**User Story:** As a user, I want to view the application in English or French, so that I can understand all content in my preferred language.

#### Acceptance Criteria

1. THE Landing_Page SHALL support both English and French languages
2. THE Landing_Page SHALL display a language toggle button in the header showing "EN" or "FR"
3. WHEN a user clicks the language toggle, THE application SHALL switch between English and French
4. THE language toggle button SHALL be positioned in the header before the phone call icon
5. THE Confirmation_Page SHALL display all content in the user's selected language
6. THE Solution_Page SHALL display all content in the user's selected language
7. THE Fortune_Note messages SHALL be available in both English and French
8. THE application SHALL persist the user's language preference across page navigation
9. THE application SHALL use NextJS native i18n routing for internationalization
10. THE default language SHALL be English when no preference is set
