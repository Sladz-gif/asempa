"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useChatStore } from "./chatStore";
import { ChatPanel } from "./ChatPanel";

export function ChatFloatingButton() {
  const isOpen = useChatStore((s) => s.isOpen);
  const toggle = useChatStore((s) => s.toggleOpen);
  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="chat-panel"
        className={cn(
          "fixed z-40 h-14 w-14 md:h-16 md:w-16 rounded-full bg-gold shadow-gold-lg",
          "bottom-20 md:bottom-6 right-4 md:right-6",
          "grid place-items-center text-black-900 hover:brightness-105 hover:scale-[1.03] active:scale-95 transition-all",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        )}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7" />
        ) : (
          <MessageCircle aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7" />
        )}
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-gold shadow-gold ring-2 ring-white animate-pulse"
        />
      </button>
      <ChatPanel />
    </>
  );
}
