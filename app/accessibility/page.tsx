import type { Metadata } from "next";
import { FIRM } from "@/lib/config";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";

export const metadata: Metadata = {
  title: "Accessibility Statement · Our Commitment to Inclusive Design",
  description: `Accessibility statement for ${FIRM.name}. Our commitment to making our website accessible to all users.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Accessibility Statement
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Our commitment to making our website accessible to all users.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-warm-paper py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-stone max-w-none">
              <p className="text-sm text-stone-600 mb-8">
                Last updated: [DATE]
              </p>

              <h2>1. Our Commitment</h2>
              <p>
                {FIRM.name} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>

              <h2>2. Accessibility Standards</h2>
              <p>
                We aim to comply with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA, which sets out requirements for making web content more accessible to people with disabilities.
              </p>

              <h2>3. Accessibility Features</h2>
              <p>Our website includes the following accessibility features:</p>
              <ul>
                <li><strong>Semantic HTML:</strong> Proper use of headings, landmarks, and semantic elements</li>
                <li><strong>Keyboard Navigation:</strong> All interactive elements are accessible via keyboard</li>
                <li><strong>Focus Indicators:</strong> Visible focus rings for keyboard users</li>
                <li><strong>Color Contrast:</strong> Text and background colors meet WCAG AA contrast requirements</li>
                <li><strong>Alt Text:</strong> Descriptive alternative text for images</li>
                <li><strong>Responsive Design:</strong> Optimised for various screen sizes and devices</li>
                <li><strong>Reduced Motion:</strong> Respects prefers-reduced-motion preferences</li>
                <li><strong>Skip Links:</strong> Skip-to-content link for keyboard users</li>
              </ul>

              <h2>4. Known Limitations</h2>
              <p>
                Despite our best efforts to ensure accessibility, there may be some limitations. We are actively working to address these and welcome feedback on any accessibility issues you encounter.
              </p>

              <h2>5. Third-Party Content</h2>
              <p>
                Our website may include third-party content (e.g., embedded maps, chat services) that we do not control. We encourage these third parties to provide accessible content, but we cannot guarantee their accessibility.
              </p>

              <h2>6. Feedback and Assistance</h2>
              <p>
                If you experience any difficulty accessing our website or have suggestions for improvement, please contact us:
              </p>
              <ul>
                <li>Email: {FIRM.email}</li>
                <li>Phone: {FIRM.phone}</li>
              </ul>
              <p>
                We will endeavour to respond to accessibility-related feedback within a reasonable timeframe and work to address any issues identified.
              </p>

              <h2>7. Ongoing Efforts</h2>
              <p>
                We regularly review our website for accessibility compliance and work to improve accessibility as part of our ongoing website maintenance and development process.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Accessibility Statement", url: "/accessibility" },
        ]}
      />
    </>
  );
}
