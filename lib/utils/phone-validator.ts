const GH_MOBILE = /^\+233[ -]?(2[0346-9]|5[0-9]|55\d?|5[4-9])[ -]?\d{3}[ -]?\d{3,4}$/;
const GH_LOCAL = /^0[ -]?(2[0346-9]|5[0-9]|55\d?|5[4-9])[ -]?\d{3}[ -]?\d{3,4}$/;
const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function normaliseGhanaPhone(raw: string): { phone: string; valid: boolean } {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+233")) {
    return { phone: digits, valid: GH_MOBILE.test(digits) };
  }
  if (digits.startsWith("233")) {
    return { phone: `+${digits}`, valid: GH_MOBILE.test(`+${digits}`) };
  }
  if (digits.startsWith("0")) {
    const intl = "+233" + digits.slice(1);
    return { phone: intl, valid: GH_MOBILE.test(intl) };
  }
  return { phone: digits, valid: false };
}

export function isValidGhanaPhone(raw: string): boolean {
  const v = normaliseGhanaPhone(raw);
  if (v.valid) return true;
  return GH_LOCAL.test(raw.replace(/[^\d]/g, "").padStart(10, "0").slice(0, 10));
}

export function formatGhanaPhone(raw: string): string {
  const { phone } = normaliseGhanaPhone(raw);
  if (!phone) return raw;
  const m = phone.match(/^(\+233)(\d{2,3})(\d{3})(\d{3,4})$/);
  if (!m) return raw;
  return `${m[1]} ${m[2]} ${m[3]} ${m[4]}`;
}

export function isValidEmail(raw: string): boolean {
  return EMAIL.test(raw);
}
