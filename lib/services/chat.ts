import type {
  ChatService,
  ChatMessage,
  ChatStreamEvent,
  ChatAction,
} from "@/types";
import { FIRM } from "@/lib/config";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { faqs, generalFAQs } from "@/content/faqs";

const URGENT_KEYWORDS = [
  "arrest", "detained", "detention", "police station", "bail",
  "injunction", "urgent", "today", "tonight", "right now", "custody",
  "raid", "seized", "immediate", "emergency",
];

const LEGAL_ADVICE_KEYWORDS = [
  "do i have a case", "merits of my case", "what are my chances",
  "can i sue", "how much compensation", "how much is my case worth",
  "what should i do", "legal advice", "advise me on my case",
  "deadline", "limitation period", "statute of limitations",
  "can you tell me the fee", "how much will this cost",
];

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function detectKeywords(text: string, keywords: string[]): boolean {
  const t = text.toLowerCase();
  return keywords.some((k) => t.includes(k.toLowerCase()));
}

function stripActions(m: ChatMessage): { role: "user" | "assistant"; content: string } {
  return { role: m.role, content: m.content };
}

function findFAQMatch(text: string): { question: string; answer: string } | null {
  const t = text.toLowerCase();
  const all = [...faqs, ...generalFAQs];
  for (const f of all) {
    const qTokens = f.question.toLowerCase().replace(/[[\]?]/g, "").split(/\s+/).filter((x) => x.length > 3);
    const hits = qTokens.filter((tok) => t.includes(tok)).length;
    if (hits >= 2) return { question: f.question, answer: f.answer };
  }
  return null;
}

function findPracticeArea(text: string): (typeof practiceAreas)[number] | null {
  const t = text.toLowerCase();
  for (const pa of practiceAreas) {
    const nameTokens = pa.name.toLowerCase().replace(/[[\]&,]/g, "").split(/\s+/).filter((s) => s.length > 3);
    if (nameTokens.some((tok) => t.includes(tok))) return pa;
    if (t.includes(pa.slug)) return pa;
  }
  return null;
}

function findAttorney(text: string): (typeof attorneys)[number] | null {
  const t = text.toLowerCase();
  for (const a of attorneys) {
    if (a.fullName.toLowerCase().split(/\s+/).filter((s) => s.length > 2).some((tok) => t.includes(tok.replace(/[\[\]]/g, "")))) {
      return a;
    }
    if (t.includes(a.slug)) return a;
  }
  return null;
}

function buildBookAction(practiceAreaId?: string, attorneyId?: string): ChatAction {
  let label = "Book a consultation";
  if (practiceAreaId) {
    const pa = practiceAreas.find((p) => p.id === practiceAreaId);
    if (pa) label = `Book ${pa.name.replace(/[[\]]/g, "")} consultation`;
  }
  if (attorneyId) {
    const a = attorneys.find((x) => x.id === attorneyId);
    if (a) label = `Book with ${a.fullName.replace(/[[\]]/g, "")}`;
  }
  return { type: "book-consultation", practiceAreaId, attorneyId, label };
}

function contactHumanAction(): ChatAction {
  return {
    type: "contact-human",
    phone: FIRM.phone,
    whatsapp: FIRM.whatsapp,
  };
}

function officeInfoAction(): ChatAction {
  return {
    type: "office-info",
    address: FIRM.address,
    hours: `${FIRM.hours.weekday}; ${FIRM.hours.saturday}; ${FIRM.hours.sunday}.`,
    mapUrl: "/contact",
  };
}

async function* mockStream(
  fullText: string,
  actions?: ChatAction[]
): AsyncGenerator<ChatStreamEvent, void, unknown> {
  const tokens = fullText.split(/(\s+)/).filter((t) => t.length > 0);
  for (let i = 0; i < tokens.length; i++) {
    await delay(5 + Math.random() * 10);
    yield { kind: "chunk", text: i === 0 ? tokens[i] : " " + tokens[i] };
  }
  yield { kind: "done", actions };
}

const DISCLAIMER_PREFIX =
  "This assistant provides general information about our firm and services, not legal advice. Do not share confidential details. ";

