import type { ScrapedMeta } from "@/types/meta";

export async function scrapeWebsite(url: string): Promise<ScrapedMeta> {
  const endpoint = `/api/scrape?url=${encodeURIComponent(url)}`;

  let response: Response;
  try {
    response = await fetch(endpoint);
  } catch {
    throw new Error("Could not reach the scan server. Is it running?");
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error("The scan server returned an unexpected response.");
  }

  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "error" in body
        ? String((body as { error: unknown }).error)
        : "Failed to scan that URL.";
    throw new Error(message);
  }

  return body as ScrapedMeta;
}
