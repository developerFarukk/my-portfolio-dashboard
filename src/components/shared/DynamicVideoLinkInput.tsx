"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input"; // adjust import based on your setup

interface DynamicVideoLinksProps {
  links?: string[];
  onChange?: (links: string[]) => void;
}

export const DynamicVideoLinkInput = ({
  links: initialLinks = [""],
  onChange,
}: DynamicVideoLinksProps) => {
  const [links, setLinks] = useState<string[]>(initialLinks);
  const [error, setError] = useState<string>("");

  const isValidUrl = (url: string) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Add new input
  const handleAdd = () => {
    const lastIndex = links.length - 1;
    if (!isValidUrl(links[lastIndex])) {
      setError("Please input valid URL");
      return;
    }
    setLinks([...links, ""]);
    setError("");
  };

  // Remove input
  const handleRemove = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    onChange?.(updated);
  };

  // Handle change
  const handleChange = (value: string, index: number) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
    setError("");
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Header with Plus */}
      <div className="flex justify-between items-center">
        <span className="italic font-semibold text-md">
          Project Overview Video URL
          <span className="text-red-800 text-xs">(Optional)</span>
        </span>
        <button type="button" onClick={handleAdd}>
          <Plus />
        </button>
      </div>

      {/* Input Fields */}
      <div className="border-2 lg:p-2 p-1 rounded-md flex flex-col gap-2">
        {links.map((link, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center gap-2 p-1"
          >
            <div className="lg:w-24 w-16 italic">
              <h2>{`Link ${idx + 1}:`}</h2>
            </div>

            <Input
              type="text"
              value={link}
              onChange={(e) => handleChange(e.target.value, idx)}
              placeholder="Input Project Overview Video URL"
              className="bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0 flex-1"
            />

            {/* Minus button for all except first input */}
            {idx > 0 && (
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <Minus />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Error for last input */}
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
};
