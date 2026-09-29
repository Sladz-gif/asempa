import type { Metadata } from "next";
import { FIRM } from "@/lib/config";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";

export const metadata: Metadata = {
  title: "Disclaimer · Important Legal Information",
  description: `Disclaimer for ${FIRM.name}. Important information about the use of this website and limitations of liability.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Disclaimer
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Important information about the use of this website.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-warm-paper py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-stone max-w-none">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <p className="text-red-900 font-semibold mb-2">
                  IMPORTANT NOTICE
                </p>
                <p className="text-red-800">
                  Please read this disclaimer carefully before using this website.
                </p>
              </div>

              <h2>1. No Lawyer-Client Relationship</h2>
              <p>
                <strong>This is critical:</strong> Use of this website, submission of information through our contact forms, or communication with our AI chat assistant does NOT create a lawyer-client relationship or legal professional privilege. A lawyer-client relationship is created only when both you and a partner of {FIRM.name} sign a written engagement letter.
              </p>

              <h2>2. No Legal Advice</h2>
              <p>
                The content on this website is for general information purposes only and does NOT constitute legal advice. You should not rely on any information on this website as a substitute for professional legal advice from a qualified lawyer licensed to practice in Ghana.
              </p>

              <h2>3. Do Not Share Confidential Information</h2>
              <p>
                Do NOT share confidential, sensitive, or case-specific information through this website, contact forms, or chat assistant. These channels are not secure for confidential communications. For confidential matters, please contact us directly by phone or schedule an in-person consultation.
              </p>

              <h2>4. No Guarantees or Warranties</h2>
              <p>
                While we strive to provide accurate and up-to-date information, we make no guarantees or warranties, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information on this website.
              </p>

              <h2>5. Testimonials and Results</h2>
              <p>
                Testimonials and case results displayed on this website are for informational purposes only. Past results do not guarantee similar outcomes in future matters. Each case is unique and depends on its specific facts and circumstances. All testimonials and results claims must be verified against the rules of the General Legal Council regarding lawyer advertising.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, {FIRM.name}, its partners, employees, and agents shall not be liable for any loss, damage, or injury arising from:
              </p>
              <ul>
                <li>Reliance on information contained on this website</li>
                <li>Any errors or omissions in the content</li>
                <li>Any unavailability of the website</li>
                <li>Any misuse of information provided on this website</li>
              </ul>

              <h2>7. Professional Advice Required</h2>
              <p>
                For any legal matter, you should seek professional legal advice from a qualified lawyer. Do not delay seeking legal advice based on information on this website.
              </p>

              <h2>8. Ghana Law Applies</h2>
              <p>
                This website is intended for users in Ghana and is governed by the laws of the Republic of Ghana. Information on this website may not be appropriate or applicable in other jurisdictions.
              </p>

              <h2>9. Changes to Disclaimer</h2>
              <p>
                We reserve the right to modify this disclaimer at any time. Your continued use of the website after changes constitutes acceptance of the revised disclaimer.
              </p>

              <h2>10. Contact for Legal Advice</h2>
              <p>
                If you require legal advice, please contact us to schedule a consultation:
              </p>
              <ul>
                <li>Email: {FIRM.email}</li>
                <li>Phone: {FIRM.phone}</li>
                <li>Address: {FIRM.address}</li>
              </ul>

              <div className="bg-stone-100 p-6 rounded-lg border border-stone-300 mt-8">
                <p className="text-sm text-stone-700">
                  <strong>Advertisement Compliance:</strong> All testimonials, results, and advertising claims on this website must be reviewed and verified against the General Legal Council rules on lawyer advertising in Ghana. The firm is responsible for ensuring compliance with these rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Disclaimer", url: "/disclaimer" },
        ]}
      />
    </>
  );
}
