import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { FIRM } from "@/lib/config";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { Phone, MessageSquare, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us · Get in Touch with Our Accra Office",
  description: `Contact ${FIRM.name} in Accra, Ghana. Call, WhatsApp, or visit our office. Book a consultation or send us a message.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Contact Us
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            Get in touch with our team in Accra. We&apos;re here to help with your legal needs.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-text mb-6">
                Get in touch
              </h2>

              <div className="space-y-6">
                <a
                  href={`tel:${FIRM.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-sm hover:border-gold/40 transition-colors group"
                >
                  <div className="p-3 bg-gold/10 rounded-full">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-text group-hover:text-gold transition-colors">
                      Call us
                    </p>
                    <p className="text-warm-muted">{FIRM.phone}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${FIRM.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-sm hover:border-gold/40 transition-colors group"
                >
                  <div className="p-3 bg-gold/10 rounded-full">
                    <MessageSquare className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-text group-hover:text-gold transition-colors">
                      WhatsApp
                    </p>
                    <p className="text-warm-muted">{FIRM.whatsapp}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-sm">
                  <div className="p-3 bg-gold/10 rounded-full">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-text">Office Address</p>
                    <p className="text-warm-muted">{FIRM.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-sm">
                  <div className="p-3 bg-gold/10 rounded-full">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-warm-text">Office Hours</p>
                    <p className="text-warm-muted">{FIRM.hours.weekday}</p>
                    <p className="text-warm-muted">{FIRM.hours.saturday}</p>
                    <p className="text-warm-muted">{FIRM.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-warm-muted text-sm">Interactive map</p>
                  <p className="text-warm-muted/60 text-xs">[MAP EMBED PLACEHOLDER]</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-sm">
                <h3 className="font-serif text-lg font-semibold text-warm-text mb-3">
                  Prefer to book directly?
                </h3>
                <p className="text-warm-muted text-sm mb-4">
                  Schedule a consultation with one of our attorneys online.
                </p>
                <a
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black-900 font-medium rounded-sm hover:bg-gold-hl transition-colors"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
    </>
  );
}
