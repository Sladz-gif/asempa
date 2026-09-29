import type { Metadata } from "next";
import { FIRM } from "@/lib/config";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";

export const metadata: Metadata = {
  title: "Terms of Service · Website Use and Legal Disclaimers",
  description: `Terms of service for ${FIRM.name}. Terms governing the use of our website and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Terms of Service
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Terms governing the use of our website and services.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-warm-paper py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-stone max-w-none">
              <p className="text-sm text-stone-600 mb-8">
                Last updated: [DATE] · These terms should be reviewed by a qualified lawyer.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website of {FIRM.name}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>

              <h2>2. No Lawyer-Client Relationship</h2>
              <p>
                <strong>Important:</strong> Use of this website, submission of information through our contact forms, or communication with our AI chat assistant does NOT create a lawyer-client relationship or legal professional privilege. A lawyer-client relationship is created only when both you and a partner of the firm sign a written engagement letter.
              </p>

              <h2>3. Information Disclaimer</h2>
              <p>
                The content on this website is for general information purposes only and does not constitute legal advice. You should not rely on this information as a substitute for professional legal advice. We disclaim all liability for actions taken or not taken based on the content of this website.
              </p>

              <h2>4. Confidentiality</h2>
              <p>
                Do not share confidential or sensitive information through this website, contact forms, or chat assistant. These channels are not secure for confidential communications. For confidential matters, please contact us directly by phone or schedule an in-person consultation.
              </p>

              <h2>5. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of {FIRM.name} or its licensors and is protected by copyright and other intellectual property laws.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, {FIRM.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website.
              </p>

              <h2>7. Website Availability</h2>
              <p>
                We do not guarantee that this website will be available at all times. We may suspend, withdraw, or restrict the availability of the website at any time without notice.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. We are not responsible for the content or practices of third-party websites. Your use of third-party websites is governed by their terms and conditions.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms of Service are governed by the laws of the Republic of Ghana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Your continued use of the website after changes constitutes acceptance of the revised terms.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                For questions about these Terms of Service, please contact us at {FIRM.email}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
      />
    </>
  );
}
