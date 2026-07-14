import type { EditableMeta } from "../../types/meta";

interface PreviewProps {
  meta: EditableMeta;
  domain: string;
}

export function InstagramPreview({ meta, domain }: PreviewProps) {
  return (
    <div className="mx-auto max-w-[320px]">
      <div className="rounded-2xl border border-[#dbdbdb] bg-white p-1.5">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#fafafa]">
          {meta.ogImage ? (
            <img
              src={meta.ogImage}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-ink-soft">
              No preview image set
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 px-1">
        <p className="truncate text-[13px] font-semibold leading-snug text-[#262626]">
          {meta.ogTitle || "Untitled page"}
        </p>
        <p className="truncate text-[12px] uppercase tracking-wide text-[#8e8e8e]">{domain}</p>
      </div>
    </div>
  );
}
