# Implementation Plan: iTellFortune Landing Page

## Overview

Fifteen focused tasks that build the platform incrementally — from NextJS setup through design system, landing page sections, responsive polish, Calendly embed, database, backend APIs, confirmation/solution pages, intern docs, and optional property tests. Each task ends with `bun run lint && bun run build` before committing.

**Package manager**: bun (v1.3.0) — use `bun` for ALL commands, never `npm` or `yarn`
**Install target**: current directory (project root)
**Git remote**: https://github.com/jamiul-islam/fortune-teller.git

---

## Tasks

- [x] 1. Project Setup & NextJS Installation
  - [x] 1.1 Install NextJS in the current directory
    - Run: `bunx create-next-app@latest .` (select TypeScript, Tailwind CSS, App Router, no src/ dir)
    - _Requirements: 18.1, 18.2_
  - [x] 1.2 Install all runtime dependencies
    - Run: `bun add motion @supabase/supabase-js react-calendly`
    - _Requirements: 3.1, 5.1, 13.1_
  - [x] 1.3 Create `/config/fortune-notes.json` with all 10 fortune messages
    - Use the exact messages from Requirements 6.3
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 1.4 Add all required env keys to `.env.local` (file already exists — do NOT overwrite)
    - Keys: `NEXT_PUBLIC_CALENDLY_URL`, `CALENDLY_WEBHOOK_SIGNING_KEY`, `CALENDLY_API_PERSONAL_ACCESS_TOKEN`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_BASE_URL`, `TOKEN_EXPIRATION_DAYS`, `NEXT_PUBLIC_HERO_VIDEO_URL`, `NEXT_PUBLIC_WELCOME_VIDEO_URL`
    - _Requirements: 18.2_

  After completion:

- run `bun run lint` then `bun run build`. Both must pass with zero errors.
- use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
- finally commit:

  ```bash
  feat: initialize NextJS project with all dependencies

  - Install NextJS 14+ with TypeScript, Tailwind CSS, App Router in project root
  - Add motion, @supabase/supabase-js, react-calendly
  - Create /config/fortune-notes.json with 10 fortune messages
  - Add required env keys to .env.local
  ```

---

- [ ] 1.5 Set up shadcn/ui and Replace Global CSS
  - [ ] 1.5.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up shadcn/ui installation and configuration docs before proceeding
  - [ ] 1.5.2 Remove all existing content from `app/globals.css`
  - [ ] 1.5.3 Add shadcn/ui recommended global CSS configuration to `app/globals.css`
    - Include @tailwind directives
    - Add shadcn/ui CSS variable definitions in @layer base
    - _Requirements: 13.1, 13.3_
  - [ ] 1.5.4 Integrate mystical premium color palette as CSS variables
    - Cosmic purples (--cosmic-purple-900, --cosmic-purple-800, --cosmic-purple-700)
    - Mystic gold (--mystic-gold), Celestial blue (--celestial-blue), Ethereal pink (--ethereal-pink)
    - Cosmic teal (--cosmic-teal), Pearl white (--pearl-white), Soft gray (--soft-gray), Deep space (--deep-space)
    - Map colors to shadcn/ui semantic tokens (--background, --foreground, --primary, --secondary, --accent, --card, --border, --ring)
    - _Requirements: 13.3_
  - [ ] 1.5.5 Verify `components.json` configuration is correct (radix-maia style, tabler icons)

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: set up shadcn/ui and replace global.css with mystical premium palette

  - Remove existing global.css content
  - Add shadcn/ui recommended CSS configuration
  - Integrate mystical premium color palette as CSS variables
  - Map colors to shadcn/ui semantic tokens
  - Verify components.json configuration
  ```

---

