# Asempa, Bediako & CO - Law Firm Website

A modern, accessible law firm website built with Next.js (App Router), TypeScript, and Tailwind CSS. This is a front-end only implementation with mock services that can be easily replaced with real backend implementations.

## Features

- **Complete Law Firm Website**: Home, About, Practice Areas, Attorneys, Results, Testimonials, Insights, FAQ, Contact, and legal pages
- **Booking System**: Multi-step consultation booking wizard with practice area, attorney, date/time selection, and client details
- **AI Chat Assistant**: Floating chat widget with mock AI responses, rich cards, and conversation history
- **Design System**: Premium dark theme with gold accents, editorial typography, and WCAG 2.2 AA accessibility
- **SEO Optimized**: Metadata API, JSON-LD structured data, sitemap.xml, and robots.txt
- **Mock Services**: Typed service layer with realistic mock implementations for easy backend integration
- **Responsive Design**: Mobile-first with sticky header, mobile menu, and sticky bottom bar

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display (headings), Inter (body)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand (client state)
- **Content**: MDX for insights articles

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd asempa
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
asempa/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── attorneys/           # Attorneys index and detail pages
│   ├── book/                # Booking page
│   ├── contact/             # Contact page
│   ├── faq/                 # FAQ page
│   ├── insights/            # Insights index and detail pages
│   ├── practice-areas/      # Practice areas index and detail pages
│   ├── results/             # Results/Notable matters page
│   ├── testimonials/        # Testimonials page
│   ├── legal/               # Legal pages (privacy, terms, etc.)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── robots.ts            # Robots.txt
│   └── sitemap.ts           # Sitemap.xml
├── components/
│   ├── booking/             # Booking wizard components
│   ├── chat/                # Chat assistant components
│   ├── layout/              # Header, Footer, Cookie banner
│   ├── sections/            # Page sections
│   ├── seo/                 # JSON-LD structured data
│   └── ui/                  # Reusable UI components
├── content/
│   ├── attorneys.ts         # Attorney data
│   ├── faqs.ts              # FAQ data
│   ├── insights/            # MDX insight articles
│   ├── practice-areas.ts    # Practice area data
│   ├── results.ts           # Case results data
│   └── testimonials.ts      # Testimonial data
├── lib/
│   ├── config.ts            # Firm configuration (edit this!)
│   ├── hooks/               # Custom React hooks
│   ├── mdx.ts               # MDX processing utilities
│   ├── services/            # Service layer (booking, chat, contact)
│   └── utils/               # Utility functions
└── types/                   # TypeScript type definitions
```

## Configuration

### Firm Details

Edit `lib/config.ts` to customize firm details:

```typescript
export const FIRM: FirmConfig = {
  name: "Asempa, Bediako & CO",
  shortName: "Asempa Law",
  address: "[Street, Area], Accra, Ghana",
  phone: "+233 [XX XXX XXXX]",
  whatsapp: "+233 [XX XXX XXXX]",
  email: "info@asempabediako.com",
  hours: {
    weekday: "Monday – Friday · 8:30 AM – 5:30 PM",
    saturday: "Saturday · 9:00 AM – 1:00 PM",
    sunday: "Sunday · Closed",
  },
  positioning: "Trusted legal counsel for Ghana's businesses and families...",
  consultationFeeGHS: 1500,
  // ... more configuration
};
```

### Content Data

Update the data files in `content/` to customize:
- **attorneys.ts**: Add/remove attorneys, update profiles
- **practice-areas.ts**: Customize practice areas and descriptions
- **faqs.ts**: Add FAQs for each practice area
- **results.ts**: Add notable case results
- **testimonials.ts**: Add client testimonials
- **insights/**: Add MDX articles for the insights section

## Backend Integration

This website uses a typed service layer with mock implementations. To connect a real backend, replace the mock services with HTTP implementations.

### Booking Service

**File**: `lib/services/booking.ts`

The booking service currently uses `MockBookingService`. To connect a real backend:

1. Set the environment variable:
```bash
NEXT_PUBLIC_BOOKING_ENDPOINT=https://api.your-firm.example/v1/bookings
```

2. Replace the export at the bottom of the file:
```typescript
// Change from:
export const bookingService: BookingService = MockBookingService;

