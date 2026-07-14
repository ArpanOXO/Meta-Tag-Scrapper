import type { EditableMeta } from "../../types/meta";

interface PreviewProps {
  meta: EditableMeta;
  domain: string;
}

export function FacebookPreview({ meta, domain }: PreviewProps) {
  return (
    <div className="mx-auto max-w-[500px] rounded-md border border-[#dadde1] bg-white shadow-sm">
      <div className="aspect-[1.91/1] w-full overflow-hidden bg-[#f0f2f5]">
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
      <div className="border-t border-[#dadde1] bg-[#f2f3f5] px-3 py-2.5">
        <p className="mb-0.5 truncate text-[11px] uppercase text-[#65676b]">{domain}</p>
        <p className="truncate text-[15px] font-semibold leading-snug text-[#050505]">
          {meta.ogTitle || "Untitled page"}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#65676b]">
          {meta.ogDescription}
        </p>
      </div>
    </div>
  );
}