- [x] 2. Tailwind Design System & Global Styles
  - [x] 2.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up Tailwind CSS v4 configuration docs before proceeding
  - [x] 2.2 Configure custom Tailwind color palette in `tailwind.config.ts`
    - Red shades (e.g. `#C0392B`, `#922B21`, `#7B241C`), off-white (`#F5F0EB`), near-black (`#1A1A1A`) — NOT pure #FF0000/#FFFFFF/#000000
    - _Requirements: 13.3_
  - [x] 2.3 Set up global CSS in `app/globals.css`
    - Smooth scroll, font imports (Google Fonts or next/font), base resets
    - _Requirements: 13.1_
  - [x] 2.4 Create reusable `components/ui/Button.tsx` and `components/ui/SectionWrapper.tsx`
    - Button: primary/secondary variants, min touch target 44×44px
    - SectionWrapper: enforces `min-h-screen` (100vh), accepts className prop
    - _Requirements: 13.4, 14.5_
  - [ ] 2.5 Install shadcn/ui Button and Card components
    - Run: `bunx shadcn@latest add button`
    - Run: `bunx shadcn@latest add card`
    - _Requirements: 13.1_

  After completion:

- run `bun run lint` then `bun run build`. Both must pass with zero errors.
- use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
- finally commit:

  ```bash
  feat: set up Tailwind design system and install shadcn/ui components

  - Custom color palette: red shades, off-white, near-black (no pure colors)
  - Global CSS with smooth scroll and font imports
  - Button component with primary/secondary variants, 44px touch targets
  - SectionWrapper component enforcing 100vh min-height
  - Install shadcn/ui Button and Card components
  ```

---

- [x] 3. Hero Section
  - [x] 3.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up Motion.js entrance animation docs before proceeding
  - [x] 3.2 Create `components/sections/HeroSection.tsx`
    - Fullscreen 100vh YouTube iframe as background (autoplay, muted, loop via embed params)
    - Title: "Your future is trying to speak to you", subtitle: "Clarity. Guidance. Immediate answers"
    - "Book a Reading" CTA button using the Button component
    - Fallback static image displayed on iframe load failure
    - Motion.js entrance animation (fade-in + slide-up) on title and subtitle
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 16.1, 16.2, 16.3_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: build HeroSection with YouTube background and Motion.js animations

  - Fullscreen 100vh YouTube iframe background (autoplay, muted, loop)
  - Title, subtitle, and "Book a Reading" CTA
  - Fallback static image on video load failure
  - Motion.js fade-in + slide-up entrance animations
  ```

---

- [x] 4. Consultation Categories & Social Proof Sections
  - [x] 4.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up Motion.js scroll animation and stagger docs before proceeding
  - [x] 4.2 Create `components/sections/ConsultationCategoriesSection.tsx`
    - Section title: "What is your urgent concern today?"
    - Display all 6 categories with their subcategories (marketing only, no selection required)
    - 100vh section height; Motion.js scroll-triggered animations on category cards
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 13.1, 13.4_
  - [x] 4.3 Create `components/sections/SocialProofSection.tsx`
    - Section title: "They found their answers"
    - 3 client testimonials with Motion.js stagger animations
    - 100vh section height
    - _Requirements: 10.1, 10.2, 10.3, 13.1_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: add ConsultationCategoriesSection and SocialProofSection

  - 6 consultation categories with subcategories, scroll animations
  - 3 testimonials with Motion.js stagger animations
  - Both sections 100vh height
  ```

---

