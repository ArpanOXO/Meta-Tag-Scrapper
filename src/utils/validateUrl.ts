
export function normalizeAndValidateUrl(input: string): { valid: boolean; normalized: string } {
  const trimmed = input.trim();
  if (!trimmed) return { valid: false, normalized: "" };

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return { valid: false, normalized: "" };
    }
    
    if (!url.hostname.includes(".") && url.hostname !== "localhost") {
      return { valid: false, normalized: "" };
    }
    return { valid: true, normalized: url.toString() };
  } catch {
    return { valid: false, normalized: "" };
  }
}
