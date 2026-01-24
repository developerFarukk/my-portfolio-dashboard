import { useMotionButton } from "@/hooks/useMotionButton";
import { motion, MotionProps } from "framer-motion";
import { ReactNode, ElementType, ComponentPropsWithoutRef } from "react";

type MotionButtonProps<T extends ElementType> = {
  as?: T;
  disabled?: boolean;
  children: ReactNode;
} & MotionProps &
  ComponentPropsWithoutRef<T>;

export function MotionButton<T extends ElementType = "button">({
  as,
  disabled,
  children,
  ...props
}: MotionButtonProps<T>) {
  const Component = motion(as ?? "button");
  const motionProps = useMotionButton(disabled);

  return (
    <Component {...motionProps} {...props} disabled={disabled}>
      {children}
    </Component>
  );
}
