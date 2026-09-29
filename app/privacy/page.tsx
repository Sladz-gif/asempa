import type { Metadata } from "next";
import { FIRM } from "@/lib/config";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";

export const metadata: Metadata = {
  title: "Privacy Policy · How We Handle Your Information",
  description: `Privacy policy for ${FIRM.name}. Learn how we collect, use, and protect your personal information in accordance with Ghana's Data Protection Act, 2012 (Act 843).`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-warm-paper py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-stone max-w-none">
              <p className="text-sm text-stone-600 mb-8">
                Last updated: [DATE] · This policy should be reviewed and confirmed by a Ghanaian lawyer against the Data Protection Act, 2012 (Act 843).
              </p>

              <h2>1. Introduction</h2>
              <p>
                {FIRM.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please note that this is a template and must be reviewed by a qualified Ghanaian lawyer to ensure compliance with the Data Protection Act, 2012 (Act 843).
              </p>

              <h2>2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when booking a consultation or contacting us.</li>
                <li><strong>Consultation Information:</strong> Details about your legal matter, subject to the disclaimer that you should not share confidential information through this website.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data collected through cookies and similar technologies.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul>
                <li>To respond to your enquiries and provide requested services</li>
                <li>To schedule and manage consultations</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
                <li>To communicate with you about our services (with your consent)</li>
              </ul>

              <h2>4. Data Sharing and Disclosure</h2>
              <p>We do not sell your personal information. We may share your information only:</p>
              <ul>
                <li>With service providers who assist us in operating our website (e.g., hosting providers)</li>
                <li>When required by law or court order</li>
                <li>To protect our rights, property, or safety</li>
                <li>With your explicit consent</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

              <h2>6. Your Rights Under Act 843</h2>
              <p>Under Ghana&apos;s Data Protection Act, 2012 (Act 843), you may have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>We use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. See our Cookie Notice for more details.</p>

              <h2>8. International Data Transfers</h2>
              <p>Your information is primarily processed in Ghana. If we transfer data outside Ghana, we will ensure appropriate safeguards are in place in accordance with Act 843.</p>

              <h2>9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website.</p>

              <h2>10. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or your personal information, please contact us at:</p>
              <ul>
                <li>Email: {FIRM.email}</li>
                <li>Phone: {FIRM.phone}</li>
                <li>Address: {FIRM.address}</li>
              </ul>

              <div className="bg-stone-100 p-6 rounded-lg border border-stone-300 mt-8">
                <p className="text-sm text-stone-700">
                  <strong>Disclaimer:</strong> This privacy policy is a template and must be reviewed and customised by a qualified Ghanaian lawyer to ensure full compliance with the Data Protection Act, 2012 (Act 843) and any applicable regulations. {FIRM.name} accepts no liability for any issues arising from the use of this template without proper legal review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />
    </>
  );
}