export const MockChatService: ChatService = {
  async *sendMessage(history: ChatMessage[]): AsyncIterable<ChatStreamEvent> {
    const last = history[history.length - 1];
    if (!last || last.role !== "user") {
      return yield* mockStream(DISCLAIMER_PREFIX + "[How may I help you with information about our firm today?]");
    }
    const userText = last.content;

    if (detectKeywords(userText, URGENT_KEYWORDS)) {
      const text =
        DISCLAIMER_PREFIX +
        "[For urgent matters — including arrest, detention, or active court proceedings — please call our office immediately or reach us on WhatsApp. For time-sensitive court hearings, we do not provide advice over this channel.]";
      return yield* mockStream(text, [contactHumanAction(), buildBookAction()]);
    }

    if (detectKeywords(userText, LEGAL_ADVICE_KEYWORDS)) {
      const text =
        DISCLAIMER_PREFIX +
        "[I'm unable to provide legal advice, case assessments, fee estimates beyond our published consultation fee, or deadline opinions. To protect yourself, do not share any confidential or case-specific details here. The best next step is to book a consultation with one of our attorneys, or speak directly with a member of the team.]";
      return yield* mockStream(text, [buildBookAction(), contactHumanAction()]);
    }

    if (/book|booking|consult|consultation|appointment|schedule/.test(userText.toLowerCase())) {
      const pa = findPracticeArea(userText);
      const at = findAttorney(userText);
      const text =
        DISCLAIMER_PREFIX +
        `[Of course. You can book a consultation online in about two minutes.${pa ? ` I've noted an interest in ${pa.name.replace(/[[\]]/g, "")}.` : ""}${at ? ` I've noted an interest in meeting with ${at.fullName.replace(/[[\]]/g, "")}.` : ""} Please use the card below to get started — any information you select here will be pre-filled.]`;
      return yield* mockStream(text, [buildBookAction(pa?.id, at?.id)]);
    }

    if (/price|fee|cost|charge|rate/.test(userText.toLowerCase())) {
      const text =
        DISCLAIMER_PREFIX +
        `[Our published initial consultation fee is ₵${FIRM.consultationFeeGHS.toLocaleString("en-GH")} Ghana Cedi for up to 60 minutes. Fees for ongoing matters are scoped and confirmed in writing after that first meeting, and never through this assistant. You can book an initial consultation using the card below.]`;
      return yield* mockStream(text, [buildBookAction()]);
    }

    if (/location|office|address|directions|map|where/.test(userText.toLowerCase())) {
      const text =
        DISCLAIMER_PREFIX +
        `[Our Accra head office is at ${FIRM.address}. Our hours are ${FIRM.hours.weekday}, ${FIRM.hours.saturday}, and ${FIRM.hours.sunday}. You can reach us on ${FIRM.phone} or via WhatsApp on ${FIRM.whatsapp}.]`;
      return yield* mockStream(text, [officeInfoAction(), contactHumanAction()]);
    }

    if (/hour|open|close|working day|time/.test(userText.toLowerCase())) {
      const text =
        DISCLAIMER_PREFIX +
        `[Our office hours: ${FIRM.hours.weekday}; ${FIRM.hours.saturday}; ${FIRM.hours.sunday}. Consultations outside these hours may be arranged in writing on a case-by-case basis.]`;
      return yield* mockStream(text, [officeInfoAction(), buildBookAction()]);
    }

    if (/phone|call me|contact|whatsapp|reach|speak to|talk to a person|human|lawyer/.test(userText.toLowerCase())) {
      const text =
        DISCLAIMER_PREFIX +
        "[You can speak directly with our team during business hours by calling or messaging us on WhatsApp. We will respond as quickly as possible.]";
      return yield* mockStream(text, [contactHumanAction(), buildBookAction()]);
    }

    if (/practice area|service|what do you do|areas of law|cover/.test(userText.toLowerCase())) {
      const list = practiceAreas
        .map((pa, i) => `${i + 1}. ${pa.name.replace(/[[\]]/g, "")}`)
        .join("\n");
      const text =
        DISCLAIMER_PREFIX +
        `[Our firm practices across the following areas:\n${list}\n\nI can share more detail on any of these, or you can browse the Practice Areas section of the website.]`;
      const firstThreeLinks: ChatAction[] = practiceAreas.slice(0, 3).map((pa) => ({
        type: "link",
        href: `/practice-areas/${pa.slug}`,
        label: pa.name.replace(/[[\]]/g, ""),
      }));
      return yield* mockStream(text, firstThreeLinks);
    }

    if (/attorney|lawyer|solicitor|barrister|team|who/.test(userText.toLowerCase())) {
      const at = findAttorney(userText);
      if (at) {
        const paList = at.practiceAreaIds
          .map((id) => practiceAreas.find((p) => p.id === id)?.name.replace(/[[\]]/g, ""))
          .filter(Boolean)
          .join(", ");
        const text =
          DISCLAIMER_PREFIX +
          `[${at.fullName.replace(/[[\]]/g, "")} is ${at.title.replace(/[[\]]/g, "")}, called to the Ghana Bar in ${at.ghanaBarAdmissionYear}. [He / She] practices in: ${paList}. You can read [his / her] full profile or book a consultation directly.]`;
        return yield* mockStream(text, [
          { type: "link", href: `/attorneys/${at.slug}`, label: `View ${at.fullName.replace(/[[\]]/g, "")} profile` },
          buildBookAction(undefined, at.id),
        ]);
      }
      const names = attorneys
        .slice(0, 4)
        .map((a) => `${a.fullName.replace(/[[\]]/g, "")} (${a.title.replace(/[[\]]/g, "")})`)
        .join(", ");
      const text =
        DISCLAIMER_PREFIX +
        `[Our team includes: ${names}. You can view full profiles on the Attorneys page of the website, or I can book you with any available attorney using the card below.]`;
      return yield* mockStream(text, [
        { type: "link", href: "/attorneys", label: "Meet all attorneys" },
        buildBookAction(),
      ]);
    }

    const faqMatch = findFAQMatch(userText);
    if (faqMatch) {
      const text =
        DISCLAIMER_PREFIX +
        `[I found a frequently-asked question that matches your enquiry:\n\nQ: ${faqMatch.question.replace(/[[\]]/g, "")}\n\nA: ${faqMatch.answer.replace(/[[\]]/g, "")}\n\nIf you would like personalised advice beyond this general answer, please book a consultation.]`;
      return yield* mockStream(text, [buildBookAction()]);
    }

    const text =
      DISCLAIMER_PREFIX +
      "[Thank you for your message. Based on what you've shared, the most useful next step is either to (1) browse our Practice Areas and Attorneys pages on the website, (2) book an initial consultation, or (3) call our office during business hours. I cannot provide legal or case-specific advice through this channel.]";
    return yield* mockStream(text, [buildBookAction(), contactHumanAction()]);
  },
};

