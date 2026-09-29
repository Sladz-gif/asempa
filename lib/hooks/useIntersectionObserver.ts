"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.1 }
): { ref: React.RefObject<T>; visible: boolean } {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setVisible(true);
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return { ref, visible };
}
