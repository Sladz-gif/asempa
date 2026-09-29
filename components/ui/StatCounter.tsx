"use client";

import React from "react";
import { useCountUpValue } from "@/lib/hooks/useCountUp";
import { cn } from "@/lib/utils/cn";

interface StatCounterProps {
  end: number;
  label: React.ReactNode;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  as?: "div" | "section";
}

export function StatCounter({
  end,
  label,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: StatCounterProps) {
  const { formatted, ref } = useCountUpValue({ end, duration, prefix, suffix, decimals });
  return (
    <div className={cn("flex flex-col items-start md:items-center gap-2 md:gap-3", className)}>
      <span
        ref={ref}
        aria-live="polite"
        className="font-serif font-bold tracking-tight text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none"
      >
        {formatted}
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widgold text-warm-muted">
        {label}
      </span>
    </div>
  );
}
