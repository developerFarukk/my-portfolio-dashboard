"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder,
}: SearchInputProps) => {
  return (
    <div className="relative flex w-full md:w-auto flex-1">
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        className="w-full pl-10 pr-12 border dark:bg-slate-800 dark:text-slate-50 rounded-r-none border-r-0"
        value={value}
        onChange={onChange}
      />

      {/* Search Icon - Left */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none">
        <Search />
      </span>

      {/* Clear Button */}
      <div className="relative group">
        <Button
          type="button"
          onClick={onClear}
          disabled={!value.trim()}
          className={`rounded-l-none border-l-0 transition-colors duration-300 relative italic
            ${
              !value.trim()
                ? "cursor-not-allowed bg-gray-300 dark:bg-gray-500 text-black dark:text-white"
                : "hover:bg-primary/80 cursor-pointer"
            }`}
        >
          Clear
        </Button>

        {/* Tooltip shown only when disabled */}
        {!value.trim() && (
          <span
            className="absolute -top-8 right-0 hidden group-hover:flex 
            bg-gray-800 text-white text-xs rounded-md px-2 py-1
            dark:bg-slate-700 whitespace-nowrap"
          >
            Cannot clear while input is empty
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
