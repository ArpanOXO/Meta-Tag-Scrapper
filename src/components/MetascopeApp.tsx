"use client";

import { useEffect, useState } from "react";
import { TitleBlock } from "@/components/TitleBlock";
import { UrlForm } from "@/components/UrlForm";
import { FoundTagsList } from "@/components/FoundTagsList";
import { EditForm } from "@/components/EditForm";
import { CopySection } from "@/components/CopySection";
import { PreviewTabs } from "@/components/PreviewTabs";
import { useScrapeWebsite } from "@/hooks/useScrapeWebsite";
import { scrapedToEditable, type EditableMeta } from "@/types/meta";

const EXAMPLE_URLS = ["github.com", "stripe.com", "nytimes.com"];

export function MetascopeApp() {
  const { mutate, data, isPending, isError, error, reset } = useScrapeWebsite();
  const [editable, setEditable] = useState<EditableMeta | null>(null);

  // Whenever a new scan finishes, load its tags into the editable form.
  useEffect(() => {
    if (data) {
      setEditable(scrapedToEditable(data));
    }
  }, [data]);

  function handleScan(url: string) {
    reset();
    mutate(url);
  }

  const domain = data ? new URL(data.finalUrl).hostname.replace(/^www\./, "") : "";

  return (
    <div className="min-h-screen">
      <TitleBlock />

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Step 1: enter a URL */}
        <section className="mb-10">
          <h1 className="mb-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            See what people see when your link is shared.
          </h1>
          <p className="mb-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Paste any web address below. We'll pull its title, description, and social
            media tags, then let you edit them and preview the result on Facebook, X,
            Discord, and Instagram.
          </p>

          <div className="rounded-2xl border border-line bg-panel p-5">
            <UrlForm onSubmit={handleScan} isLoading={isPending} />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-ink-soft">Try:</span>
              {EXAMPLE_URLS.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => handleScan(`https://${u}`)}
                  disabled={isPending}
                  className="rounded-full border border-line px-2.5 py-1 text-sm text-ink-soft transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {isError && (
            <div role="alert" className="mt-4 rounded-lg border border-warn/30 bg-warn-dim px-4 py-3 text-sm text-warn">
              {error instanceof Error ? error.message : "Something went wrong checking that link."}
            </div>
          )}
        </section>

        {/* Step 2 & 3: review, edit, preview, and copy the result */}
        {data && editable ? (
          <section className="animate-fade-up space-y-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <FoundTagsList data={data} />
              <EditForm meta={editable} onChange={setEditable} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <PreviewTabs meta={editable} domain={domain} />
              <CopySection meta={editable} />
            </div>
          </section>
        ) : (
          !isPending && (
            <section className="rounded-2xl border border-dashed border-line bg-panel/60 px-6 py-16 text-center">
              <p className="text-sm text-ink-soft">Paste a link above to get started.</p>
            </section>
          )
        )}
      </main>

      <footer className="border-t border-line py-6">
        <p className="mx-auto max-w-5xl px-6 text-sm text-ink-soft">
          Metascope — a simple way to check how your links look when shared.
        </p>
      </footer>
    </div>
  );
}