// To:
export const bookingService: BookingService = _HttpBookingService;
```

**API Requirements**:
- `GET /slots?dateFrom=YYYY-MM-DD&days=N&attorneyId=X&practiceAreaId=Y` - Returns available time slots
- `POST /` - Submits a booking and returns confirmation

### Chat Service

**File**: `lib/services/chat.ts`

The chat service currently uses `MockChatService`. To connect a real AI backend:

1. Set the environment variable:
```bash
NEXT_PUBLIC_CHAT_ENDPOINT=https://your-gateway.example/v1/chat
```

2. Replace the export:
```typescript
// Change from:
export const chatService: ChatService = MockChatService;

// To:
export const chatService: ChatService = _HttpChatService;
```

**API Requirements**:
- `POST /` - Accepts message history and returns Server-Sent Events (SSE) stream
- Response format: SSE with `data: {"text": "...", "done": false, "actions": [...]}`

**Important**: Never put API keys or model calls in the frontend. The endpoint must be a server-side gateway that authenticates, rate-limits, and applies guardrails.

### Contact Service

**File**: `lib/services/contact.ts`

The contact service currently uses `MockContactService`. To connect a real backend:

1. Set the environment variable:
```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-api.example/v1/contact
```

2. Replace the export:
```typescript
// Change from:
export const contactService: ContactService = MockContactService;

// To:
export const contactService: ContactService = _HttpContactService;
```

**API Requirements**:
- `POST /` - Accepts contact form submission and returns success/ticket

## Payments (Optional)

The booking flow includes an optional payment step placeholder. To enable:

1. Set the feature flag in `lib/config.ts`:
```typescript
featureFlags: {
  paymentsEnabled: true,
}
```

2. Implement payment integration (Paystack, Hubtel, etc.) in the booking wizard

## Legal Compliance

**Important**: Before launching, the following must be reviewed by a qualified Ghanaian lawyer:

1. **Testimonials and Results**: All testimonials and case results must be verified against the General Legal Council rules on lawyer advertising in Ghana. Mark all placeholders clearly.

2. **Privacy Policy**: The privacy policy template must be confirmed against the Data Protection Act, 2012 (Act 843).

3. **Cookie Notice**: Cookie wording must be confirmed for Ghanaian compliance.

4. **Terms of Service**: Must be reviewed by a lawyer.

5. **Disclaimer**: The disclaimer about no lawyer-client relationship is critical and must be prominent.

## Accessibility

This website is designed to meet WCAG 2.2 AA standards:
- Semantic HTML with proper landmarks
- Keyboard navigation throughout
- Visible focus indicators (gold rings)
- Color contrast meeting AA requirements
- Alt text for images
- Skip-to-content link
- Respects `prefers-reduced-motion`

## Performance

- Static generation by default for optimal performance
- Optimized images with Next.js Image component
- Minimal client JavaScript
- Core Web Vitals targeted

## Development

### Adding New Practice Areas

1. Add to `content/practice-areas.ts`
2. Add FAQs to `content/faqs.ts` with matching `practiceAreaId`
3. Update attorneys' `practiceAreaIds` in `content/attorneys.ts`

### Adding New Attorneys

1. Add to `content/attorneys.ts`
2. Assign appropriate `practiceAreaIds`
3. Update featured attorneys in home page if needed

### Adding New Insights

1. Create new `.mdx` file in `content/insights/`
2. Add frontmatter with title, category, author, etc.
3. Reference attorney by `authorAttorneyId`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables if using real backends
4. Deploy

### Other Platforms

Build the project and deploy the `.next` folder and public assets according to your platform's requirements.

## Environment Variables

Optional environment variables for backend integration:

```bash
NEXT_PUBLIC_BOOKING_ENDPOINT=https://api.your-firm.example/v1/bookings
NEXT_PUBLIC_CHAT_ENDPOINT=https://your-gateway.example/v1/chat
NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-api.example/v1/contact
```

## Support

For issues or questions about this implementation, please refer to the code comments or contact the development team.

## License

[Specify your license here]
