import React from "react";
import { cn } from "@/lib/utils/cn";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "full" | "short" | "gold-strong";
  align?: "left" | "center" | "right";
}

export function Divider({ className, variant = "full", align = "left" }: DividerProps) {
  const alignClass =
    align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "mr-auto";
  const base =
    variant === "short"
      ? "gold-divider-short"
      : variant === "gold-strong"
      ? "h-[1px] bg-gold w-full"
      : "gold-divider";
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("my-4 sm:my-6 md:my-10", base, variant === "short" ? alignClass : "", className)}
    />
  );
}

export function GoldSpan({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-gradient-gold font-serif font-bold", className)}>{children}</span>
  );
}
