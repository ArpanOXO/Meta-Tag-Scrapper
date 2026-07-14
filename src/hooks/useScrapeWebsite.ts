import { useMutation } from "@tanstack/react-query";
import { scrapeWebsite } from "@/lib/api";

export function useScrapeWebsite() {
  return useMutation({
    mutationFn: (url: string) => scrapeWebsite(url),
  });
}
