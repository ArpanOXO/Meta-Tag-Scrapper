"use client";

import { useState } from "react";
import { buildMetaTagHtml, type EditableMeta } from "../types/meta";
import { Panel } from "./ui/Panel";

interface CopySectionProps {
  meta: EditableMeta;
}

export function CopySection({ meta }: CopySectionProps) {
  const [copied, setCopied] = useState(false);
  const html = buildMetaTagHtml(meta);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, the code stays selectable.
    }
  }

  return (
    <Panel
      title="Get the code"
      description="Paste this inside your page's <head> tag."
      action={
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand px-3 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
        >
          {copied ? "Copied!" : "Copy code"}
        </button>
      }
    >
      <pre className="max-h-72 overflow-auto rounded-lg bg-ink px-4 py-3.5 font-mono text-[12px] leading-relaxed text-panel">
        <code>{html}</code>
      </pre>
    </Panel>
  );
}
