const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactSubmitResult {
  success: true;
  ticket: string;
}

export interface ContactService {
  submit(submission: ContactSubmission): Promise<ContactSubmitResult>;
}

export const MockContactService: ContactService = {
  async submit(_submission) {
    await delay(800 + Math.floor(Math.random() * 500));
    const shouldFail = Math.random() < 0.1;
    if (shouldFail) {
      const err = new Error("[Mock contact submission failed. Please retry or call us directly.]");
      (err as any).code = "CONTACT_MOCK_FAILURE";
      throw err;
    }
    const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
    return { success: true, ticket: `CNT-${day}-${suffix}` };
  },
};

/**
 * FUTURE HttpContactService stub — DISABLED BY DEFAULT.
 * To connect a real backend (email, CRM, or form handler), replace
 * `MockContactService` with `HttpContactService` and set:
 *   NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-api.example/v1/contact
 */
const NEXT_PUBLIC_CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const _HttpContactService: ContactService = {
  async submit(submission) {
    if (!NEXT_PUBLIC_CONTACT_ENDPOINT) throw new Error("NEXT_PUBLIC_CONTACT_ENDPOINT not set");
    const res = await fetch(NEXT_PUBLIC_CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    if (!res.ok) throw new Error(`Contact submission failed (${res.status})`);
    return res.json();
  },
};

export const contactService: ContactService = MockContactService;
