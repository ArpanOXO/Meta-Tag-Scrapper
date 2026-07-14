import type { EditableMeta } from "../../types/meta";

interface PreviewProps {
  meta: EditableMeta;
  domain: string;
}

export function TwitterPreview({ meta, domain }: PreviewProps) {
  const isLarge = meta.twitterCard !== "summary";

  return (
    <div className="mx-auto max-w-[500px] overflow-hidden rounded-2xl border border-[#cfd9de] bg-white">
      {isLarge ? (
        <>
          <div className="aspect-[1.91/1] w-full overflow-hidden bg-[#f7f9f9]">
            {meta.twitterImage ? (
              <img
                src={meta.twitterImage}
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
          <div className="px-3 py-2.5">
            <p className="truncate text-[13px] text-[#536471]">{domain}</p>
            <p className="truncate text-[15px] font-normal leading-snug text-[#0f1419]">
              {meta.twitterTitle || "Untitled page"}
            </p>
            <p className="mt-0.5 line-clamp-1 text-[13px] leading-snug text-[#536471]">
              {meta.twitterDescription}
            </p>
          </div>
        </>
      ) : (
        <div className="flex">
          <div className="h-[120px] w-[120px] shrink-0 overflow-hidden bg-[#f7f9f9]">
            {meta.twitterImage ? (
              <img src={meta.twitterImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-[9px] text-ink-soft">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center px-3 py-2">
            <p className="truncate text-[13px] text-[#536471]">{domain}</p>
            <p className="truncate text-[15px] leading-snug text-[#0f1419]">
              {meta.twitterTitle || "Untitled page"}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#536471]">
              {meta.twitterDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
