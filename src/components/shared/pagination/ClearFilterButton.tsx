"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface ClearFilterButtonProps {
  filterClick: () => void;
}

const ClearFilterButton = ({ filterClick }: ClearFilterButtonProps) => {
  return (
    <div>
      <Button
        type="button"
        onClick={filterClick}
        data-fdprocessedid={"14326u"}
        className="flex items-center gap-2 px-4 py-1 rounded
             bg-gray-300 text-gray-800 hover:bg-gray-400
             dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-600
             transform transition-transform duration-200 ease-in-out active:scale-95"
      >
        <RefreshCcw className="w-4 h-4" />
        Clear All Filters
      </Button>
    </div>
  );
};

export default ClearFilterButton;
