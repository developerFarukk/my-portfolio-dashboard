"use client";

import { X } from "lucide-react";

interface VideoUrlPreviewProps {
  urls?: string[]; // multiple video URLs
  onRemove?: (index: number) => void; // remove single URL callback
  height?: number;
}

export const VideoUrlPreview = ({
  urls = [],
  onRemove,
  height = 200,
}: VideoUrlPreviewProps) => {
  if (!urls || urls.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mt-3">
      {urls.map((url, index) => {
        let validUrl = "";
        try {
          validUrl = new URL(url).toString();
        } catch {
          return null; // skip invalid URL
        }

        return (
          <div
            key={index}
            className="relative w-full border rounded-md overflow-hidden shadow-sm"
          >
            {/* Clear button */}
            <button
              type="button"
              onClick={() => onRemove?.(index)}
              className="
                absolute top-2 right-2 z-10
                flex items-center justify-center
                h-6 w-6 rounded-full
                bg-black/70 text-white
                hover:bg-red-300
                hover:text-black
                border-2 border-black
              "
              aria-label="Remove video"
            >
              <X size={14} />
            </button>

            {/* Video / Website Preview */}
            <iframe
              src={validUrl}
              title={`Video Preview ${index + 1}`}
              className="w-full"
              style={{ height }}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        );
      })}
    </div>
  );
};
