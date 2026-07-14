import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

// A simple card used to group each section of the page (results, editor,
// preview, code). One component, one job: title + optional description +
// optional action button, then whatever content is passed in.
export function Panel({ title, description, action, children, className = "" }: PanelProps) {
  return (
    <section className={`rounded-2xl border border-line bg-panel shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-ink-soft">{description}</p>}
        </div>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}
