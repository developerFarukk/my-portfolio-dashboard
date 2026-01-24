"use client";

import { X } from "lucide-react";

interface WebsiteUrlPreviewProps {
  url?: string;
  onClear?: () => void;
  height?: number;
}

export const WebsitePreviewUrl = ({
  url,
  onClear,
  height = 200,
}: WebsiteUrlPreviewProps) => {
  if (!url) return null;

  let validUrl = "";
  try {
    validUrl = new URL(url).toString();
  } catch {
    return null;
  }

  return (
    <div className="relative mt-3 w-full border rounded-md overflow-hidden shadow-sm">
      {/* Clear button */}
      <button
        type="button"
        onClick={onClear}
        className="
          absolute top-2 right-2 z-10
          flex items-center justify-center
          h-6 w-6 rounded-full
          bg-black/70 text-white
          hover:bg-red-300
          hover:text-black
          border-2 border-black
        "
      >
        <X size={14} />
      </button>

      {/* Website Preview */}
      <iframe
        src={validUrl}
        title="Website Preview"
        className="w-full"
        style={{ height }}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};