- [x] 5. Trust Section, Final CTA & Footer — Assemble Page
  - [x] 5.1 Create `components/sections/TrustSection.tsx`
    - Section title: "A reliable and confidential consultation"
    - 3 trust indicators with icons: confidentiality, immediate response, personalized guidance
    - 100vh section height
    - _Requirements: 11.1, 11.2, 11.3_
  - [x] 5.2 Create `components/sections/FinalCTASection.tsx` and `components/sections/FooterSection.tsx`
    - FinalCTA: "Book a Reading" button (same action as hero CTA)
    - Footer: Legal notice, Privacy policy, Contact links; present on all pages
    - _Requirements: 15.1, 15.2, 15.3_
  - [x] 5.3 Assemble all sections in `app/page.tsx`
    - Import and render: HeroSection, ConsultationCategoriesSection, SocialProofSection, TrustSection, FinalCTASection, FooterSection
    - _Requirements: 1.1, 2.1, 10.1, 11.1, 15.1_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: add TrustSection, FinalCTA, Footer and assemble landing page

  - TrustSection: 3 trust indicators with icons, 100vh
  - FinalCTASection: "Book a Reading" button
  - FooterSection: legal/privacy/contact links
  - All sections assembled in app/page.tsx
  ```

---

- [x] 6. Responsive Design & Parallax Effects
  - [x] 6.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up Motion.js `useScroll`/`useTransform` parallax docs before proceeding
  - [x] 6.2 Apply responsive breakpoints across all section components
    - Mobile 320px, tablet 768px, desktop 1024px+
    - Touch targets ≥ 44×44px on all interactive elements when viewport < 768px
    - Verify no horizontal overflow at any breakpoint
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_
  - [x] 6.3 Implement parallax scroll effects using Motion.js `useScroll`/`useTransform`
    - Apply to hero background and at least one other section for visual depth
    - _Requirements: 13.2_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: add responsive breakpoints and Motion.js parallax effects

  - Responsive layout: 320px mobile, 768px tablet, 1024px+ desktop
  - Touch targets ≥ 44×44px on mobile
  - Parallax scroll effects via Motion.js useScroll/useTransform
  ```

---

- [x] 6.5 Refactor All Components to Use shadcn/ui
  - [x] 6.5.1 Refactor HeroSection to use shadcn/ui Button
    - Use Ref MCP to look up shadcn/ui Button component docs
    - Replace custom Button with shadcn/ui Button component
    - Wrap shadcn/ui Button with Motion.js for animations
    - Maintain all existing Motion.js entrance animations
    - _Requirements: 1.4, 13.1_
  - [x] 6.5.2 Refactor ConsultationCategoriesSection to use shadcn/ui Card
    - Use Ref MCP to look up shadcn/ui Card component docs
    - Replace custom card elements with shadcn/ui Card, CardHeader, CardTitle, CardContent
    - Wrap shadcn/ui Card with Motion.js for scroll animations
    - Maintain all existing Motion.js scroll-triggered animations
    - _Requirements: 2.1, 2.2, 13.1_
  - [x] 6.5.3 Refactor SocialProofSection to use shadcn/ui Card
    - Replace testimonial cards with shadcn/ui Card components
    - Wrap shadcn/ui Card with Motion.js for stagger animations
    - Maintain all existing Motion.js stagger effects
    - _Requirements: 10.1, 10.2, 13.1_
  - [x] 6.5.4 Refactor TrustSection to use shadcn/ui Card
    - Replace trust indicator cards with shadcn/ui Card components
    - Wrap shadcn/ui Card with Motion.js for animations
    - Maintain all existing Motion.js animations
    - _Requirements: 11.1, 11.2, 13.1_
  - [x] 6.5.5 Refactor FinalCTASection to use shadcn/ui Button
    - Replace custom Button with shadcn/ui Button component
    - Wrap shadcn/ui Button with Motion.js for animations
    - Maintain all existing Motion.js animations
    - _Requirements: 15.1, 13.1_
  - [x] 6.5.6 Refactor FooterSection to use shadcn/ui components
    - Use shadcn/ui components for footer links and layout
    - Maintain existing footer structure and navigation
    - _Requirements: 15.2, 15.3, 13.1_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the requirements and design doc and three steering docs.
  - finally commit:

  ```bash
  feat: refactor all landing page sections to use shadcn/ui components

  - Refactor HeroSection to use shadcn/ui Button with Motion.js
  - Refactor ConsultationCategoriesSection to use shadcn/ui Card with scroll animations
  - Refactor SocialProofSection to use shadcn/ui Card with stagger animations
  - Refactor TrustSection to use shadcn/ui Card
  - Refactor FinalCTASection to use shadcn/ui Button
  - Refactor FooterSection to use shadcn/ui components
  - All Motion.js animations maintained
  ```

