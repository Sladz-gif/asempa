import type { Metadata } from "next";
import { faqs, generalFAQs, faqsByPracticeArea } from "@/content/faqs";
import { practiceAreas } from "@/content/practice-areas";
import { Accordion } from "@/components/ui/Accordion";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD, FAQPageJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions · Legal Guidance from Accra, Ghana",
  description: `Common questions about ${FIRM.name}'s services, corporate law, dispute resolution, property, family law, employment, and regulatory compliance in Ghana.`,
  alternates: { canonical: "/faq" },
};

export default async function FAQPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Answers to common questions about our services and legal matters in Ghana.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-text mb-8">
            General Questions
          </h2>
          <Accordion
            items={generalFAQs.map((faq) => ({
              id: faq.id,
              question: faq.question.replace(/[[\]]/g, ""),
              answer: faq.answer.replace(/[[\]]/g, ""),
            }))}
          />
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      {practiceAreas.map((practiceArea) => {
        const areaFAQs = faqsByPracticeArea(practiceArea.id);
        if (areaFAQs.length === 0) return null;

        return (
          <div key={practiceArea.id} className="bg-white py-section">
            <div className="container-page mx-auto px-6 md:px-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-text mb-8">
                {practiceArea.name.replace(/[[\]]/g, "")}
              </h2>
              <Accordion
                items={areaFAQs.map((faq) => ({
                  id: faq.id,
                  question: faq.question.replace(/[[\]]/g, ""),
                  answer: faq.answer.replace(/[[\]]/g, ""),
                }))}
              />
            </div>
          </div>
        );
      })}

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="bg-white p-6 md:p-8 border border-gray-200">
            <h3 className="font-serif text-xl font-semibold text-warm-text mb-4">
              Still have questions?
            </h3>
            <p className="text-warm-muted mb-6">
              If you don&apos;t find the answer you&apos;re looking for, please book a consultation or contact our office directly.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/book"
                className="px-6 py-3 bg-gold text-black-900 font-medium rounded-sm hover:bg-gold-hl transition-colors"
              >
                Book a Consultation
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border border-gold text-gold font-medium rounded-sm hover:bg-gold/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />
      <FAQPageJSONLD items={faqs} />
    </>
  );
}
