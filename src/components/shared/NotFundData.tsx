"use client";

import { FileSearch } from "lucide-react";
import { motion } from "framer-motion";

const NotFundData = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center space-y-3"
    >
      {/* Icon */}
      <FileSearch className="h-16 w-16 text-gray-400 dark:text-gray-500" />

      {/* Text */}
      <span className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
        No data found
      </span>

      {/* Optional description */}
      <p className="text-gray-400 dark:text-gray-500 text-sm text-center max-w-xs">
        Try adjusting your search or filters to find what you are looking for.
      </p>
    </motion.div>
  );
};

export default NotFundData;
