"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface Options {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({ start = 0, end, duration = 1500, decimals = 0, prefix = "", suffix = "" }: Options): string {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState<number>(start);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setValue(end);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animate();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);

    const startTime = { current: 0 };
    function animate() {
      const tick = (ts: number) => {
        if (!startTime.current) startTime.current = ts;
        const elapsed = ts - startTime.current;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        const v = start + (end - start) * eased;
        setValue(v);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      obs.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, reduced]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return { formatted: `${prefix}${formatted}${suffix}`, ref } as any;
}

// Helper hook exposing an object (allows destructuring as { value, ref })
export function useCountUpValue(opts: Options) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCountUp(opts) as unknown as { formatted: string; ref: React.RefObject<HTMLSpanElement> };
}
