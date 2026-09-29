export type ChatRole = "user" | "assistant";

export type ChatAction =
  | { type: "book-consultation"; practiceAreaId?: string; attorneyId?: string; label: string }
  | { type: "contact-human"; phone: string; whatsapp: string }
  | { type: "office-info"; address: string; hours: string; mapUrl: string }
  | { type: "link"; href: string; label: string };

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  actions?: ChatAction[];
}

export type ChatStreamEvent =
  | { kind: "chunk"; text: string }
  | { kind: "done"; actions?: ChatAction[] };

export interface ChatService {
  sendMessage(history: ChatMessage[]): AsyncIterable<ChatStreamEvent>;
}
