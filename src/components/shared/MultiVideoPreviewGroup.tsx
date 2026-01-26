"use client";

import { useMemo } from "react";
import { X, ExternalLink } from "lucide-react";

/* -------------------------------- Utils -------------------------------- */

const isDirectVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

const getEmbedUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    // YouTube
    if (host.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtu.be") {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    // Vimeo
    if (host.includes("vimeo.com")) {
      const id = parsed.pathname.split("/")[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    // Dailymotion
    if (host.includes("dailymotion.com")) {
      const id = parsed.pathname.split("/video/")[1];
      return id ? `https://www.dailymotion.com/embed/video/${id}` : null;
    }

    // Facebook / Instagram (limited)
    if (host.includes("facebook.com") || host.includes("instagram.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url,
      )}`;
    }

    return null;
  } catch {
    return null;
  }
};

/* -------------------------------- Types -------------------------------- */

interface VideoPreviewProps {
  url: string;
  onClear?: () => void;
}

interface MultiVideoPreviewGroupProps {
  urls?: string | string[];
  onClear?: (index: number) => void;
}

/* ------------------------- Single Video Preview -------------------------- */

const VideoPreview = ({ url, onClear }: VideoPreviewProps) => {
  const embedUrl = useMemo(() => getEmbedUrl(url), [url]);
  const isVideoFile = isDirectVideo(url);

  return (
    <div className="relative w-[260px] h-[160px] border rounded-md overflow-hidden bg-black">
      {/* Clear Button */}
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute top-1 right-1 z-10 h-6 w-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-400"
        >
          <X size={14} />
        </button>
      )}

      {/* Direct Video */}
      {isVideoFile && (
        <video src={url} controls className="w-full h-full object-contain" />
      )}

      {/* Embed Platforms */}
      {!isVideoFile && embedUrl && (
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}

      {/* Fallback */}
      {!isVideoFile && !embedUrl && (
        <div className="flex flex-col items-center justify-center h-full text-white text-xs gap-2">
          <p>Preview not supported</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 underline"
          >
            Open Video <ExternalLink size={12} />
          </a>
        </div>
      )}
    </div>
  );
};

/* ------------------------- Multi Video Preview ---------------------------- */

export const MultiVideoPreviewGroup = ({
  urls,
  onClear,
}: MultiVideoPreviewGroupProps) => {
  if (!urls) return null;

  const normalized = Array.isArray(urls) ? urls : [urls];

  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {normalized.map((url, index) => (
        <VideoPreview key={index} url={url} onClear={() => onClear?.(index)} />
      ))}
    </div>
  );
};
