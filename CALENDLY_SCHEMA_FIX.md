# Calendly Schema Fix - Date Fields

## Problem Identified

From the Calendly screenshot, we discovered that Calendly's custom question types are limited to:

- One Line
- Multiple Lines
- Radio Buttons
- Checkboxes
- Dropdown
- Phone Number

**There is NO native "Date" field type for custom questions in Calendly.**

This means that date fields (Date of Birth and Mother's Date of Birth) must be collected as text input using the "One Line" answer type.

## Changes Made

### 1. Database Schema Migration

Applied migration `change_date_fields_to_text` to convert date columns to text:

```sql
ALTER TABLE bookings
  ALTER COLUMN date_of_birth TYPE TEXT,
  ALTER COLUMN mother_date_of_birth TYPE TEXT;
```

**Before:**

- `date_of_birth`: DATE (nullable)
- `mother_date_of_birth`: DATE (nullable)

**After:**

- `date_of_birth`: TEXT (nullable)
- `mother_date_of_birth`: TEXT (nullable)

### 2. TypeScript Types Updated

Regenerated `types/supabase.ts` to reflect the schema changes:

- `date_of_birth: string | null`
- `mother_date_of_birth: string | null`

### 3. Documentation Updated

Updated `intern-agent-doc/calendly-stripe-setup.md`:

**Step 4.2 - Date of Birth Field:**

- Changed from: Type: Date
- Changed to: Type: One Line
- Added help text: "Required for personalized fortune reading (format: YYYY-MM-DD or DD/MM/YYYY)"
- Added note explaining Calendly limitation

**Step 4.6 - Mother's Date of Birth Field:**

- Changed from: Type: Date
- Changed to: Type: One Line
- Added help text: "Optional - helps provide deeper insights (format: YYYY-MM-DD or DD/MM/YYYY)"
- Added note explaining Calendly limitation

### 4. Code Impact Analysis

**No code changes required!** The existing implementation already treats dates as strings:

✅ **Polling Endpoint** (`app/api/bookings/poll/route.ts`):

- Extracts dates as strings from Calendly API `questions_and_answers`
- Stores them directly in Supabase without date parsing

✅ **Confirmation Page** (`app/confirmation/page.tsx`):

- Uses `dateOfBirth: string` in interface
- Doesn't display date of birth on the page

✅ **Solution Page** (`app/solution/page.tsx`):

- Uses `dateOfBirth: string` in interface
- Doesn't display date of birth on the page

✅ **Booking API** (`app/api/bookings/[token]/route.ts`):

- Returns dates as strings from database
- No date parsing or formatting

## Testing Checklist

After deploying these changes, test the following:

1. ✅ Create a test booking in Calendly with date fields
2. ✅ Verify webhook receives date values as text
3. ✅ Verify dates are stored correctly in Supabase
4. ✅ Verify confirmation page loads without errors
5. ✅ Verify solution page loads without errors
6. ✅ Run `bun run lint` - should pass
7. ✅ Run `bun run build` - should pass

## Date Format Handling

Since dates are now stored as text, the application accepts any date format the user enters. Common formats include:

- YYYY-MM-DD (e.g., 1990-05-15)
- DD/MM/YYYY (e.g., 15/05/1990)
- MM/DD/YYYY (e.g., 05/15/1990)

The help text suggests YYYY-MM-DD or DD/MM/YYYY to guide users, but the system will accept any text input.

**Future Enhancement:** If date validation or parsing is needed in the future, you can add validation logic in the webhook handler to parse and standardize date formats before storing them.

## Migration Status

- ✅ Migration applied to Supabase
- ✅ TypeScript types regenerated
- ✅ Documentation updated
- ✅ Lint check passed
- ✅ Build check passed
- ✅ Changes committed to git

## Deployment Notes

When deploying to production:

1. The migration has already been applied to the Supabase database
2. No additional database changes needed
3. Redeploy the application to Vercel to pick up the updated code
4. Test the booking flow end-to-end with real Calendly integration

## Support

If you encounter any issues with date handling:

1. Check Calendly webhook logs to see the exact format dates are being sent
2. Check Supabase database to verify dates are being stored
3. Check Vercel logs for any parsing errors in the webhook handler
