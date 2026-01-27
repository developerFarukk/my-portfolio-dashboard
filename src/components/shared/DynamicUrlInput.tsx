

"use client";

import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "../ui/form";
import { motion } from "framer-motion";
import React from "react";

export interface DynamicUrlInputProps {
  links?: string[]; // accept optional array from RHF
  onChange: (links: string[]) => void;
  urlTitle?: string;
  inputeHolder?: string;
}

export const DynamicUrlInput = ({
  links: initialLinks = [""],
  onChange,
  urlTitle,
  inputeHolder,
}: DynamicUrlInputProps) => {
  const [links, setLinks] = React.useState<string[]>(
    initialLinks.length ? initialLinks : [""],
  );
  const [error, setError] = React.useState<string>("");

  // sync parent changes (e.g., form reset)
  React.useEffect(() => {
    if (initialLinks && initialLinks.length) {
      setLinks(initialLinks);
    } else {
      setLinks([""]);
    }
  }, [initialLinks]);

  const isValidUrl = (url: string) => {
    try {
      if (!url || url.trim() === "") return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    const last = links[links.length - 1];
    if (!isValidUrl(last)) {
      setError("Please input a valid URL before adding a new field");
      return;
    }
    const updated = [...links, ""];
    setLinks(updated);
    onChange(updated);
    setError("");
  };

  const handleRemove = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    const final = updated.length ? updated : [""]; // always at least one field
    setLinks(final);
    onChange(final);
  };

  const handleChange = (value: string, index: number) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
    onChange(updated);
    setError("");
  };

  return (
    <div>
      {/* Header with title + add button */}
      <div className="flex justify-between items-center mb-2">
        <FormLabel className="italic font-semibold text-md">
          {urlTitle}
          <span className="text-red-800 text-xs">(Optional)</span>
        </FormLabel>
        <motion.button
          type="button"
          onClick={handleAdd}
          whileTap={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="hover:border hover:rounded-full hover:dark:border-white"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Input fields */}
      <div className="border-2 lg:p-2 p-1 rounded-md flex flex-col gap-2">
        {links.map((link, idx) => (
          <div key={idx} className="flex items-center gap-2 w-full">
            <div className="lg:w-24 w-20 italic flex-shrink-0">{`Link ${idx + 1}:`}</div>

            <Input
              value={link}
              onChange={(e) => handleChange(e.target.value, idx)}
              placeholder={inputeHolder}
              className="flex-1 w-full"
            />

            {idx > 0 && (
              <motion.button
                type="button"
                onClick={() => handleRemove(idx)}
                whileTap={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex-shrink-0"
              >
                <Minus size={20} />
              </motion.button>
            )}
          </div>
        ))}

        {/* Show error if last URL invalid */}
        {error && <p className="text-red-600 text-xs text-right">{error}</p>}
      </div>
    </div>
  );
};
