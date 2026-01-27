

"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ImagePreviewProps {
  url: string;
  alt?: string;
  onClear?: () => void;
}

export const MultiImageUrlPreview = ({
  url,
  alt = "Preview",
  onClear,
}: ImagePreviewProps) => {
  if (!url) return null;

  return (
    <div className="relative mt-2 inline-flex w-fit">
      <Image
        src={url}
        alt={alt}
        width={100}
        height={100}
        className="max-h-24 w-auto object-contain border rounded-md shadow-sm"
      />

      <button
        type="button"
        onClick={onClear}
        className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white hover:bg-red-300 hover:text-black"
      >
        <X size={12} />
      </button>
    </div>
  );
};

interface MultiImagePreviewGroupProps {
  urls: string[];
  alt?: string;
  onClear?: (index: number) => void;
}

export const MultiImagePreviewGroup = ({
  urls,
  alt,
  onClear,
}: MultiImagePreviewGroupProps) => {
  if (!urls.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {urls.map((url, index) => (
        <MultiImageUrlPreview
          key={index}
          url={url}
          alt={alt}
          onClear={() => onClear?.(index)}
        />
      ))}
    </div>
  );
};
