import type { Metadata } from "next";
import { testimonials } from "@/content/testimonials";
import { practiceAreas } from "@/content/practice-areas";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Divider } from "@/components/ui/Divider";
import { BreadcrumbListJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export const metadata: Metadata = {
  title: "Client Testimonials · What Our Clients Say",
  description: `Read testimonials from ${FIRM.name}'s clients across corporate, dispute resolution, property, family, employment, and regulatory matters in Accra, Ghana.`,
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const otherTestimonials = testimonials.filter((t) => !t.featured);

  return (
    <>
      <div className="bg-white py-section-lg">
        <div className="container-page mx-auto px-6 md:px-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-warm-text mb-4">
            Client Testimonials
          </h1>
          <p className="text-warm-muted text-lg md:text-xl max-w-3xl">
            What our clients say about working with {FIRM.name} across Ghana.
          </p>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-text mb-8">
            Featured Testimonials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial) => {
              const practiceArea = testimonial.practiceAreaId
                ? practiceAreas.find((pa) => pa.id === testimonial.practiceAreaId)
                : undefined;
              return (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  practiceArea={practiceArea}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Divider className="mx-auto container-page !w-[calc(100%-3rem)] md:!w-[calc(100%-5rem)]" />

      <div className="bg-white py-section">
        <div className="container-page mx-auto px-6 md:px-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-text mb-8">
            All Testimonials
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherTestimonials.map((testimonial) => {
              const practiceArea = testimonial.practiceAreaId
                ? practiceAreas.find((pa) => pa.id === testimonial.practiceAreaId)
                : undefined;
              return (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  practiceArea={practiceArea}
                />
              );
            })}
          </div>
        </div>
      </div>

      <BreadcrumbListJSONLD
        items={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
      />
    </>
  );
}
