export interface ScrapedMeta {
  requestedUrl: string;
  finalUrl: string;
  title: string;
  description: string;
  canonical: string;
  favicon: string;
  themeColor: string;
  og: Record<string, string>;
  twitter: Record<string, string>;
  raw: { property: string; content: string }[];
}

export interface EditableMeta {
  title: string;
  description: string;
  favicon: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
}

export function scrapedToEditable(data: ScrapedMeta): EditableMeta {
  return {
    title: data.title || "",
    description: data.description || "",
    favicon: data.favicon || "",
    ogTitle: data.og.title || data.title || "",
    ogDescription: data.og.description || data.description || "",
    ogImage: data.og.image || "",
    ogUrl: data.og.url || data.finalUrl || "",
    ogType: data.og.type || "website",
    ogSiteName: data.og.site_name || "",
    twitterCard: data.twitter.card || "summary_large_image",
    twitterTitle: data.twitter.title || data.og.title || data.title || "",
    twitterDescription:
      data.twitter.description || data.og.description || data.description || "",
    twitterImage: data.twitter.image || data.og.image || "",
    twitterSite: data.twitter.site || "",
  };
}

export const FIELD_GROUPS = [
  {
    id: "basics",
    title: "Basics",
    description: "What search engines show for your page.",
  },
  {
    id: "social",
    title: "Social preview",
    description: "What Facebook, LinkedIn and Discord show.",
  },
  {
    id: "twitter",
    title: "X / Twitter",
    description: "What shows up when shared on X.",
  },
] as const;

export type FieldGroupId = (typeof FIELD_GROUPS)[number]["id"];


export const EDITABLE_FIELD_META: {
  key: keyof EditableMeta;
  label: string;
  hint: string;
  tag: string;
  group: FieldGroupId;
  multiline?: boolean;
}[] = [
  { key: "title", label: "Page title", hint: "Shows in the browser tab and search results.", tag: "title", group: "basics" },
  { key: "description", label: "Page description", hint: "A short summary shown under your title in search results.", tag: "meta description", group: "basics", multiline: true },
  { key: "favicon", label: "Favicon", hint: "The small icon shown in the browser tab.", tag: "favicon link", group: "basics" },
  { key: "ogTitle", label: "Title", hint: "The headline shown when your link is shared.", tag: "og:title", group: "social" },
  { key: "ogDescription", label: "Description", hint: "A short blurb shown under the title.", tag: "og:description", group: "social", multiline: true },
  { key: "ogImage", label: "Preview image", hint: "The picture shown alongside your link.", tag: "og:image", group: "social" },
  { key: "ogUrl", label: "Page link", hint: "The main web address for this page.", tag: "og:url", group: "social" },
  { key: "ogType", label: "Content type", hint: "What kind of page this is, e.g. \"website\" or \"article\".", tag: "og:type", group: "social" },
  { key: "ogSiteName", label: "Site name", hint: "Your website or brand name.", tag: "og:site_name", group: "social" },
  { key: "twitterCard", label: "Card style", hint: "\"summary_large_image\" shows a big photo, \"summary\" shows a small one.", tag: "twitter:card", group: "twitter" },
  { key: "twitterTitle", label: "Title", hint: "The headline shown on X.", tag: "twitter:title", group: "twitter" },
  { key: "twitterDescription", label: "Description", hint: "A short blurb shown under the title on X.", tag: "twitter:description", group: "twitter", multiline: true },
  { key: "twitterImage", label: "Preview image", hint: "The picture shown on X.", tag: "twitter:image", group: "twitter" },
  { key: "twitterSite", label: "X account", hint: "Your site's X username, e.g. @yourbrand.", tag: "twitter:site", group: "twitter" },
];

export function buildMetaTagHtml(meta: EditableMeta): string {
  const lines = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    meta.favicon ? `<link rel="icon" href="${meta.favicon}" />` : "",
    "",
    `<meta property="og:title" content="${meta.ogTitle}" />`,
    `<meta property="og:description" content="${meta.ogDescription}" />`,
    `<meta property="og:image" content="${meta.ogImage}" />`,
    `<meta property="og:url" content="${meta.ogUrl}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    meta.ogSiteName ? `<meta property="og:site_name" content="${meta.ogSiteName}" />` : "",
    "",
    `<meta name="twitter:card" content="${meta.twitterCard}" />`,
    `<meta name="twitter:title" content="${meta.twitterTitle}" />`,
    `<meta name="twitter:description" content="${meta.twitterDescription}" />`,
    `<meta name="twitter:image" content="${meta.twitterImage}" />`,
    meta.twitterSite ? `<meta name="twitter:site" content="${meta.twitterSite}" />` : "",
  ];
  return lines.filter((l) => l !== "").join("\n");
}
