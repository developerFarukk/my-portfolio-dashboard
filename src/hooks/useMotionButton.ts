import { MotionProps } from "framer-motion";

export function useMotionButton(disabled?: boolean): MotionProps {
  return {
    whileTap: disabled ? undefined : { scale: 0.97 },
    whileHover: disabled ? undefined : { scale: 1.01 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  };
}
