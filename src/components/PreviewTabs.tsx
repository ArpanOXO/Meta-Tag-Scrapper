"use client";

import { useState } from "react";
import type { EditableMeta } from "../types/meta";
import { Panel } from "./ui/Panel";
import { FacebookPreview } from "./previews/FacebookPreview";
import { TwitterPreview } from "./previews/TwitterPreview";
import { DiscordPreview } from "./previews/DiscordPreview";
import { InstagramPreview } from "./previews/InstagramPreview";

interface PreviewTabsProps {
  meta: EditableMeta;
  domain: string;
}

const PLATFORMS = [
  { id: "facebook", label: "Facebook", bg: "#e9ebee" },
  { id: "twitter", label: "X / Twitter", bg: "#ffffff" },
  { id: "discord", label: "Discord", bg: "#1e1f22" },
  { id: "instagram", label: "Instagram", bg: "#ffffff" },
] as const;

type PlatformId = (typeof PLATFORMS)[number]["id"];

export function PreviewTabs({ meta, domain }: PreviewTabsProps) {
  const [active, setActive] = useState<PlatformId>("facebook");
  const platform = PLATFORMS.find((p) => p.id === active)!;

  return (
    <Panel title="See how it looks" description="Pick a platform to preview.">
      <div className="mb-4 flex flex-wrap gap-1 border-b border-line pb-3">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active === p.id ? "bg-brand text-white" : "bg-bg text-ink-soft hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        className="animate-fade-up rounded-lg border border-line p-6"
        style={{ backgroundColor: platform.bg }}
        key={active}
      >
        {active === "facebook" && <FacebookPreview meta={meta} domain={domain} />}
        {active === "twitter" && <TwitterPreview meta={meta} domain={domain} />}
        {active === "discord" && <DiscordPreview meta={meta} domain={domain} />}
        {active === "instagram" && <InstagramPreview meta={meta} domain={domain} />}
      </div>
    </Panel>
  );
}
