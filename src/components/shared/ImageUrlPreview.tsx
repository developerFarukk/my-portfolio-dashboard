"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ImagePreviewProps {
  url?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  onClear?: () => void;
}

export const ImageUrlPreview = ({
  url,
  alt = "Preview",
  onClear,
  className,
  width = 100,
  height = 100,
}: ImagePreviewProps) => {
  if (!url || url.trim() === "") return null;

  return (
    <div className="relative mt-2 inline-flex w-fit">
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        unoptimized={true}
        className={`
          block
          max-h-24
          w-auto
          object-contain
          border
          rounded-md
          shadow-sm
          ${className || ""}
        `}
      />

      {/* Clear button */}
      <button
        type="button"
        onClick={onClear}
        className="
          absolute top-1 right-1
          flex items-center justify-center
          h-5 w-5
          rounded-full
          bg-black/70 text-white
          hover:bg-red-300
          hover:text-black
          z-10
        "
        aria-label="Remove image"
      >
        <X size={12} />
      </button>
    </div>
  );
};
