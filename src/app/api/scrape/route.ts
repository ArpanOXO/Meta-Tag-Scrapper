import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, ScrapeError } from "@/lib/scrape";


export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url") ?? "";

  try {
    const data = await scrapeUrl(target);
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ScrapeError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("Unexpected scrape error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
