import type { Metadata } from "next";
import { FIRM } from "@/lib/config";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";

export const metadata: Metadata = {
  title: "Cookie Notice · How We Use Cookies",
  description: `Cookie notice for ${FIRM.name}. Information about how we use cookies and similar technologies on our website.`,
  alternates: { canonical: "/cookie-notice" },
};

export default function CookieNoticePage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Cookie Notice
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Information about how we use cookies and similar technologies.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-warm-paper py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-stone max-w-none">
              <p className="text-sm text-stone-600 mb-8">
                Last updated: [DATE] · This notice should be reviewed by a qualified lawyer.
              </p>

              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>

              <h2>2. How We Use Cookies</h2>
              <p>We use cookies for the following purposes:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly, such as security and accessibility features.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website by collecting anonymous information about traffic and usage patterns.</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences (e.g., language, region) to provide enhanced features.</li>
              </ul>

              <h2>3. Types of Cookies We Use</h2>
              <ul>
                <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser.</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them.</li>
                <li><strong>First-Party Cookies:</strong> Set by {FIRM.name} directly.</li>
                <li><strong>Third-Party Cookies:</strong> Set by services we use, such as analytics providers.</li>
              </ul>

              <h2>4. Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul>
                <li>View what cookies are stored and delete them</li>
                <li>Block cookies from specific websites</li>
                <li>Block all cookies from being set</li>
                <li>Delete cookies when you close your browser</li>
              </ul>
              <p>
                Please note that blocking essential cookies may affect the functionality of our website.
              </p>

              <h2>5. Third-Party Services</h2>
              <p>
                We may use third-party services that set cookies, including:
              </p>
              <ul>
                <li>Analytics services (e.g., Google Analytics)</li>
                <li>Chat or support services</li>
                <li>Booking and scheduling services</li>
              </ul>
              <p>
                These third parties have their own privacy policies governing the use of cookies.
              </p>

              <h2>6. Updates to This Notice</h2>
              <p>
                We may update this Cookie Notice from time to time. We encourage you to review this notice periodically to stay informed about how we use cookies.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at {FIRM.email}.
              </p>

              <div className="bg-stone-100 p-6 rounded-lg border border-stone-300 mt-8">
                <p className="text-sm text-stone-700">
                  <strong>Disclaimer:</strong> This cookie notice is a template and should be reviewed by a qualified lawyer to ensure compliance with applicable data protection laws, including Ghana&apos;s Data Protection Act, 2012 (Act 843).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Cookie Notice", url: "/cookie-notice" },
        ]}
      />
    </>
  );
}
