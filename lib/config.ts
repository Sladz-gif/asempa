import type { Office } from "@/types";

export interface FirmConfig {
  name: string;
  shortName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  positioning: string;
  tone: string;
  consultationFeeGHS: number;
  offices: Office[];
  socials: {
    linkedin: string;
    twitter: string;
  };
  featureFlags: {
    paymentsEnabled: boolean;
  };
  siteUrl: string;
}

export const FIRM: FirmConfig = {
  name: "Asempa, Bediako & CO",
  shortName: "Asempa Law",
  address: "[Street, Area], Accra, Ghana",
  phone: "+233 20 123 4567",
  whatsapp: "+233 20 123 4567",
  email: "info@asempabediako.com",
  hours: {
    weekday: "Monday – Friday · 8:30 AM – 5:30 PM",
    saturday: "Saturday · 9:00 AM – 1:00 PM",
    sunday: "Sunday · Closed",
  },
  positioning: "Trusted legal counsel for Ghana's businesses and families, combining local expertise with international standards.",
  tone: "authoritative, calm, premium",
  consultationFeeGHS: 1500,
  offices: [
    {
      id: "accra-main",
      name: "Accra Head Office",
      address: "[Street, Area], Accra, Ghana",
      phone: "+233 20 123 4567",
      mapEmbedUrl: "[MAP EMBED PLACEHOLDER URL]",
    },
  ],
  socials: {
    linkedin: "#",
    twitter: "#",
  },
  featureFlags: {
    paymentsEnabled: false,
  },
  siteUrl: "https://asempabediako.com",
};
