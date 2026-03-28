import { NextRequest, NextResponse } from "next/server";
import fortuneNotes from "@/config/fortune-notes.json";

export async function GET(request: NextRequest) {
  try {
    // Get locale from query parameter or Accept-Language header
    const searchParams = request.nextUrl.searchParams;
    const localeParam = searchParams.get("locale");
    const acceptLanguage = request.headers.get("accept-language");

    // Determine locale: prioritize query param, then Accept-Language header, default to 'en'
    let locale = "en";
    if (localeParam && (localeParam === "en" || localeParam === "fr")) {
      locale = localeParam;
    } else if (acceptLanguage) {
      const primaryLang = acceptLanguage.split(",")[0].split("-")[0];
      if (primaryLang === "fr") {
        locale = "fr";
      }
    }

    // Get notes for the selected locale
    const notes = fortuneNotes.fortuneNotes[locale as "en" | "fr"];

    if (!notes || notes.length === 0) {
      return NextResponse.json(
        { error: "No fortune notes available" },
        { status: 500 },
      );
    }

    // Select a random fortune note
    const randomNote = notes[Math.floor(Math.random() * notes.length)];

    return NextResponse.json({ fortuneNote: randomNote });
  } catch (error) {
    console.error("Error loading fortune notes:", error);
    // Fallback message in English
    return NextResponse.json({
      fortuneNote:
        "Your path is opening. The confusion you feel now is temporary, and clarity is already moving toward you.",
    });
  }
}
