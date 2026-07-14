interface FieldProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

// A single labeled input, used for every editable meta tag. Kept as one
// simple component so the editor form is just a list of these.
export function Field({ label, hint, value, onChange, multiline }: FieldProps) {
  const sharedClasses =
    "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <div className="border-b border-line py-4 first:pt-0 last:border-b-0">
      <label className="mb-1 block text-sm font-medium text-ink">{label}</label>
      {hint && <p className="mb-2 text-xs text-ink-soft">{hint}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={`resize-none ${sharedClasses}`}
        />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={sharedClasses} />
      )}
    </div>
  );
}
