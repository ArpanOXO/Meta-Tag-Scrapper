import { setDefaultResultOrder } from "node:dns";
import * as cheerio from "cheerio";
import type { ScrapedMeta } from "@/types/meta";

setDefaultResultOrder("ipv4first");

export class ScrapeError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ScrapeError";
  }
}

function absolutize(base: string, maybeRelative: string): string {
  if (!maybeRelative) return "";
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const FETCH_TIMEOUT_MS = 15_000;


export async function scrapeUrl(target: string): Promise<ScrapedMeta> {
  if (!isValidHttpUrl(target)) {
    throw new ScrapeError(400, "Provide a valid absolute URL (including http:// or https://).");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(target, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MetascopeBot/1.0; +https://example.com/bot) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } catch (err) {
    // Log the raw error server-side — the underlying `cause` (e.g. ENOTFOUND,
    // ECONNREFUSED, certificate errors) is the useful bit for debugging and
    // shouldn't be swallowed even though we keep the client-facing message simple.
    console.error(`[scrape] fetch failed for ${target}:`, err);

    if (err instanceof Error && err.name === "AbortError") {
      throw new ScrapeError(
        504,
        `The request to ${target} timed out after ${FETCH_TIMEOUT_MS / 1000}s. ` +
          "The site may be slow, blocking automated requests, or unreachable from this network."
      );
    }
    throw new ScrapeError(
      502,
      "Could not reach that URL. Check the address, your internet connection, and try again."
    );
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw new ScrapeError(
      422,
      `The site responded with status ${response.status}. It may block automated requests.`
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("html")) {
    throw new ScrapeError(422, "That URL doesn't appear to point to an HTML page.");
  }

  const html = await response.text();
  const finalUrl = response.url || target;
  const $ = cheerio.load(html);

  const og: Record<string, string> = {};
  const twitter: Record<string, string> = {};
  const raw: { property: string; content: string }[] = [];

  $("meta").each((_, el) => {
    const property = $(el).attr("property") || $(el).attr("name");
    const content = $(el).attr("content");
    if (!property || content === undefined) return;

    raw.push({ property, content });

    if (property.startsWith("og:")) {
      og[property.slice(3)] = content;
    } else if (property.startsWith("twitter:")) {
      twitter[property.slice(8)] = content;
    }
  });

  if (og.image) og.image = absolutize(finalUrl, og.image);
  if (twitter.image) twitter.image = absolutize(finalUrl, twitter.image);

  const title = og.title || $("title").first().text().trim() || "";
  const description =
    og.description || $('meta[name="description"]').attr("content")?.trim() || "";

  const canonicalHref = $('link[rel="canonical"]').attr("href") || "";
  const canonical = canonicalHref ? absolutize(finalUrl, canonicalHref) : "";

  const faviconHref =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href") ||
    "/favicon.ico";
  const favicon = absolutize(finalUrl, faviconHref);

  const themeColor = $('meta[name="theme-color"]').attr("content") || "";

  return {
    requestedUrl: target,
    finalUrl,
    title,
    description,
    canonical,
    favicon,
    themeColor,
    og: {
      title: og.title || "",
      description: og.description || "",
      image: og.image || "",
      url: og.url || finalUrl,
      type: og.type || "",
      site_name: og.site_name || "",
      locale: og.locale || "",
      ...og,
    },
    twitter: {
      card: twitter.card || "",
      title: twitter.title || "",
      description: twitter.description || "",
      image: twitter.image || "",
      site: twitter.site || "",
      creator: twitter.creator || "",
      ...twitter,
    },
    raw,
  };
}
