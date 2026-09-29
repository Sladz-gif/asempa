"use client";

import React from "react";
import type { ChatAction } from "@/types";
import { cn } from "@/lib/utils/cn";
import { CalendarCheck, Phone, MessageCircle, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { useChatStore } from "./chatStore";
import { FIRM } from "@/lib/config";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";

function buildHref(action: ChatAction): string {
  if (action.type === "book-consultation") {
    const qs = new URLSearchParams();
    if (action.practiceAreaId) qs.set("practiceArea", action.practiceAreaId);
    if (action.attorneyId) qs.set("attorney", action.attorneyId);
    return `/book${qs.toString() ? `?${qs.toString()}` : ""}`;
  }
  if (action.type === "contact-human") return "/contact";
  if (action.type === "office-info") return action.mapUrl;
  if (action.type === "link") return action.href;
  return "/";
}

export function ChatRichCards({ actions }: { actions: ChatAction[] }) {
  const openChat = useChatStore((s) => s.setOpen);
  if (!actions || actions.length === 0) return null;
  return (
    <div className="mt-3 space-y-2.5">
      {actions.map((a, i) => {
        if (a.type === "book-consultation") {
          const pa = a.practiceAreaId ? practiceAreas.find((p) => p.id === a.practiceAreaId) : null;
          const at = a.attorneyId && a.attorneyId !== "any" ? attorneys.find((x) => x.id === a.attorneyId) : null;
          return (
            <a
              key={`book-${i}`}
              href={buildHref(a)}
              onClick={() => setTimeout(() => openChat(false), 30)}
              className="group block rounded-xl border border-gold/40 bg-gray-100 p-4 hover:bg-gray-200 hover:border-gold transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 rounded-md bg-gold grid place-items-center text-black-900 shadow-gold">
                  <CalendarCheck aria-hidden="true" className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-warm-text group-hover:text-gold transition-colors">
                    {a.label}
                  </p>
                  {pa && (
                    <p className="text-xs text-warm-muted mt-0.5">
                      Practice area: {pa.name.replace(/[[\]]/g, "")}
                    </p>
                  )}
                  {at && (
                    <p className="text-xs text-warm-muted mt-0.5">
                      Attorney: {at.fullName.replace(/[[\]]/g, "")}
                    </p>
                  )}
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold font-medium">
                    Open booking flow <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  </p>
                </div>
              </div>
            </a>
          );
        }
        if (a.type === "contact-human") {
          return (
            <div
              key={`human-${i}`}
              className="rounded-xl border border-gray-200 bg-gray-100 p-4"
            >
              <p className="text-sm font-semibold text-warm-text mb-3">Talk to a person</p>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${a.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 h-10 rounded-md border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-black-900 transition-colors"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  Call
                </a>
                <a
                  href={`https://wa.me/${a.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 h-10 rounded-md bg-gold text-black-900 text-sm font-medium hover:brightness-105 transition-all"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          );
        }
        if (a.type === "office-info") {
          return (
            <a
              key={`office-${i}`}
              href={buildHref(a)}
              className="group block rounded-xl border border-gray-200 bg-gray-100 p-4 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 shrink-0 rounded-md border border-gold/40 grid place-items-center text-gold">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-warm-text group-hover:text-gold transition-colors">
                    {FIRM.offices[0]?.name.replace(/[[\]]/g, "") || "Accra Office"}
                  </p>
                  <p className="text-xs text-warm-muted mt-0.5 leading-relaxed">
                    {a.address.replace(/[[\]]/g, "")}
                  </p>
                  <p className="text-xs text-warm-muted mt-1 leading-relaxed">{a.hours}</p>
                </div>
              </div>
            </a>
          );
        }
        if (a.type === "link") {
          return (
            <a
              key={`link-${i}`}
              href={buildHref(a)}
              className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 px-3.5 py-2.5 hover:border-gold/40 transition-colors"
            >
              <span className="text-sm text-warm-text group-hover:text-gold transition-colors">
                {a.label}
              </span>
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 text-warm-muted group-hover:text-gold" />
            </a>
          );
        }
        return null;
      })}
    </div>
  );
}
