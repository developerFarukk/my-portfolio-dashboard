"use client";

import { ArrowBigRight } from "lucide-react";

interface TTitle {
  title: string;
  icon?: React.ReactNode;
  count?: React.ReactNode;
}

const TitleHooks = ({ title, icon, count }: TTitle) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="flex items-center justify-center gap-3 sm:gap-5 px-6 py-3 rounded-xl
        bg-gray-100/60 dark:bg-slate-800/50 shadow-sm border
        border-gray-200 dark:border-slate-700"
      >
        {/* Icon */}
        {icon && (
          <div className="flex items-center justify-center text-blue-600 dark:text-yellow-400">
            {icon}
          </div>
        )}

        {/* Title */}
        <h1
          className="flex items-center gap-2 text-lg sm:text-xl font-semibold 
          text-gray-800 dark:text-slate-100"
        >
          <span className="leading-none italic">{title}</span>
          {count ? (
            <ArrowBigRight className="w-5 h-5 text-blue-500 dark:text-yellow-400 relative top-[2px]" />
          ) : (
            ""
          )}
        </h1>

        {/* Count Badge */}
        {count ? (
          <div
            className="inline-flex items-center justify-center min-w-[2.25rem] h-9 px-3
          rounded-full border-1 font-bold text-2xl
          border-blue-500 dark:border-yellow-600
          text-blue-500 dark:text-yellow-600
          bg-blue-50 dark:bg-slate-900 shadow-sm text-center transition-all"
          >
            {count}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TitleHooks;
