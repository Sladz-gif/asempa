"use client";

import { useState } from "react";
import { contactService } from "@/lib/services/contact";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; ticket?: string; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await contactService.submit(formData);
      setSubmitResult({ success: true, ticket: result.ticket });
      setFormData({ fullName: "", email: "", phone: "", message: "" });
    } catch (err) {
      setSubmitResult({
        success: false,
        error: err instanceof Error ? err.message : "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-warm-text mb-4 sm:mb-6">
        Send us a message
      </h2>

      {submitResult?.success ? (
        <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-0.5" />
            <div>
              <p className="text-green-300 font-semibold mb-1 text-sm sm:text-base">Message sent successfully</p>
              <p className="text-green-200 text-xs sm:text-sm">
                Your reference number is <span className="font-mono">{submitResult.ticket}</span>.
                We&apos;ll get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      ) : submitResult?.error ? (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="text-red-300 font-semibold mb-1 text-sm sm:text-base">Error</p>
          <p className="text-red-200 text-xs sm:text-sm">{submitResult.error}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-warm-text mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-sm text-warm-text placeholder-warm-muted/50 focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-xs sm:text-sm"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-warm-text mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-sm text-warm-text placeholder-warm-muted/50 focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-xs sm:text-sm"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-warm-text mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-sm text-warm-text placeholder-warm-muted/50 focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-xs sm:text-sm"
            placeholder="+233 XX XXX XXXX"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-warm-text mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-sm text-warm-text placeholder-warm-muted/50 focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none text-xs sm:text-sm"
            placeholder="How can we help you?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gold text-black-900 font-medium rounded-sm hover:bg-gold-hl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </>
  );
}
