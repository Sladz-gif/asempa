"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

export function CookieBanner() {
  const [consent, setConsent] = useLocalStorage<null | "accepted" | "rejected">(
    "cookie-consent",
    null
  );

  if (consent !== null) return null;

  return (
    <div
      className="fixed z-50 inset-x-0 bottom-14 md:bottom-4 md:left-4 md:right-auto md:max-w-md"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and privacy notice"
    >
      <div className="mx-3 md:mx-0 card-surface border-gold/25 shadow-gold-lg rounded-xl p-5 md:p-6 animate-fade-in-up">
        <div className="flex items-start justify-between gap-4">
          <h4 className="font-serif text-lg text-warm-text leading-tight">
            Cookie notice
          </h4>
          <button
            type="button"
            aria-label="Dismiss cookie notice (sets consent to rejected)"
            className="h-8 w-8 shrink-0 rounded-md text-warm-muted hover:text-gold hover:bg-black-800 inline-flex items-center justify-center"
            onClick={() => setConsent("rejected")}
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 text-sm text-warm-muted leading-relaxed">
          [Placeholder: We use necessary cookies to make this website function and to understand
          how visitors use it. Before accepting, you can read our{" "}
          <Link href="/privacy" className="text-gold hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="text-gold hover:underline">
            Cookie Policy
          </Link>
          , which must be confirmed by a Ghanaian lawyer against the Data Protection Act, 2012
          (Act 843) before being used in production.]
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="md"
            className="sm:flex-1"
            onClick={() => setConsent("rejected")}
          >
            Reject non-essential
          </Button>
          <Button
            variant="primary"
            size="md"
            className="sm:flex-1"
            onClick={() => setConsent("accepted")}
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