/**
 * FUTURE HttpChatService stub — DISABLED BY DEFAULT.
 * To connect a real AI backend, replace `MockChatService` with
 * `HttpChatService` and ensure the following env var is set:
 *   NEXT_PUBLIC_CHAT_ENDPOINT=https://your-gateway.example/v1/chat
 *
 * NEVER embed API keys or secrets in the frontend. The endpoint above
 * MUST be a server-side gateway that authenticates, rate-limits, and
 * applies guardrails before calling your model provider.
 */
const NEXT_PUBLIC_CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_ENDPOINT;
async function* _sseIterable(response: Response): AsyncIterable<ChatStreamEvent> {
  const reader = response.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let buf = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || !line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (data === "[DONE]") {
          yield { kind: "done" };
          return;
        }
        try {
          const parsed = JSON.parse(data);
          if (typeof parsed?.text === "string") yield { kind: "chunk", text: parsed.text };
          if (parsed?.done === true) yield { kind: "done", actions: parsed.actions };
        } catch {
          // ignore malformed frames
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
const _HttpChatService: ChatService = {
  async *sendMessage(history) {
    if (!NEXT_PUBLIC_CHAT_ENDPOINT) throw new Error("NEXT_PUBLIC_CHAT_ENDPOINT not set");
    const res = await fetch(NEXT_PUBLIC_CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
      body: JSON.stringify({ messages: history.map(stripActions) }),
    });
    if (!res.ok) throw new Error(`Chat request failed (${res.status})`);
    if (!res.body) {
      yield { kind: "chunk", text: "[Empty response from chat endpoint.]" };
      yield { kind: "done" };
      return;
    }
    yield* _sseIterable(res);
  },
};

export const chatService: ChatService = MockChatService;
