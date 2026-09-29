export interface PracticeArea {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  icon: string;
  overview: string;
  howWeHelp: string[];
  steps: ProcessStep[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Attorney {
  id: string;
  slug: string;
  fullName: string;
  title: string;
  ghanaBarAdmissionYear: number;
  education: string[];
  practiceAreaIds: string[];
  languages: string[];
  bio: string;
  photoUrl: string;
  featured?: boolean;
}

export interface MatterResult {
  id: string;
  title: string;
  practiceAreaId: string;
  outcomeFigure: string;
  outcomeUnit: "GHS" | "percentage" | "favourable" | "dismissed" | "other";
  summary: string;
  year: number;
}

export interface Testimonial {
  id: string;
  clientFullName: string;
  clientRole: string;
  practiceAreaId?: string;
  quote: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  practiceAreaId?: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  category: string;
  authorAttorneyId?: string;
  publishedAt: string;
  readingTimeMinutes: number;
  excerpt: string;
  heroImageUrl: string;
  relatedPracticeAreaIds: string[];
  content: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
}