---

- [ ] 6.6 Implement NextJS Native i18n Internationalization (EN/FR)
  - [x] 6.6.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up NextJS i18n routing and next-i18next docs before proceeding
  - [x] 6.6.2 Install next-i18next: `bun add next-i18next`
  - [x] 6.6.3 Configure i18n in `next.config.ts`
    - Add i18n configuration with locales: ["en", "fr"], defaultLocale: "en", localeDetection: true
    - _Requirements: 19.1, 19.9, 19.10_
  - [x] 6.6.4 Create translation directory structure
    - Create `/locales/en/common.json` with all English translations
    - Create `/locales/fr/common.json` with all French translations
    - Include translations for: header, hero, categories, social proof, trust, footer, confirmation, solution
    - _Requirements: 19.1, 19.2, 19.5, 19.6_
  - [x] 6.6.5 Update `/config/fortune-notes.json` to bilingual structure
    - Restructure to have "en" and "fr" keys with 10 fortune notes each
    - English notes remain the same
    - Add French translations for all 10 fortune notes
    - _Requirements: 19.7_
  - [x] 6.6.6 Create `components/LanguageToggle.tsx`
    - Use shadcn/ui Button component with variant="ghost" and size="sm"
    - Display "EN" when current locale is English, "FR" when French
    - Toggle between locales using NextJS router.push with locale parameter
    - _Requirements: 19.2, 19.3_
  - [x] 6.6.7 Create `components/sections/HeaderSection.tsx`
    - Website title "iTellFortune" on the left
    - LanguageToggle button and phone icon on the right
    - LanguageToggle positioned before phone icon
    - Fixed header with backdrop blur
    - _Requirements: 19.4_
  - [x] 6.6.8 Refactor all section components to use translations
    - Update HeroSection to use `useTranslation("common")` hook
    - Update ConsultationCategoriesSection to use translations
    - Update SocialProofSection to use translations
    - Update TrustSection to use translations
    - Update FooterSection to use translations
    - _Requirements: 19.1, 19.5_
  - [x] 6.6.9 Update confirmation and solution pages to use translations
    - Refactor ConfirmationPage to use `useTranslation("common")`
    - Refactor SolutionPage to use `useTranslation("common")`
    - _Requirements: 19.5, 19.6_
  - [x] 6.6.10 Update fortune notes API to support locale
    - Modify `/app/api/fortune-notes/random/route.ts` to accept locale parameter
    - Return fortune note from correct language array (en or fr)
    - Default to English if locale not specified
    - _Requirements: 19.7_
  - [x] 6.6.11 Add HeaderSection to `app/page.tsx`
    - Import and render HeaderSection at the top of the page
    - Ensure it appears above all other sections
    - _Requirements: 19.4_
  - [x] 6.6.12 Test language persistence across navigation
    - Verify locale persists when navigating between pages
    - Verify locale is stored in cookies and URL
    - _Requirements: 19.8_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - Test language toggle functionality in browser
  - Verify all text switches between EN and FR correctly
  - Verify fortune notes display in correct language
  - finally commit:

  ```bash
  feat: implement NextJS native i18n with EN/FR language toggle

  - Configure NextJS i18n routing with en/fr locales
  - Create translation files for all UI strings in English and French
  - Update fortune-notes.json to bilingual structure with 10 notes per language
  - Add LanguageToggle component with shadcn/ui Button
  - Create HeaderSection with website title, language toggle, and phone icon
  - Refactor all components to use useTranslation hook
  - Update fortune notes API to support locale parameter
  - Language preference persists across navigation via cookies and URL
  ```

---

