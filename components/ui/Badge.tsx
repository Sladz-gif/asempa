import React from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "default" | "gold" | "outline";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}) {
  const styles: Record<Variant, string> = {
    default:
      "inline-flex items-center gap-1 rounded-full border border-black-700 bg-black-800/60 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-warm-muted",
    gold: "chip-gold",
    outline:
      "inline-flex items-center gap-1 rounded-full border border-[var(--border-gold)] px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-warm-text",
  };
  return (
    <span className={cn(styles[variant], className)}>{children}</span>
  );
}
