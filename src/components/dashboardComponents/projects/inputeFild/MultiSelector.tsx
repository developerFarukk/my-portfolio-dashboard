"use client";

import { Input } from "@/components/ui/input";
import { MultiSelectOption } from "@/types/projectType";
import { CheckIcon, XIcon } from "lucide-react";
import React, { useState, useRef, useEffect, useMemo } from "react";

interface MultiSelectorProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function MultiSelector({
  value = [],
  onChange,
  options = [],
  placeholder = "Select options...",
}: MultiSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* 🔑 derive selected options from RHF value */
  const selectedOptions = useMemo(
    () => options.filter((opt) => value.includes(opt.value)),
    [value, options],
  );

  const filteredOptions = useMemo(
    () =>
      options.filter(
        (opt) =>
          !value.includes(opt.value) &&
          opt.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [value, searchTerm, options],
  );

  /* outside click */
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

  /* ---------------- Actions ---------------- */
  const addOption = (option: MultiSelectOption) => {
    onChange([...value, option.value]);
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const removeOption = (option: MultiSelectOption) => {
    onChange(value.filter((v) => v !== option.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchTerm === "" && selectedOptions.length) {
      removeOption(selectedOptions[selectedOptions.length - 1]);
      return;
    }

    if (!isOpen && (e.key === "Enter" || e.key === "ArrowDown")) {
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % filteredOptions.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(
        (i) => (i - 1 + filteredOptions.length) % filteredOptions.length,
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlightedIndex];
      if (opt) addOption(opt);
    }

    if (e.key === "Escape") setIsOpen(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div ref={wrapperRef}>
      <div
        className="border-2 rounded-md p-2 flex flex-wrap gap-2 cursor-text"
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {selectedOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 rounded-md"
          >
            {option.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeOption(option);
              }}
            >
              <XIcon size={14} />
            </button>
          </div>
        ))}

        <Input
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            !selectedOptions.length ? `${placeholder}` : "Search option..."
          }
          className="border-none shadow-none focus-visible:ring-0 flex-1 bg-transparent"
        />
      </div>

      {isOpen && (
        <div className="mt-1 border rounded-md bg-white dark:bg-black shadow max-h-52 overflow-y-auto">
          <ul className="p-1">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.id}
                  onClick={() => addOption(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`p-2 rounded-md cursor-pointer ${
                    index === highlightedIndex
                      ? "bg-slate-100 dark:bg-slate-800"
                      : ""
                  }`}
                >
                  {option.name}
                  {value.includes(option.value) && <CheckIcon />}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-slate-400">
                No options found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