- [x] 7. Calendly Inline Embed Component
  - [x] 7.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up react-calendly `InlineWidget` docs before proceeding
  - [x] 7.2 Create `components/booking/CalendlyInlineEmbed.tsx`
    - Use `react-calendly` `InlineWidget` (inline only — not popup or redirect)
    - Triggered by "Book a Reading" click (modal overlay or scroll-to section)
    - first check if NEXT_PUBLIC_CALENDLY_URL exists, if not, then Pass `NEXT_PUBLIC_CALENDLY_URL` from env; support optional prefill (name, email)
    - try using shadcn mcp tools, keep consisten with the current shadcn in this project.
    - Wrap in shadcn/ui container components for consistent styling
    - _Requirements: 3.1, 3.2, 13.1_
  - [x] 7.3 Listen for `calendly.event_scheduled` postMessage and handle redirect
    - On successful booking, redirect to `/confirmation?token=pending`
    - Error handling: display message and retry button on embed load failure
    - Use shadcn/ui components for error display
    - _Requirements: 3.5, 9.1, 9.2, 9.4, 9.5, 13.1_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - finally commit:

  ```bash
  feat: integrate Calendly inline embed with shadcn/ui and post-booking redirect

  - CalendlyInlineEmbed using react-calendly InlineWidget (inline only)
  - Wrapped in shadcn/ui container components
  - Triggered by "Book a Reading" CTA
  - Listens for event_scheduled postMessage → redirect to /confirmation?token=pending
  - Error handling with shadcn/ui components and retry button on embed failure
  ```

---

- [x] 8. Supabase Database Setup
  - [x] 8.0 Use supabase mcp tools to do everything supabase related. the database is already set up. check the environment variable called ".env.local" to verify.
  - [x] 8.1 Use `mcp_supabase_list_tables` to inspect existing schema before creating migrations
  - [x] 8.2 Use `mcp_supabase_apply_migration` to create the `bookings` table
    - Full schema: `id`, `confirmation_token` (unique), `calendly_event_uri` (unique), `first_name`, `last_name`, `email`, rest of them are optional `phone`, `date_of_birth`, `mother_first_name`, `mother_last_name`, `mother_date_of_birth`, `duration` (CHECK IN 15,30,60), `booking_timestamp`, `token_expires_at`, `created_at`, `updated_at`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - [x] 8.3 Use `mcp_supabase_apply_migration` to apply RLS policies
    - Enable RLS; policy for webhook inserts; policy for token-based reads
    - _Requirements: 5.6, 5.7_
  - [x] 8.4 Use `mcp_supabase_generate_typescript_types` to generate TypeScript types into `types/supabase.ts`
  - [x] 8.5 Use `mcp_supabase_get_advisors` to check for security issues and resolve any warnings

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - this time you don't need to use chrome devtool mcp
  - finally commit:

  ```bash
  feat: create Supabase bookings table with RLS and TypeScript types

  - bookings table with all required/optional fields via Supabase MCP migration
  - RLS policies: webhook inserts + token-based reads
  - Generated TypeScript types via mcp_supabase_generate_typescript_types
  - Security advisor check passed via mcp_supabase_get_advisors
  ```

---

