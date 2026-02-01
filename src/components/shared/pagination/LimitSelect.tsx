"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


interface LimitSelectProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  options?: number[];
  placeholder?: string;
  className?: string;
}

const LimitSelect = ({
  value,
  onChange,
  label = "Limit",
  options = [5, 10, 20, 50, 100],
  placeholder = "Select limit",
  className,
}: LimitSelectProps) => {
  return (
    <div className={`w-full sm:w-[48%] md:w-[180px] ${className || ""}`}>
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="w-full border dark:bg-slate-800 dark:text-slate-50">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt} / page
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LimitSelect;
