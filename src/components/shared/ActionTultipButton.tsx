"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface TTolls {
  iconButton: React.ReactNode;
  tole: string;
}

const ActionTultipButton = ({ iconButton, tole }: TTolls) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="font-medium text-blue-800 dark:text-blue-400 whitespace-nowrap hover:text-blue-500 dark:hover:text-blue-300 text-start">
            {iconButton}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tole}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTultipButton;