- [x] 9. Calendly Webhook API Route
  - [x] 9.1 Use Ref MCP (`mcp_Ref_ref_search_documentation`) to look up Calendly webhook payload structure and HMAC-SHA256 signature verification docs before proceeding
  - [x] 9.2 Create `/app/api/webhooks/calendly/route.ts` (POST handler)
    - Verify Calendly webhook signature using HMAC-SHA256 with `CALENDLY_WEBHOOK_SIGNING_KEY`
    - Reject with 401 and log security violation on invalid signature
    - Extract all booking fields from `questions_and_answers` array
    - Generate `confirmation_token` via `crypto.randomUUID()`
    - Store booking in Supabase using service role key; set `token_expires_at = NOW() + 7 days`
    - Handle duplicate webhooks idempotently (check `calendly_event_uri` uniqueness)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.6, 5.7_
  - [x] 9.3 Use `mcp_supabase_execute_sql` to test a sample insertion and verify the schema works end-to-end

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: implement Calendly webhook API route with signature verification

  - POST /api/webhooks/calendly: HMAC-SHA256 signature verification
  - Rejects invalid signatures with 401 + logs security violation
  - Extracts all booking fields from questions_and_answers
  - Generates confirmation token, stores in Supabase with 7-day expiry
  - Idempotent duplicate handling via calendly_event_uri uniqueness
  ```

---

- [x] 10. Booking Details & Fortune Notes API Routes
  - [x] 10.1 Create `/app/api/bookings/[token]/route.ts` (GET handler)
    - Validate token format; query Supabase for matching booking
    - Check `token_expires_at` — return 401 if expired (> 7 days)
    - Return all booking fields on success; generic error message on failure
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
  - [x] 10.2 Create `/app/api/fortune-notes/random/route.ts` (GET handler)
    - Load `/config/fortune-notes.json`; return one randomly selected note
    - Fallback to hardcoded message if file read fails
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 7.7_
  - [x] 10.3 Use `mcp_supabase_execute_sql` to test token-based queries against the bookings table

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: add booking details and fortune notes API routes

  - GET /api/bookings/[token]: token validation, expiry check, booking retrieval
  - GET /api/fortune-notes/random: random note from JSON with fallback
  - Verified token queries via Supabase MCP
  ```

---

