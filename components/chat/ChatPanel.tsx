"use client";

import React, { useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useChatStore } from "./chatStore";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { FIRM } from "@/lib/config";
import { chatService } from "@/lib/services/chat";
import type { ChatMessage } from "@/types";

const SUGGESTED = [
  "What areas of law do you cover?",
  "How do I book a consultation?",
  "Where is your office and what are your hours?",
  "What documents should I bring to a first consultation?",
  "Do you offer fixed fees for property transactions?",
  "What is the consultation fee?",
];

function SuggestedChips() {
  const messages = useChatStore((s) => s.messages);
  const isAwaitingResponse = useChatStore((s) => s.isAwaitingResponse);
  const pushUserMessage = useChatStore((s) => s.pushUserMessage);
  const beginAssistantStreaming = useChatStore((s) => s.beginAssistantStreaming);
  const appendAssistantChunk = useChatStore((s) => s.appendAssistantChunk);
  const finalizeAssistantMessage = useChatStore((s) => s.finalizeAssistantMessage);
  const setAwaitingResponse = useChatStore((s) => s.setAwaitingResponse);

  if (messages.length > 2 || isAwaitingResponse) return null;

  const pick = async (label: string) => {
    if (isAwaitingResponse) return;
    const history = messages;
    const userMsg: ChatMessage = pushUserMessage(label);
    const assistantId = `asst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    beginAssistantStreaming(assistantId);
    try {
      const stream = chatService.sendMessage([...history, userMsg]);
      let lastActions: any = undefined;
      for await (const evt of stream) {
        if (evt.kind === "chunk") appendAssistantChunk(assistantId, evt.text);
        else if (evt.kind === "done") lastActions = evt.actions;
      }
      finalizeAssistantMessage(assistantId, lastActions);
    } catch (err: any) {
      appendAssistantChunk(
        assistantId,
        `[Error: ${err?.message || "Something went wrong."}]`
      );
      finalizeAssistantMessage(assistantId);
    } finally {
      setAwaitingResponse(false);
    }
  };

  return (
    <div className="px-3 sm:px-4 md:px-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {SUGGESTED.slice(0, 6).map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => void pick(label)}
          disabled={isAwaitingResponse}
          className="text-left rounded-lg border border-gray-200 bg-white px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs text-warm-muted hover:text-gold hover:border-gold/50 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed leading-snug"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function ChatPanel() {
  const isOpen = useChatStore((s) => s.isOpen);
  const setOpen = useChatStore((s) => s.setOpen);
  const clearChat = useChatStore((s) => s.clearChat);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, setOpen]);

  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label={FIRM.name + " chat assistant"}
      aria-hidden={!isOpen}
      className={cn(
        "z-40 transition-all duration-300",
        // Desktop: docked panel
        "hidden md:block",
        "fixed right-5 bottom-24 origin-bottom-right",
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "w-[340px] sm:w-[390px] h-[550px] sm:h-[600px] max-h-[80vh] flex flex-col",
          "rounded-2xl border border-gold/25 bg-white shadow-gold-lg overflow-hidden"
        )}
      >
        <ChatHeader onClose={() => setOpen(false)} onClear={clearChat} />
        <ChatMessageList />
        <SuggestedChips />
        <ChatInput />
      </div>
    </div>
  );
}

// Mobile sheet version
export function ChatMobileSheet() {
  const isOpen = useChatStore((s) => s.isOpen);
  const setOpen = useChatStore((s) => s.setOpen);
  const clearChat = useChatStore((s) => s.clearChat);
  return (
    <div
      className={cn(
        "md:hidden fixed inset-0 z-40 transition-all duration-300",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black-900/30 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={FIRM.name + " chat assistant"}
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[85vh] sm:h-[90vh] md:h-[92vh] flex flex-col rounded-t-3xl border-t border-gold/25 bg-white shadow-gold-lg overflow-hidden",
          "transition-transform duration-300",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-center pt-2 pb-1" aria-hidden="true">
          <span className="h-1 w-12 rounded-full bg-gold/40" />
        </div>
        <ChatHeader onClose={() => setOpen(false)} onClear={clearChat} />
        <ChatMessageList />
        <SuggestedChips />
        <ChatInput />
      </div>
    </div>
  );
}

function ChatHeader({
  onClose,
  onClear,
}: {
  onClose: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-full bg-gold grid place-items-center text-[10px] sm:text-[11px] font-bold text-black-900 shadow-gold">
          AI
        </div>
        <div className="min-w-0">
          <p className="font-serif text-xs sm:text-sm md:text-base text-warm-text leading-tight truncate">
            {FIRM.shortName.replace(/[[\]]/g, "")} Assistant
          </p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widgold text-gold">
            Online · General info only
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Clear chat conversation"
          onClick={onClear}
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-md text-warm-muted hover:text-gold hover:bg-gray-100 inline-flex items-center justify-center transition-colors"
        >
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <button
          type="button"
          aria-label="Close chat assistant"
          onClick={onClose}
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-md text-warm-muted hover:text-gold hover:bg-gray-100 inline-flex items-center justify-center transition-colors"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
}
