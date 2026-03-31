# Testing Geolocation Language Detection

## Method 1: Test on Your Next.js App (Recommended)

1. **Start your dev server:**

   ```bash
   bun dev
   ```

2. **Open http://localhost:3000 in Chrome**

3. **Open Chrome DevTools** (F12 or Right-click → Inspect)

4. **Go to Console tab**

5. **Run this test script:**

   ```javascript
   // Check current language state
   const checkLanguageState = () => {
     const htmlLang = document.documentElement.lang;
     const localeCookie = document.cookie
       .split("; ")
       .find((row) => row.startsWith("NEXT_LOCALE="))
       ?.split("=")[1];
     const sessionDetected = sessionStorage.getItem("geo_language_detected");

     console.log("=== Language Detection Status ===");
     console.log("Current HTML lang:", htmlLang);
     console.log("Locale Cookie:", localeCookie || "not set");
     console.log("Geo Detection Ran:", sessionDetected === "true");
     console.log("Browser Language:", navigator.language);

     return {
       currentLanguage: htmlLang,
       localeCookie: localeCookie || "not set",
       geoDetectionRan: sessionDetected === "true",
       browserLanguage: navigator.language,
     };
   };

   checkLanguageState();
   ```

6. **Test the geolocation API directly:**
   ```javascript
   // Test geolocation detection
   fetch("https://ipapi.co/json/")
     .then((res) => res.json())
     .then((data) => {
       console.log("=== Geolocation Data ===");
       console.log(
         "Country:",
         data.country_name,
         "(" + data.country_code + ")",
       );
       console.log("City:", data.city);
       console.log("Region:", data.region);
       console.log("IP:", data.ip);

       const FRENCH_COUNTRIES = [
         "FR",
         "BE",
         "CH",
         "CA",
         "LU",
         "MC",
         "CI",
         "SN",
         "ML",
         "BF",
         "NE",
         "TD",
         "CM",
         "CG",
         "CD",
         "GA",
         "GN",
         "MG",
         "BJ",
         "TG",
         "CF",
         "RW",
         "BI",
         "DJ",
         "KM",
         "SC",
         "HT",
       ];
       const shouldUseFrench = FRENCH_COUNTRIES.includes(data.country_code);

       console.log("Should use French:", shouldUseFrench);
       console.log(
         "Detected Language:",
         shouldUseFrench ? "French (fr)" : "English (en)",
       );
     })
     .catch((err) => console.error("Geolocation error:", err));
   ```

## Method 2: Reset and Test Auto-Detection

To test the auto-detection from scratch:

1. **Clear the detection state:**

   ```javascript
   // Run in Console
   sessionStorage.removeItem("geo_language_detected");
   document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
   console.log(
     "Detection state cleared. Reload the page to trigger auto-detection.",
   );
   ```

2. **Reload the page** (Ctrl+R or Cmd+R)

3. **Check the result:**
   ```javascript
   checkLanguageState();
   ```

## Method 3: Simulate Different Countries (Using VPN)

1. Connect to a VPN in a French-speaking country (e.g., France, Canada, Belgium)
2. Clear detection state (see Method 2)
3. Reload the page
4. Verify language switches to French

## Method 4: Test Browser Language Fallback

1. **Disable network in DevTools:**
   - Open DevTools → Network tab
   - Click "Offline" dropdown → Select "Offline"

2. **Clear detection state and reload**

3. **The system should fall back to browser language**

4. **Check console for fallback message:**
   ```javascript
   // You should see: "Failed to detect language by geolocation"
   // Followed by browser language detection
   ```

## Method 5: Manual Language Toggle Test

1. **Click the FR/EN button** in the header
2. **Verify language changes**
3. **Reload the page**
4. **Verify language persists** (auto-detection should not override)

## Expected Behaviors

### First Visit (No Cookie)

- ✅ Geolocation API is called
- ✅ Language is set based on country
- ✅ Cookie is created
- ✅ SessionStorage flag is set

### Subsequent Visits (Has Cookie)

- ✅ Geolocation API is NOT called
- ✅ Language from cookie is used
- ✅ No page reload

### Manual Language Change

- ✅ Cookie is updated
- ✅ Page reloads with new language
- ✅ Auto-detection respects manual choice

## Troubleshooting

### "Failed to fetch" Error

This is normal if:

- You're testing on localhost with the HTML file directly
- Your IP is rate-limited by ipapi.co (1000 requests/day)
- Your network blocks the API

**Solution:** Test on your Next.js app at localhost:3000

### Language Not Changing

1. Check if cookie exists: `document.cookie`
2. Check if sessionStorage has flag: `sessionStorage.getItem('geo_language_detected')`
3. Clear both and reload

### API Rate Limit

If you hit the rate limit (1000 requests/day):

- Wait 24 hours
- Or switch to a different IP
- Or use an alternative API (see main documentation)

## Quick Test Commands

Copy and paste these into your browser console:

```javascript
// 1. Check current state
console.log("Language:", document.documentElement.lang);
console.log("Cookie:", document.cookie);
console.log("Detected:", sessionStorage.getItem("geo_language_detected"));

// 2. Reset everything
sessionStorage.clear();
document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
location.reload();

// 3. Force French
document.cookie = "NEXT_LOCALE=fr; path=/; max-age=31536000";
location.reload();

// 4. Force English
document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000";
location.reload();
```
