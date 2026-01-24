"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImagePreviewProps {
  url?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const ImagePreview = ({
  url,
  alt = "Preview",
  className,
  width = 100,
  height = 100,
}: ImagePreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (url && url.trim() !== "") {
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  }, [url]);

  if (!previewUrl) return null;

  return (
    <div className="mt-2">
      <Image
        src={previewUrl}
        alt={alt}
        className={`h-24 w-auto border rounded-md shadow-sm ${className || ""}`}
        width={width}
        height={height}
      />
    </div>
  );
};
