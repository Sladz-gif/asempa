"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useChatStore } from "./chatStore";
import { chatService } from "@/lib/services/chat";

const CHAR_LIMIT = 500;

export function ChatInput() {
  const [text, setText] = useState("");
  const pushUserMessage = useChatStore((s) => s.pushUserMessage);
  const beginAssistantStreaming = useChatStore((s) => s.beginAssistantStreaming);
  const appendAssistantChunk = useChatStore((s) => s.appendAssistantChunk);
  const finalizeAssistantMessage = useChatStore((s) => s.finalizeAssistantMessage);
  const setAwaitingResponse = useChatStore((s) => s.setAwaitingResponse);
  const awaitingResponse = useChatStore((s) => s.isAwaitingResponse);
  const messages = useChatStore((s) => s.messages);

  const disabled = awaitingResponse || text.trim().length === 0;

  const send = async () => {
    const trimmed = text.trim();
    if (disabled || !trimmed) return;
    setText("");
    const userMsg = pushUserMessage(trimmed);
    const assistantId = `asst-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    beginAssistantStreaming(assistantId);
    try {
      const stream = chatService.sendMessage([...messages, userMsg]);
      let lastActions: any = undefined;
      for await (const evt of stream) {
        if (evt.kind === "chunk") {
          appendAssistantChunk(assistantId, evt.text);
        } else if (evt.kind === "done") {
          lastActions = evt.actions;
        }
      }
      finalizeAssistantMessage(assistantId, lastActions);
    } catch (err: any) {
      appendAssistantChunk(
        assistantId,
        `[Error: ${err?.message || "Something went wrong while contacting the assistant."}]`
      );
      finalizeAssistantMessage(assistantId);
    } finally {
      setAwaitingResponse(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
      className="border-t border-gray-200 bg-gray-50 p-2.5 sm:p-3 md:p-4"
    >
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, CHAR_LIMIT))}
          onKeyDown={onKey}
          rows={2}
          placeholder="Ask about our practice areas, attorneys, or how to book a consultation…"
          aria-label="Type your message"
          aria-describedby="chat-char-count"
          disabled={awaitingResponse}
          className={cn(
            "w-full resize-none rounded-xl border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 pr-12 sm:pr-14 text-xs sm:text-sm text-warm-text placeholder:text-warm-muted/70",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 focus:ring-offset-2 focus:ring-offset-white",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
        />
        <button
          type="submit"
          disabled={disabled}
          aria-label="Send message"
          className={cn(
            "absolute right-2 sm:right-2.5 bottom-2 sm:bottom-2.5 h-8 w-8 sm:h-9 sm:w-9 rounded-md inline-flex items-center justify-center transition-all",
            "bg-gold text-black-900 shadow-gold hover:brightness-105",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <Send aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-widgold text-warm-muted">
        <span className="hidden sm:inline">
          <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5">Enter</kbd> to send ·{" "}
          <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5">Shift+Enter</kbd> for new line
        </span>
        <span className="sm:hidden">Tap send to submit</span>
        <span id="chat-char-count">
          {text.length} / {CHAR_LIMIT}
        </span>
      </div>
    </form>
  );
}
