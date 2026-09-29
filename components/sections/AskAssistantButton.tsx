"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useChatStore } from "@/components/chat/chatStore";

export function AskAssistantButton() {
  const openChat = useChatStore((s) => s.setOpen);
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => openChat(true)}
      leftIcon={<MessageCircle aria-hidden="true" className="h-4 w-4" />}
      className="text-white hover:text-black-900 border-white/70 border-[1.5px] hover:border-gold"
    >
      Ask our assistant
    </Button>
  );
}
