"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { tokens } from "@/shared/design-system/tokens";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const transitionProps = shouldReduceMotion
    ? {
        initial: false as const,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: tokens.motion.reduced,
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: tokens.motion.standard,
      };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={pathname} className="flex flex-1 flex-col" {...transitionProps}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
