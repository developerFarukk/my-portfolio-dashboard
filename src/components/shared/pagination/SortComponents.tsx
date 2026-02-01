"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  options: { value: string; label: string }[];
  className?: string;
}
const SortComponents = ({
  value,
  onChange,
  placeholder = "Select option",
  label = "Sort By",
  options,
  className,
}: SortSelectProps) => {
  return (
    <div className={`w-full sm:w-[48%] md:w-[180px] ${className || ""}`}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full border dark:bg-slate-800 dark:text-slate-50">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortComponents;
