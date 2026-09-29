"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T): [T, (next: T | ((v: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return;
      setValue(JSON.parse(raw) as T);
    } catch {
      // ignore corrupt value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = (next: T | ((v: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof next === "function" ? (next as any)(prev) : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // ignore write errors (quota/private mode)
      }
      return resolved;
    });
  };

  return [value, update];
}
