import type { Testimonial, PracticeArea } from "@/types";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: Testimonial;
  practiceArea?: PracticeArea;
}

export function TestimonialCard({ testimonial, practiceArea }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 md:p-8 border border-gray-200 hover:border-gold/40 transition-colors">
      <Quote className="w-8 h-8 text-gold mb-4 opacity-60" />
      <blockquote className="text-warm-text text-lg leading-relaxed mb-6 font-serif italic">
        {testimonial.quote}
      </blockquote>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-warm-text">{testimonial.clientFullName}</p>
          <p className="text-warm-muted text-sm">{testimonial.clientRole}</p>
        </div>
        {practiceArea && (
          <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/30">
            {practiceArea.name.replace(/[[\]]/g, "")}
          </span>
        )}
      </div>
    </div>
  );
}
