# Calendly + Stripe Setup Guide for iTellFortune

This guide provides step-by-step instructions for setting up Calendly Premium with Stripe integration, custom booking fields, webhooks, and notifications for the iTellFortune fortune-telling consultation platform.

## Table of Contents

1. [Calendly Premium Account Creation](#1-calendly-premium-account-creation)
2. [Connecting Stripe Business Account](#2-connecting-stripe-business-account)
3. [Configuring Event Types with Pricing](#3-configuring-event-types-with-pricing)
4. [Adding Custom Booking Fields](#4-adding-custom-booking-fields)
5. [Enabling Mobile App and SMS Notifications](#5-enabling-mobile-app-and-sms-notifications)
6. [Creating OAuth App and Gathering Environment Variables](#6-creating-oauth-app-and-gathering-environment-variables)
7. [Setting Up Webhook Subscriptions](#7-setting-up-webhook-subscriptions)
8. [Configuring Inline Embed URL](#8-configuring-inline-embed-url)

---

## 1. Calendly Premium Account Creation

### Step 1.1: Sign Up for Calendly

1. Navigate to [https://calendly.com](https://calendly.com)
2. Click **"Sign Up"** in the top right corner
3. Choose one of the following sign-up methods:
   - Sign up with Google
   - Sign up with Microsoft
   - Sign up with email address
4. Complete the registration form with your details:
   - Full name
   - Email address
   - Password (if using email sign-up)
5. Verify your email address by clicking the link sent to your inbox

### Step 1.2: Upgrade to Premium Plan

1. Log in to your Calendly account
2. Click on your profile icon in the top right corner
3. Select **"Billing"** from the dropdown menu
4. Review the available plans and select **"Premium"** or **"Professional"** (required for payment processing)
5. Click **"Upgrade"** on your chosen plan
6. Enter your payment information:
   - Credit card number
   - Expiration date
   - CVV
   - Billing address
7. Review the subscription details and click **"Confirm Upgrade"**
8. Wait for confirmation email confirming your Premium subscription

### Step 1.3: Complete Account Setup

1. Navigate to **Account Settings** → **Profile**
2. Complete your profile information:
   - Profile photo (optional but recommended)
   - Time zone (set to your fortune teller's location)
   - Language preference
   - Welcome message for invitees
3. Click **"Save Changes"**

---

## 2. Connecting Stripe Business Account

### Step 2.1: Create or Access Stripe Account

**If you don't have a Stripe account:**

1. Navigate to [https://stripe.com](https://stripe.com)
2. Click **"Start now"** or **"Sign up"**
3. Enter your email address and create a password
4. Complete business verification:
   - Business name: "iTellFortune" (or your registered business name)
   - Business type: Individual or Company
   - Business address
   - Tax ID (if applicable)
   - Bank account details for payouts

**If you already have a Stripe account:**

1. Log in to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Ensure your account is fully verified and activated

### Step 2.2: Connect Stripe to Calendly

1. Log in to your Calendly Premium account
2. Navigate to **Account Settings** → **Payments**
3. Click **"Connect Stripe"** button
4. You will be redirected to Stripe's authorization page
5. Log in to your Stripe account (if not already logged in)
6. Review the permissions Calendly is requesting:
   - Read and write access to payment information
   - Access to customer data
   - Webhook event notifications
7. Click **"Connect"** to authorize Calendly
8. You will be redirected back to Calendly with a success message

### Step 2.3: Configure Test Mode vs Live Mode

**Test Mode (for development and testing):**

1. In Calendly, navigate to **Account Settings** → **Payments**
2. Toggle **"Test Mode"** to **ON**
3. In Stripe dashboard, switch to **"Test Mode"** using the toggle in the top right
4. Use Stripe test card numbers for testing:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiration date and any 3-digit CVV

**Live Mode (for production):**

1. Ensure your Stripe account is fully verified
2. In Calendly, navigate to **Account Settings** → **Payments**
3. Toggle **"Test Mode"** to **OFF**
4. In Stripe dashboard, switch to **"Live Mode"**
5. Real payments will now be processed through your Stripe account

### Step 2.4: Configure Payout Settings

1. In Stripe dashboard, navigate to **Settings** → **Payouts**
2. Configure payout schedule:
   - Daily (recommended for immediate access to funds)
   - Weekly
   - Monthly
3. Verify your bank account details are correct
4. Click **"Save"**

---

## 3. Configuring Event Types with Pricing

### Step 3.1: Create 15-Minute Consultation Event

1. In Calendly, navigate to **Event Types**
2. Click **"+ New Event Type"**
3. Select **"One-on-One"** event type
4. Configure event details:
   - **Event name**: "15-Minute Fortune Reading"
   - **Duration**: 15 minutes
   - **Location**: Phone Call (or your preferred method)
   - **Description**: "Quick fortune reading for immediate guidance on your urgent concern"
5. Scroll to **"Payments"** section
6. Toggle **"Collect payments"** to **ON**
7. Configure payment settings:
   - **Price**: £30.00 GBP
   - **Currency**: GBP
   - **Payment provider**: Stripe (should already be connected)
8. Click **"Save & Close"**

### Step 3.2: Create 30-Minute Consultation Event

1. Click **"+ New Event Type"** again
2. Select **"One-on-One"** event type
3. Configure event details:
   - **Event name**: "30-Minute Fortune Reading"
   - **Duration**: 30 minutes
   - **Location**: Phone Call
   - **Description**: "Standard fortune reading with detailed guidance and personalized insights"
4. Scroll to **"Payments"** section
5. Toggle **"Collect payments"** to **ON**
6. Configure payment settings:
   - **Price**: £50.00 GBP
   - **Currency**: GBP
   - **Payment provider**: Stripe
7. Click **"Save & Close"**

### Step 3.3: Create 60-Minute Consultation Event

1. Click **"+ New Event Type"** again
2. Select **"One-on-One"** event type
3. Configure event details:
   - **Event name**: "60-Minute Fortune Reading"
   - **Duration**: 60 minutes
   - **Location**: Phone Call
   - **Description**: "Comprehensive fortune reading with in-depth analysis and complete guidance"
4. Scroll to **"Payments"** section
5. Toggle **"Collect payments"** to **ON**
6. Configure payment settings:
   - **Price**: £100.00 GBP
   - **Currency**: GBP
   - **Payment provider**: Stripe
7. Click **"Save & Close"**

### Step 3.4: Create Combined Booking Page (Optional)

1. Navigate to **Event Types**
2. Click **"+ New Event Type"**
3. Select **"Collective Event Type"** or use routing forms
4. Add all three event types (15min, 30min, 60min) to the collective page
5. This creates a single URL where clients can choose their preferred duration
6. Click **"Save & Close"**

---

## 4. Adding Custom Booking Fields

### Step 4.1: Configure Required Fields

For each event type (15min, 30min, 60min), follow these steps:

1. Navigate to **Event Types** and click on the event you want to edit
2. Scroll to **"Invitee Questions"** section
3. The following fields are included by default:
   - **Name** (required) - already enabled
   - **Email** (required) - already enabled

### Step 4.2: Add Date of Birth Field (Required)

1. In the **"Invitee Questions"** section, click **"+ Add Question"**
2. Select **"Custom Question"**
3. Configure the question:
   - **Question**: "What is your date of birth?"
   - **Type**: Date
   - **Required**: Toggle to **ON**
   - **Help text**: "Required for personalized fortune reading"
4. Click **"Add Question"**

### Step 4.3: Add Phone Number Field (Required)

1. Click **"+ Add Question"** again
2. Select **"Phone Number"** from the question types
3. Configure the question:
   - **Question**: "Phone number"
   - **Required**: Toggle to **ON**
   - **Help text**: "We'll call you at your scheduled time"
4. Click **"Add Question"**

### Step 4.4: Add Mother's First Name Field (Optional)

1. Click **"+ Add Question"** again
2. Select **"Custom Question"**
3. Configure the question:
   - **Question**: "Mother's first name (optional)"
   - **Type**: Short Text
   - **Required**: Toggle to **OFF**
   - **Help text**: "Optional - helps provide deeper insights"
4. Click **"Add Question"**

### Step 4.5: Add Mother's Last Name Field (Optional)

1. Click **"+ Add Question"** again
2. Select **"Custom Question"**
3. Configure the question:
   - **Question**: "Mother's last name (optional)"
   - **Type**: Short Text
   - **Required**: Toggle to **OFF**
   - **Help text**: "Optional - helps provide deeper insights"
4. Click **"Add Question"**

### Step 4.6: Add Mother's Date of Birth Field (Optional)

1. Click **"+ Add Question"** again
2. Select **"Custom Question"**
3. Configure the question:
   - **Question**: "Mother's date of birth (optional)"
   - **Type**: Date
   - **Required**: Toggle to **OFF**
   - **Help text**: "Optional - helps provide deeper insights"
4. Click **"Add Question"**

### Step 4.7: Save Configuration

1. Review all custom fields to ensure they're configured correctly
2. Click **"Save & Close"**
3. Repeat steps 4.1-4.7 for all three event types (15min, 30min, 60min)

---

## 5. Enabling Mobile App and SMS Notifications

### Step 5.1: Download Calendly Mobile App

1. On your mobile device, open the App Store (iOS) or Google Play Store (Android)
2. Search for **"Calendly"**
3. Download and install the official Calendly app
4. Open the app and log in with your Calendly credentials

### Step 5.2: Enable Push Notifications

1. When prompted, allow Calendly to send push notifications
2. If you missed the prompt:
   - **iOS**: Go to Settings → Notifications → Calendly → Enable notifications
   - **Android**: Go to Settings → Apps → Calendly → Notifications → Enable notifications

### Step 5.3: Configure Notification Preferences in App

1. In the Calendly mobile app, tap the **menu icon** (three lines)
2. Navigate to **Settings** → **Notifications**
3. Enable the following notifications:
   - **New bookings**: Toggle to **ON**
   - **Booking confirmations**: Toggle to **ON**
   - **Booking cancellations**: Toggle to **ON**
   - **Booking reschedules**: Toggle to **ON**
4. Set notification sound to ensure you hear alerts immediately

### Step 5.4: Enable SMS Notifications

1. Log in to Calendly on desktop/web browser
2. Navigate to **Account Settings** → **Notifications**
3. Scroll to **"SMS Notifications"** section
4. Click **"Add Phone Number"**
5. Enter your phone number in international format (e.g., +44 7XXX XXXXXX for UK)
6. Click **"Send Verification Code"**
7. Enter the verification code received via SMS
8. Click **"Verify"**
9. Enable SMS notifications for:
   - **New bookings**: Toggle to **ON**
   - **Booking confirmations**: Toggle to **ON**
   - **Booking cancellations**: Toggle to **ON**
   - **Booking reschedules**: Toggle to **ON**
10. Click **"Save Changes"**

### Step 5.5: Test Notifications

1. Create a test booking using one of your event types
2. Verify you receive:
   - Push notification on mobile app
   - SMS notification on your phone
   - Email notification (default)
3. If notifications don't arrive, review steps 5.1-5.4 and check your device settings

---

## 6. Creating OAuth App and Gathering Environment Variables

### Step 6.1: Create Calendly OAuth Application

1. Log in to Calendly
2. Navigate to **Integrations** → **API & Webhooks**
3. Click on **"OAuth"** tab
4. Click **"Create New OAuth App"**
5. Fill in the application details:
   - **Application Name**: "iTellFortune NextJS App"
   - **Description**: "Fortune-telling consultation booking platform"
   - **Redirect URI**: `https://fortune-teller-eta.vercel.app/api/auth/calendly/callback`
   - **Application Website**: `https://fortune-teller-eta.vercel.app`
6. Click **"Create Application"**

### Step 6.2: Obtain OAuth Credentials

After creating the OAuth app, you'll see:

1. **Client ID**: Copy this value
2. **Client Secret**: Copy this value (keep it secure!)
3. Save these credentials - you'll need them for environment variables

### Step 6.3: Generate Personal Access Token

1. In the same **API & Webhooks** section
2. Click on **"Personal Access Tokens"** tab
3. Click **"Create New Token"**
4. Enter token details:
   - **Token Name**: "iTellFortune API Token"
   - **Scopes**: Select all necessary scopes:
     - `default` (read user information)
     - `event_types:read`
     - `scheduling_links:read`
     - `webhooks:read`
     - `webhooks:write`
5. Click **"Create Token"**
6. **IMPORTANT**: Copy the token immediately - it will only be shown once
7. Store it securely

### Step 6.4: Obtain Calendly Event Type URL

1. Navigate to **Event Types**
2. Click on one of your event types (e.g., "15-Minute Fortune Reading")
3. Click **"Copy Link"** button
4. The URL format will be: `https://calendly.com/your-username/event-name`
5. For a combined booking page with all durations, use the collective event type URL

### Step 6.5: Gather All Environment Variables

Create a secure document with the following values:

```bash
# Calendly Configuration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/event-name
CALENDLY_WEBHOOK_SIGNING_KEY=[To be obtained in Step 7]
CALENDLY_API_PERSONAL_ACCESS_TOKEN=[Token from Step 6.3]
CALENDLY_OAUTH_CLIENT_ID=[Client ID from Step 6.2]
CALENDLY_OAUTH_CLIENT_SECRET=[Client Secret from Step 6.2]
```

---

## 7. Setting Up Webhook Subscriptions

### Step 7.1: Access Webhook Configuration

1. Log in to Calendly
2. Navigate to **Integrations** → **API & Webhooks**
3. Click on **"Webhooks"** tab
4. Click **"Create Webhook"**

### Step 7.2: Configure Webhook Endpoint

1. Enter webhook details:
   - **Webhook URL**: `https://fortune-teller-eta.vercel.app/api/webhooks/calendly`
     - This is your production webhook endpoint on Vercel
     - For local testing, use ngrok: `https://your-ngrok-url.ngrok.io/api/webhooks/calendly`
   - **Events to subscribe to**: Select **"invitee.created"**
     - This event fires when a new booking is confirmed with payment
2. Click **"Create Webhook"**

### Step 7.3: Obtain Webhook Signing Key

After creating the webhook:

1. You'll see the webhook listed in the webhooks table
2. Click on the webhook you just created
3. Locate the **"Signing Key"** field
4. Click **"Show"** or **"Copy"** to reveal the signing key
5. **IMPORTANT**: Copy this key immediately and store it securely
6. This key is used to verify webhook authenticity in your NextJS application

### Step 7.4: Update Environment Variables

Add the webhook signing key to your environment variables:

```bash
CALENDLY_WEBHOOK_SIGNING_KEY=[Signing key from Step 7.3]
```

### Step 7.5: Test Webhook Delivery

1. Ensure your NextJS application is deployed and the webhook endpoint is accessible
2. Create a test booking using one of your event types
3. Check your NextJS application logs to verify the webhook was received
4. In Calendly, navigate to **Integrations** → **API & Webhooks** → **Webhooks**
5. Click on your webhook to view delivery logs
6. Verify the webhook was delivered successfully (status 200)

### Step 7.6: Webhook Payload Structure

The `invitee.created` webhook will send a payload in this format:

```json
{
  "event": "invitee.created",
  "payload": {
    "event_uri": "https://api.calendly.com/scheduled_events/XXXXXX",
    "invitee": {
      "uri": "https://api.calendly.com/invitees/XXXXXX",
      "email": "client@example.com",
      "name": "John Doe",
      "first_name": "John",
      "last_name": "Doe",
      "created_at": "2024-01-15T10:30:00.000000Z",
      "questions_and_answers": [
        {
          "question": "What is your date of birth?",
          "answer": "1990-05-15"
        },
        {
          "question": "Phone number",
          "answer": "+44 7XXX XXXXXX"
        },
        {
          "question": "Mother's first name (optional)",
          "answer": "Jane"
        }
      ]
    },
    "event": {
      "uri": "https://api.calendly.com/scheduled_events/XXXXXX",
      "name": "15-Minute Fortune Reading",
      "start_time": "2024-01-20T14:00:00.000000Z",
      "end_time": "2024-01-20T14:15:00.000000Z"
    }
  }
}
```

### Step 7.7: Webhook Security Verification

Your NextJS webhook endpoint must verify the signature:

1. Extract the `Calendly-Webhook-Signature` header from the request
2. Compute HMAC-SHA256 hash of the request body using the signing key
3. Compare the computed hash with the signature header
4. Reject requests with invalid signatures (return 401)

---

## 8. Configuring Inline Embed URL

### Step 8.1: Obtain Inline Embed Code

1. Navigate to **Event Types** in Calendly
2. Click on the event type you want to embed (or use collective event type for all durations)
3. Click **"Share"** button
4. Select **"Embed"** tab
5. Choose **"Inline Embed"** option (not popup or text link)
6. Copy the embed code provided

### Step 8.2: Extract Calendly URL for NextJS

From the embed code, extract the Calendly URL:

```html
<!-- Example embed code -->
<div
  class="calendly-inline-widget"
  data-url="https://calendly.com/your-username/event-name"
  style="min-width:320px;height:700px;"
></div>
```

The URL you need is: `https://calendly.com/your-username/event-name`

### Step 8.3: Configure Environment Variable

Add the Calendly URL to your `.env.local` file:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/event-name
```

### Step 8.4: Implement Inline Embed in NextJS

The inline embed is implemented using the `react-calendly` library:

```typescript
import { InlineWidget } from "react-calendly";

<InlineWidget url={process.env.NEXT_PUBLIC_CALENDLY_URL} />;
```

### Step 8.5: Configure Redirect After Booking

1. In Calendly, navigate to the event type settings
2. Scroll to **"After Event"** section
3. Configure redirect settings:
   - **Redirect to external site**: Toggle to **ON**
   - **Redirect URL**: `https://fortune-teller-eta.vercel.app/confirmation?token=pending`
     - The NextJS webhook will update this with the actual token after processing
4. Click **"Save & Close"**
5. **IMPORTANT**: Repeat this configuration for all three event types (15min, 30min, 60min)

### Step 8.6: Test Inline Embed

1. Navigate to your deployed application: [https://fortune-teller-eta.vercel.app](https://fortune-teller-eta.vercel.app)
2. Click "Book a Reading" button on the landing page
3. Verify the Calendly inline embed loads correctly
4. Complete a test booking (use Stripe test mode):
   - Use test card: `4242 4242 4242 4242`
   - Any future expiration date
   - Any 3-digit CVV
5. After payment, verify you're redirected to: `https://fortune-teller-eta.vercel.app/confirmation?token=pending`
6. Check that the webhook was received by viewing Vercel logs or Calendly webhook delivery logs

---

## Quick Reference: Where to Use Your Vercel URL

Your application is deployed at: **https://fortune-teller-eta.vercel.app**

Here's a quick checklist of everywhere you need to configure this URL:

### 1. Calendly OAuth App (Step 6.1)

- **Location**: Calendly → Integrations → API & Webhooks → OAuth
- **Redirect URI**: `https://fortune-teller-eta.vercel.app/api/auth/calendly/callback`
- **Application Website**: `https://fortune-teller-eta.vercel.app`

### 2. Calendly Webhook (Step 7.2)

- **Location**: Calendly → Integrations → API & Webhooks → Webhooks
- **Webhook URL**: `https://fortune-teller-eta.vercel.app/api/webhooks/calendly`

### 3. Calendly Event Type Redirect (Step 8.5)

- **Location**: Calendly → Event Types → [Each Event] → After Event
- **Redirect URL**: `https://fortune-teller-eta.vercel.app/confirmation?token=pending`
- **Apply to**: All three event types (15min, 30min, 60min)

### 4. Environment Variables (Vercel Dashboard)

- **Location**: Vercel Dashboard → fortune-teller-eta → Settings → Environment Variables
- **Variable**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://fortune-teller-eta.vercel.app`

### 5. Environment Variables (Local .env.local)

- **Location**: Project root → `.env.local` file
- **Variable**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://fortune-teller-eta.vercel.app`

---

## Complete Environment Variables Checklist

After completing all steps, your `.env.local` file should contain:

```bash
# Calendly Configuration
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/event-name
CALENDLY_WEBHOOK_SIGNING_KEY=your_webhook_signing_key_from_step_7
CALENDLY_API_PERSONAL_ACCESS_TOKEN=your_personal_access_token_from_step_6
CALENDLY_OAUTH_CLIENT_ID=your_oauth_client_id_from_step_6
CALENDLY_OAUTH_CLIENT_SECRET=your_oauth_client_secret_from_step_6

# Supabase Configuration (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://fortune-teller-eta.vercel.app
TOKEN_EXPIRATION_DAYS=7

# Video URLs
NEXT_PUBLIC_HERO_VIDEO_URL=youtube_unlisted_link_1
NEXT_PUBLIC_WELCOME_VIDEO_URL=youtube_unlisted_link_2
```

**IMPORTANT**: These environment variables must also be configured in Vercel:

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **fortune-teller-eta**
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable above with its corresponding value
5. Click **"Save"** after adding all variables
6. Redeploy the application for changes to take effect

---

## Troubleshooting

### Issue: Webhook not receiving events

**Solution:**

- Verify webhook URL is publicly accessible
- Check webhook signing key is correct in `.env.local`
- Review Calendly webhook delivery logs for error messages
- Ensure NextJS API route is deployed and responding

### Issue: Payment not processing

**Solution:**

- Verify Stripe account is fully verified and activated
- Check Stripe is connected to Calendly in Account Settings → Payments
- Ensure you're in the correct mode (test vs live)
- Review Stripe dashboard for declined payment reasons

### Issue: SMS notifications not arriving

**Solution:**

- Verify phone number is verified in Calendly
- Check SMS notifications are enabled in Account Settings → Notifications
- Ensure phone number is in correct international format
- Check your mobile carrier isn't blocking SMS from Calendly

### Issue: Mobile app not showing notifications

**Solution:**

- Verify push notifications are enabled in device settings
- Check notification preferences in Calendly mobile app
- Ensure app is updated to latest version
- Try logging out and back in to refresh connection

---

## Security Best Practices

1. **Never commit environment variables to version control**
   - Add `.env.local` to `.gitignore`
   - Use Vercel environment variables for production

2. **Rotate credentials regularly**
   - Change OAuth client secret every 90 days
   - Regenerate personal access tokens periodically
   - Update webhook signing keys if compromised

3. **Use test mode during development**
   - Always test with Stripe test mode before going live
   - Create test bookings to verify webhook flow
   - Switch to live mode only when ready for production

4. **Monitor webhook security**
   - Always verify webhook signatures
   - Log failed signature verifications
   - Set up alerts for suspicious activity

5. **Protect sensitive data**
   - Store all credentials in secure environment variables
   - Use HTTPS for all webhook endpoints
   - Implement rate limiting on API routes

---

## Next Steps

After completing this setup:

1. ✅ Calendly Premium account created and configured
2. ✅ Stripe connected with test and live modes
3. ✅ Three event types created with pricing (£30, £50, £100)
4. ✅ Custom booking fields added (DOB, phone, mother's info)
5. ✅ Mobile app and SMS notifications enabled
6. ✅ OAuth app created and credentials obtained
7. ✅ Webhook subscription configured for `invitee.created`
8. ✅ Inline embed URL configured for NextJS

You're now ready to:

- Test the complete booking flow end-to-end
- Deploy to production with live Stripe mode
- Monitor bookings and webhook deliveries
- Receive instant notifications for new consultations

---

## Support Resources

- **Calendly Help Center**: [https://help.calendly.com](https://help.calendly.com)
- **Calendly API Documentation**: [https://developer.calendly.com](https://developer.calendly.com)
- **Stripe Documentation**: [https://stripe.com/docs](https://stripe.com/docs)
- **Calendly Community**: [https://community.calendly.com](https://community.calendly.com)

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: iTellFortune Development Team
