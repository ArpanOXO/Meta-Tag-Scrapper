import type { EditableMeta } from "../../types/meta";

interface PreviewProps {
  meta: EditableMeta;
  domain: string;
}

export function DiscordPreview({ meta, domain }: PreviewProps) {
  return (
    <div className="mx-auto max-w-[500px] rounded bg-[#313338] p-3">
      <div className="flex gap-2 rounded border-l-4 border-[#5865f2] bg-[#2b2d31] px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-[12px] font-medium text-[#b5bac1]">{domain}</p>
          <p className="truncate text-[15px] font-semibold leading-snug text-[#00a8fc]">
            {meta.ogTitle || meta.twitterTitle || "Untitled page"}
          </p>
          <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-[#dbdee1]">
            {meta.ogDescription || meta.twitterDescription}
          </p>
          {(meta.ogImage || meta.twitterImage) && (
            <div className="mt-2.5 max-w-[300px] overflow-hidden rounded">
              <img
                src={meta.ogImage || meta.twitterImage}
                alt=""
                className="w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
