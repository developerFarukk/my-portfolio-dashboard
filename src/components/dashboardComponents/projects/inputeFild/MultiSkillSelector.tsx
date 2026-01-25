

"use client";

import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";

/* ---------------- Types ---------------- */
interface Tag {
  id: number;
  name: string;
  value: string;
  color: string;
}

interface MultiSkillSelectorProps {
  value: string[];
  onChange: (values: string[]) => void;
}

/* ---------------- Tags ---------------- */
const ALL_TAGS: Tag[] = [
  {
    id: 1,
    name: "JavaScript",
    value: "javascript",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    id: 2,
    name: "TypeScript",
    value: "typescript",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    id: 3,
    name: "React",
    value: "react",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  },
  {
    id: 4,
    name: "Vue",
    value: "vue",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    id: 5,
    name: "Angular",
    value: "angular",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  {
    id: 6,
    name: "Node.js",
    value: "nodejs",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  {
    id: 7,
    name: "Python",
    value: "python",
    color:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  },
];

/* ---------------- Component ---------------- */
export default function MultiSkillSelector({
  value,
  onChange,
}: MultiSkillSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedTags = ALL_TAGS.filter((tag) => value.includes(tag.value));

  const filteredTags = ALL_TAGS.filter(
    (tag) =>
      !value.includes(tag.value) &&
      tag.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleTag = (tag: Tag) => {
    const updated = value.includes(tag.value)
      ? value.filter((v) => v !== tag.value)
      : [...value, tag.value];

    onChange(updated);
    setSearch("");
  };

  return (
    <div ref={wrapperRef}>
      <div
        className="border-2 rounded-md p-2 flex flex-wrap gap-2 cursor-text"
        onClick={() => setIsOpen(true)}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className={`px-2 py-1 rounded-full text-xs ${tag.color}`}
          >
            {tag.name}
          </span>
        ))}

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={value.length === 0 ? "Select tech skills..." : ""}
          className="border-none shadow-none focus-visible:ring-0 w-auto flex-1"
        />
      </div>

      {isOpen && (
        <div className="mt-1 border rounded-md bg-white dark:bg-black shadow max-h-52 overflow-y-auto">
          {filteredTags.length ? (
            filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => toggleTag(tag)}
                className="px-3 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {tag.name}
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground p-2">
              No skills found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