- [x] 11. Confirmation Page
  - [x] 11.1 Create `/app/confirmation/page.tsx`
    - Extract `token` from URL query params (`useSearchParams`)
    - Fetch booking details from `/api/bookings/[token]`
    - Display YouTube welcome video embed (`NEXT_PUBLIC_WELCOME_VIDEO_URL`)
    - Two buttons using shadcn/ui Button: "Your Solution" → `/solution?token=...` and "New Consultation" → `/`
    - Handle invalid/expired token: show error UI with rebook link using shadcn/ui components
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.10, 7.11, 8.5, 13.1_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: build confirmation page with shadcn/ui components and welcome video

  - Extracts token from URL, fetches booking via /api/bookings/[token]
  - YouTube welcome video embed
  - "Your Solution" and "New Consultation" navigation buttons using shadcn/ui Button
  - Invalid/expired token error UI with shadcn/ui components and rebook link
  ```

---

- [x] 12. Solution Page
  - [x] 12.1 Create `/app/solution/page.tsx`
    - Extract `token` from URL query params; fetch booking via `/api/bookings/[token]`
    - Display styled solution card component using shadcn/ui Card
    - Fetch and display fortune note from `/api/fortune-notes/random` in shadcn/ui Card
    - Conditionally render personalized video if URL present in booking data
    - Reassuring final message; discreet "Book again" link using shadcn/ui Button → `/`
    - Handle invalid/expired token errors with error UI using shadcn/ui components
    - _Requirements: 7.5, 7.6, 7.7, 7.8, 7.9, 13.1_

  After completion:
  - run `bun run lint` then `bun run build`. Both must pass with zero errors.
  - use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
  - finally commit:

  ```bash
  feat: build solution page with shadcn/ui Card and Button components

  - Solution card using shadcn/ui Card, fortune note from API in shadcn/ui Card
  - Reassuring final message
  - Conditional personalized video render
  - Discreet "Book again" link using shadcn/ui Button
  - Invalid/expired token error handling with shadcn/ui components
  ```

---

- [x] 13. Intern Setup Documentation
  - [x] 13.1 Create `intern-agent-doc/calendly-stripe-setup.md`
    - Step-by-step Calendly Premium account creation
    - Connecting Stripe business account in Calendly dashboard (test mode vs live mode)
    - Configuring 3 event types: 15 min/£30, 30 min/£50, 60 min/£100
    - Adding custom booking fields: DOB (required), Mother's First Name/Last Name/DOB (optional), Phone (required)
    - Enabling Calendly mobile app + SMS notifications for the fortune teller
    - Creating an Oauth app with webhook redirect link and process of gathering environment variables
    - Setting up webhook subscription for `invitee.created` and obtaining signing key
    - Configuring inline embed URL for use in the NextJS app
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 12.10, 12.11_
    - this task doesn't need lint check or build check or chrome devtool mcp check.
  - finally commit:

  ```bash
  docs: add intern Calendly + Stripe setup guide

  - Step-by-step Calendly Premium account and Stripe connection
  - Event types: 15min/£30, 30min/£50, 60min/£100
  - Custom booking fields, mobile/SMS notifications
  - Webhook subscription setup and signing key retrieval
  - Inline embed URL configuration for NextJS
  ```

---

- [ ]\* 14. Property-Based Tests — Backend
  - [ ]\* 14.1 Install fast-check: `bun add -D fast-check`
  - [ ]\* 14.2 Write property test for webhook signature verification
    - **Property 1: Webhook signature verification**
    - **Validates: Requirements 4.2, 4.6**
  - [ ]\* 14.3 Write property test for confirmation token uniqueness
    - **Property 5: Confirmation token uniqueness and association**
    - **Validates: Requirements 5.6, 5.7, 7.11**
  - [ ]\* 14.4 Write property test for token-based access control
    - **Property 9: Token-based access control**
    - **Validates: Requirements 8.2, 8.3, 8.5, 8.6**
  - [ ]\* 14.5 Write property test for fortune note selection validity
    - **Property 7: Fortune note selection validity**
    - **Validates: Requirements 6.2, 6.3, 7.7**

  After completion:

- run `bun run lint` then `bun run build`. Both must pass with zero errors.
- use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
- finally commit:

  ```bash
  test: add property-based tests for backend correctness properties

  - Property 1: webhook signature verification rejects invalid signatures
  - Property 5: confirmation tokens are unique and correctly associated
  - Property 9: expired/invalid tokens are always rejected
  - Property 7: fortune notes always come from the 10-item JSON set
  ```

---

- [ ]\* 15. Property-Based Tests — Frontend
  - [ ]\* 15.1 Write property test for section height consistency
    - **Property 12: Section height consistency (100vh)**
    - **Validates: Requirements 1.5, 10.3, 11.3, 13.4, 14.4**
  - [ ]\* 15.2 Write property test for responsive layout integrity
    - **Property 13: Responsive layout integrity (320px–3840px)**
    - **Validates: Requirements 14.1, 14.2, 14.3**
  - [ ]\* 15.3 Write property test for touch target sizing on mobile
    - **Property 14: Touch target sizing on mobile**
    - **Validates: Requirements 14.5**

  After completion:

- run `bun run lint` then `bun run build`. Both must pass with zero errors.
- use chrome devtool mcp to inspect, debug and finalize the design looking as expected in the spec and steering doc.
- finally commit:

  ```bash
  test: add property-based tests for frontend correctness properties

  - Property 12: all major sections render at 100vh
  - Property 13: no horizontal overflow across 320px–3840px viewports
  - Property 14: all interactive elements ≥ 44×44px on mobile
  ```

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task must pass `bun run lint && bun run build` with zero errors before committing
- Use `bun add` (not `npm install` or `yarn add`) for ALL dependency installs
- NextJS is installed in the current directory — do not create a subdirectory
- `.env.local` and `.gitignore` already exist in the project root — do NOT overwrite them
- Calendly handles all payment processing via its Stripe integration — no Stripe code in NextJS
- Token expiration is 7 days; `crypto.randomUUID()` is used for token generation (no extra library needed)
- Use Ref MCP before implementing any feature involving an external library or API
- Use Supabase MCP for ALL database operations — never write raw SQL migrations manually
