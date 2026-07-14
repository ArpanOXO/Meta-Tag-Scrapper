"use client";

import { useState, type FormEvent } from "react";
import { normalizeAndValidateUrl } from "../utils/validateUrl";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const { valid, normalized } = normalizeAndValidateUrl(value);
  const showError = touched && value.trim().length > 0 && !valid;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid || isLoading) return;
    onSubmit(normalized);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="url-input" className="mb-2 block text-sm font-medium text-ink">
        Paste a link to check
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="url-input"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="e.g. example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={showError}
          aria-describedby={showError ? "url-error" : undefined}
          className={`w-full flex-1 rounded-lg border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 outline-none transition-colors ${
            showError ? "border-warn focus:ring-2 focus:ring-warn/20" : "border-line focus:border-brand focus:ring-2 focus:ring-brand/15"
          }`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              Checking…
            </>
          ) : (
            "Check my link"
          )}
        </button>
      </div>
      <p
        id="url-error"
        role="alert"
        className={`mt-2 text-sm text-warn transition-opacity ${showError ? "opacity-100" : "opacity-0"}`}
      >
        That doesn't look like a valid web address. Try something like example.com
      </p>
    </form>
  );
}
