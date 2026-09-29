"use client";

import React, { useEffect, useRef } from "react";
import type { ChatMessage } from "@/types";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useChatStore } from "./chatStore";
import { ChatRichCards } from "./ChatRichCards";

function formatTime(d: Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (!date || isNaN(date.getTime())) return "";
  let hh = date.getHours();
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = ((hh + 11) % 12) + 1;
  return `${hh}:${mm} ${ampm}`;
}

function Bubble({ message, isStreaming }: { message: ChatMessage; isStreaming: boolean }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    if (isUser || !message.content) return;
    navigator.clipboard?.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className={cn("flex gap-2 sm:gap-3 w-full", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="mt-0.5 h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-gold grid place-items-center text-[10px] sm:text-[11px] font-bold text-black-900 shadow-gold">
          AI
        </div>
      )}
      <div
        className={cn(
          "max-w-[82%] sm:max-w-[86%] rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-gold/90 border border-gold/30 text-black-900 rounded-br-sm"
            : "bg-gray-50 border border-gray-200 rounded-bl-sm"
        )}
      >
        <div className={isUser ? "" : "text-warm-text whitespace-pre-wrap"}>
          {message.content ||
            (isStreaming ? (
              <span className="inline-flex items-center gap-1 text-warm-muted">
                <span className="h-2 w-2 rounded-full bg-gold animate-typing-bounce" />
                <span
                  className="h-2 w-2 rounded-full bg-gold animate-typing-bounce"
                  style={{ animationDelay: "120ms" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-gold animate-typing-bounce"
                  style={{ animationDelay: "240ms" }}
                />
              </span>
            ) : null)}
        </div>
        {!isUser && (
          <div className="mt-2 flex items-center justify-between gap-2 sm:gap-4">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widgold text-warm-muted" suppressHydrationWarning>
              {formatTime(message.timestamp)}
            </span>
            <button
              type="button"
              onClick={copy}
              aria-label={copied ? "Copied" : "Copy assistant message"}
              className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-widgold text-warm-muted hover:text-gold transition-colors"
              disabled={!message.content}
            >
              {copied ? (
                <>
                  <Check aria-hidden="true" className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Copied
                </>
              ) : (
                <>
                  <Copy aria-hidden="true" className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Copy
                </>
              )}
            </button>
          </div>
        )}
        {!isUser && message.actions && message.actions.length > 0 && !isStreaming && (
          <ChatRichCards actions={message.actions} />
        )}
      </div>
      {isUser && <div className="w-7 sm:w-8 shrink-0" aria-hidden="true" />}
    </div>
  );
}

export function ChatMessageList() {
  const messages = useChatStore((s) => s.messages);
  const pendingId = useChatStore((s) => s.streamingMessageId);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollReq = useChatStore((s) => s._scrollReq);
  const markScrollConsumed = useChatStore((s) => s.markScrollConsumed);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      if (scrollReq > 0) markScrollConsumed();
    }
  }, [messages, pendingId, scrollReq, markScrollConsumed]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-thin-gold px-3 sm:px-4 md:px-5 py-4 sm:py-5 space-y-3 sm:space-y-4"
      role="log"
      aria-live="polite"
      aria-label="Chat conversation"
    >
      <div className="mb-4 sm:mb-6 rounded-lg border border-gold/20 bg-gray-50 px-2.5 sm:px-3 py-2 text-[10px] sm:text-[11px] text-warm-muted leading-relaxed">
        This assistant provides general information about our firm and services, not legal advice.
        Do not share confidential details.
      </div>
      {messages.map((m) => (
        <Bubble key={m.id} message={m} isStreaming={m.id === pendingId && !m.content} />
      ))}
      {pendingId && (
        <div className="text-[9px] sm:text-[10px] uppercase tracking-widgold text-warm-muted pl-9 sm:pl-11">
          Assistant is typing…
        </div>
      )}
    </div>
  );
}
