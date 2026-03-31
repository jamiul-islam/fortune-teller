# Geolocation-Based Language Detection

## Overview

The application automatically detects the user's language preference based on their geographic location using IP geolocation.

## How It Works

1. **Initial Load**: When a user visits the site for the first time, the `GeoLanguageDetector` component runs
2. **IP Geolocation**: Uses the free ipapi.co service to detect the user's country based on their IP address
3. **Language Selection**:
   - If the user is in a French-speaking country → Sets language to French (fr)
   - Otherwise → Sets language to English (en)
4. **Fallback**: If geolocation fails, falls back to browser language detection
5. **Persistence**: The detected language is saved in a cookie and sessionStorage

## French-Speaking Countries Supported

The system recognizes 27 French-speaking countries:

- **Europe**: France (FR), Belgium (BE), Switzerland (CH), Luxembourg (LU), Monaco (MC)
- **North America**: Canada (CA), Haiti (HT)
- **Africa**: Côte d'Ivoire (CI), Senegal (SN), Mali (ML), Burkina Faso (BF), Niger (NE), Chad (TD), Cameroon (CM), Congo (CG), DR Congo (CD), Gabon (GA), Guinea (GN), Madagascar (MG), Benin (BJ), Togo (TG), Central African Republic (CF), Rwanda (RW), Burundi (BI), Djibouti (DJ), Comoros (KM), Seychelles (SC)

## User Control

Users can always manually change their language preference using the language toggle button (FR/EN) in the header. Once manually changed, the automatic detection won't override their choice.

## Technical Details

### Component: `GeoLanguageDetector.tsx`

```typescript
- Runs only once per session (uses sessionStorage)
- Respects existing language cookies
- Non-blocking (doesn't affect page load)
- Graceful fallback to browser language
```

### API Used

- **Service**: ipapi.co
- **Endpoint**: https://ipapi.co/json/
- **Cost**: Free (no API key required)
- **Rate Limit**: 1,000 requests per day (sufficient for most use cases)

### Alternative Services (if needed)

If you need more requests or features, consider:

1. **ip-api.com** - 45 requests/minute (free)
2. **ipgeolocation.io** - 1,000 requests/day (free tier)
3. **ipinfo.io** - 50,000 requests/month (free tier)

## Testing

1. Open `test-geo-language.html` in a browser
2. Click "Detect Language by Location"
3. View your detected country and language

## Privacy Considerations

- Only uses IP-based geolocation (no GPS or precise location)
- No personal data is stored or transmitted
- Users can opt-out by manually selecting their language
- Complies with GDPR and privacy regulations

## Troubleshooting

### Language not detecting correctly?

- Check browser console for errors
- Verify internet connection
- Try clearing cookies and sessionStorage
- Check if ipapi.co is accessible in your region

### Want to add more countries?

Edit the `FRENCH_SPEAKING_COUNTRIES` array in `components/GeoLanguageDetector.tsx`

### Want to disable auto-detection?

Remove `<GeoLanguageDetector />` from `app/layout.tsx`
