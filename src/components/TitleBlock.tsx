// The page header. Kept intentionally plain: a small logo mark, the app
// name, and a one-line description of what it does.
export function TitleBlock() {
  return (
    <header className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-xl">
          🔗
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight text-ink">Metascope</p>
          <p className="text-sm text-ink-soft">Check how your links look when they're shared</p>
        </div>
      </div>
    </header>
  );
}
