

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


export interface Option<T extends string = string> {
  label: string;
  value: T;
}

interface FormSelectProps<T extends string = string> {
  value: T | "";
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  options: readonly Option<T>[];
}

export function SelectForm<T extends string>({
  value,
  onChange,
  placeholder = "Select an option",
  label,
  options,
}: FormSelectProps<T>) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-fuchsia-200/30 border-blue-200 border-2 dark:bg-none dark:border-none">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel className="text-center">{label}</SelectLabel>}

          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
