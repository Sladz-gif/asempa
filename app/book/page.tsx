import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book a Consultation · Schedule Your Appointment",
  description: `Book a consultation with ${FIRM.name} in Accra, Ghana. Choose your practice area, attorney, and preferred time for in-person, phone, or video consultation.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Book a Consultation
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Schedule your appointment with our team in Accra. Choose your preferred practice area, attorney, and consultation type.
          </p>
        </div>
      </div>

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-8 border border-gray-200 rounded-lg">
              <BookingWizard />
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Book a Consultation", url: "/book" },
        ]}
      />
    </>
  );
}
