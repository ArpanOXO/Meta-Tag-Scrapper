import type { ScrapedMeta } from "../types/meta";
import { Panel } from "./ui/Panel";

interface FoundTagsListProps {
  data: ScrapedMeta;
}

// Plain-English checklist of the things that matter most for link
// previews. `present` just checks whether the site already has that tag.
const CHECKS: { label: string; present: (d: ScrapedMeta) => boolean }[] = [
  { label: "Page title", present: (d) => Boolean(d.title) },
  { label: "Page description", present: (d) => Boolean(d.description) },
  { label: "Preview image", present: (d) => Boolean(d.og.image) },
  { label: "X (Twitter) card", present: (d) => Boolean(d.twitter.card) },
  { label: "Canonical link", present: (d) => Boolean(d.canonical) },
  { label: "Favicon", present: (d) => Boolean(d.favicon) },
];

export function FoundTagsList({ data }: FoundTagsListProps) {
  const ogCount = Object.values(data.og).filter(Boolean).length;
  const twitterCount = Object.values(data.twitter).filter(Boolean).length;

  return (
    <Panel title="What we found" description={`${data.raw.length} tags on this page`}>
      <div className="mb-4 flex flex-wrap gap-2">
        {CHECKS.map((check) => {
          const ok = check.present(data);
          return (
            <span
              key={check.label}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                ok ? "border-good/30 bg-good-dim text-good" : "border-warn/30 bg-warn-dim text-warn"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-good" : "bg-warn"}`} />
              {check.label}
            </span>
          );
        })}
      </div>

      <div className="mb-3 grid grid-cols-3 gap-3 border-y border-line py-3 text-center">
        <div>
          <p className="text-lg font-semibold text-ink">{data.raw.length}</p>
          <p className="text-xs text-ink-soft">Total tags</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">{ogCount}</p>
          <p className="text-xs text-ink-soft">Social tags</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">{twitterCount}</p>
          <p className="text-xs text-ink-soft">X tags</p>
        </div>
      </div>

      {/* The raw tag names (e.g. "og:image") are useful for developers but
          not something a beginner needs up front, so they're tucked away
          behind a native <details> disclosure instead of always shown. */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-brand marker:content-none">
          Show all raw tags
        </summary>
        <ul className="mt-2 max-h-56 divide-y divide-line overflow-y-auto pr-1">
          {data.raw.map((tag, i) => (
            <li key={`${tag.property}-${i}`} className="py-1.5 text-xs">
              <span className="text-ink-soft">{tag.property}</span>{" "}
              <span className="break-all text-ink">{tag.content}</span>
            </li>
          ))}
        </ul>
      </details>
    </Panel>
  );
}
