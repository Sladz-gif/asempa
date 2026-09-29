"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ChatMessage, ChatAction } from "@/types";

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isAwaitingResponse: boolean;
  lastStreamChunk: string;
  streamingMessageId: string | null;
  actionsForPending: ChatAction[] | null;

  setOpen: (v: boolean) => void;
  toggleOpen: () => void;

  pushUserMessage: (text: string) => ChatMessage;
  appendAssistantChunk: (messageId: string, chunk: string) => void;
  finalizeAssistantMessage: (messageId: string, actions?: ChatAction[]) => void;
  beginAssistantStreaming: (messageId: string) => void;
  setAwaitingResponse: (v: boolean) => void;
  clearChat: () => void;

  scrollToBottomOnNext: () => void;
  _scrollReq: number;
  markScrollConsumed: () => void;
}

const nowISO = () => new Date().toISOString();

const INTRO_MESSAGE_ID = "intro-1";

function buildIntro(): ChatMessage[] {
  return [
    {
      id: INTRO_MESSAGE_ID,
      role: "assistant",
      content:
        "[Hello — welcome to [FIRM NAME]. I'm here to answer general questions about our practice areas, our attorneys, our Accra office, and how to book a consultation. This assistant provides general information about our firm and services, not legal advice. Please do not share confidential or case-specific details. How may I help you today?]",
      timestamp: new Date(),
    },
  ];
}

const STORAGE_KEY = "firm-chat-session-v1";

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      messages: buildIntro(),
      isAwaitingResponse: false,
      lastStreamChunk: "",
      streamingMessageId: null,
      actionsForPending: null,
      _scrollReq: 0,

      setOpen: (v) => set({ isOpen: v }),
      toggleOpen: () => set((s) => ({ isOpen: !s.isOpen })),

      pushUserMessage: (text) => {
        const msg: ChatMessage = {
          id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: "user",
          content: text,
          timestamp: new Date(),
        };
        set((s) => ({ messages: [...s.messages, msg], _scrollReq: s._scrollReq + 1 }));
        return msg;
      },

      beginAssistantStreaming: (messageId) => {
        const msg: ChatMessage = {
          id: messageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };
        set((s) => ({
          messages: [...s.messages, msg],
          streamingMessageId: messageId,
          isAwaitingResponse: true,
          lastStreamChunk: "",
          actionsForPending: null,
          _scrollReq: s._scrollReq + 1,
        }));
      },

      appendAssistantChunk: (messageId, chunk) => {
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === messageId ? { ...m, content: m.content + chunk } : m
          ),
          lastStreamChunk: chunk,
          _scrollReq: s._scrollReq + 1,
        }));
      },

      finalizeAssistantMessage: (messageId, actions) => {
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  content: m.content || "[No response text available.]",
                  actions: actions ?? m.actions,
                }
              : m
          ),
          streamingMessageId: null,
          isAwaitingResponse: false,
          actionsForPending: actions ?? null,
          _scrollReq: s._scrollReq + 1,
        }));
      },

      setAwaitingResponse: (v) => set({ isAwaitingResponse: v }),

      clearChat: () =>
        set({
          messages: buildIntro(),
          isAwaitingResponse: false,
          streamingMessageId: null,
          lastStreamChunk: "",
          actionsForPending: null,
          _scrollReq: 0,
        }),

      scrollToBottomOnNext: () => set((s) => ({ _scrollReq: s._scrollReq + 1 })),
      markScrollConsumed: () => set((s) => ({ _scrollReq: Math.max(0, s._scrollReq - 1) })),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") return undefined as any;
        return {
          getItem: (k) => {
            try {
              const raw = window.sessionStorage.getItem(k);
              if (!raw) return null;
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed?.state?.messages)) {
                parsed.state.messages = parsed.state.messages.map((m: any) => ({
                  ...m,
                  timestamp: new Date(m.timestamp || nowISO()),
                }));
              }
              return parsed;
            } catch {
              return null;
            }
          },
          setItem: (k, v) => {
            // Debounce writes to reduce performance impact
            if (typeof window !== "undefined") {
              requestAnimationFrame(() => {
                window.sessionStorage.setItem(k, JSON.stringify(v));
              });
            }
          },
          removeItem: (k) => window.sessionStorage.removeItem(k),
        };
      }),
      partialize: (s) => ({ messages: s.messages }),
    }
  )
);
