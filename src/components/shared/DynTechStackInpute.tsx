"use client";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "../ui/form";
import { motion } from "framer-motion";

export interface DynamicVideoUrlInputProps {
  links?: string[];
  onChange?: (links: string[]) => void;
  urlTitle?: string;
  inputeHolder?: string;
}

const DynTechStackInpute = ({
  links: initialLinks = [""],
  onChange,
  urlTitle,
  inputeHolder,
}: DynamicVideoUrlInputProps) => {
  const [links, setLinks] = useState<string[]>(
    initialLinks.length ? initialLinks : [""],
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // sync parent value if changed
    if (initialLinks && initialLinks.length) {
      setLinks(initialLinks);
    }
  }, [initialLinks]);

  const isValidUrl = (url: string) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    const lastIndex = links.length - 1;
    if (!isValidUrl(links[lastIndex])) {
      setError("Please input valid URL");
      return;
    }
    const updated = [...links, ""];
    setLinks(updated);
    setError("");
    onChange?.(updated);
  };

  const handleRemove = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    onChange?.(updated);
  };

  const handleChange = (value: string, index: number) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
    setError("");
    onChange?.(updated);
  };

  return (
    <div>
      {/* Header with Plus */}
      <div className="flex justify-between items-center mt-2 mb-2">
        <FormLabel className="italic font-semibold text-md">
          {/* Project Overview Video URL */}
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

      {/* <FormControl> */}
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
              placeholder={inputeHolder}
              className=" bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none dark:border-0 flex-1"
            />

            {/* Minus button for all except first input */}
            {idx > 0 && (
              <motion.button
                type="button"
                onClick={() => handleRemove(idx)}
                whileTap={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="hover:border hover:rounded-full hover:dark:border-white"
              >
                <Minus size={20} />
              </motion.button>
            )}
          </div>
        ))}

        {/* Error for last input */}
        {error && <p className="text-red-600 text-xs text-right">{error}</p>}
      </div>
      {/* </FormControl> */}
    </div>
  );
};

export default DynTechStackInpute;
