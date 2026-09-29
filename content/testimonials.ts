import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "test-001",
    clientFullName: "[Client Name]",
    clientRole: "[Managing Director, Company Name, Accra]",
    practiceAreaId: "pa-corporate",
    quote:
      "[The firm] guided our group through the sale of a subsidiary with a calm, commercial approach that helped us close on favourable terms. Their understanding of Ghanaian corporate law and regulator expectations gave us confidence at every stage. We have retained them on all our subsequent matters.]",
    featured: true,
  },
  {
    id: "test-002",
    clientFullName: "[Client Name]",
    clientRole: "[General Counsel, Regional Group]",
    practiceAreaId: "pa-dispute",
    quote:
      "[The dispute team] handled a difficult arbitration for our Ghana business with discipline and excellent advocacy. The outcome was significantly better than our best-case scenario going in.]",
    featured: true,
  },
  {
    id: "test-003",
    clientFullName: "[Client Name]",
    clientRole: "[Private Client, Accra]",
    practiceAreaId: "pa-family",
    quote:
      "[We instructed the firm] on a delicate family and succession matter and appreciated the discretion and patience shown throughout. We always felt our interests were fully protected, and the outcome was the right one for our family.]",
    featured: true,
  },
  {
    id: "test-004",
    clientFullName: "[Client Name]",
    clientRole: "[CEO, Fintech Startup]",
    practiceAreaId: "pa-regulatory",
    quote:
      "[Their regulatory team] was an essential partner as we scaled our fintech product. They delivered our Data Protection Act compliance programme and advised on BoG-related issues — clear, reliable, and on our timeline.]",
  },
  {
    id: "test-005",
    clientFullName: "[Client Name]",
    clientRole: "[Property Developer]",
    practiceAreaId: "pa-property",
    quote:
      "[The property practice] resolved a long-running title issue on our flagship Accra development site. We could not have proceeded without their work on the stool land and Lands Commission side.]",
  },
  {
    id: "test-006",
    clientFullName: "[Client Name]",
    clientRole: "[HR Director, Multinational]",
    practiceAreaId: "pa-employment",
    quote:
      "[The employment team] supported us through a complex restructuring exercise with multiple executive terminations. Their process design and NLC expertise meant every matter closed cleanly.]",
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);
