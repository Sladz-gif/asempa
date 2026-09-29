"use client";

import React from "react";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { FIRM } from "@/lib/config";
import Link from "next/link";

export function StickyBottomBar() {
  return (
    <div
      className="md:hidden fixed z-30 left-0 right-0 bottom-0 border-t border-black-700 bg-black-900/95 backdrop-blur shadow-[0_-8px_30px_rgba(0,0,0,0.4)]"
      role="region"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3 h-14">
        <a
          href={`tel:${FIRM.phone.replace(/[^\d+]/g, "")}`}
          className="flex flex-col items-center justify-center gap-0.5 border-r border-black-700 text-warm-text hover:bg-black-800/50 hover:text-gold active:bg-black-800 transition-colors"
          aria-label="Call the firm"
        >
          <Phone aria-hidden="true" className="h-5 w-5" />
          <span className="text-[10px] uppercase tracking-widgold">Call</span>
        </a>
        <a
          href={`https://wa.me/${FIRM.whatsapp.replace(/[^\d]/g, "")}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-col items-center justify-center gap-0.5 border-r border-black-700 text-warm-text hover:bg-black-800/50 hover:text-gold active:bg-black-800 transition-colors"
          aria-label="Message on WhatsApp"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5" />
          <span className="text-[10px] uppercase tracking-widgold">WhatsApp</span>
        </a>
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-0.5 bg-gold text-black-900 hover:brightness-105 active:brightness-95 transition-all"
          aria-label="Book a consultation"
        >
          <CalendarCheck aria-hidden="true" className="h-5 w-5" />
          <span className="text-[10px] uppercase tracking-widgold font-semibold">
            Book
          </span>
        </Link>
      </div>
    </div>
  );
}
