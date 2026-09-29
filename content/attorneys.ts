import type { Attorney } from "@/types";

const img = (seed: string) => {
  const images: Record<string, string> = {
    "founding-partner": "/images/director.png",
    "dispute-resolution-partner": "/images/pexels-muhammad-maina-2163024752-38643224.jpg",
    "family-law-regulatory-partner": "/images/pexels-khaliifah-hussein-1904370898-34078745.jpg",
    "senior-associate-corporate": "/images/pexels-unique-bash-creative-1927464998-34659066.jpg",
    "property-law-associate": "/images/pexels-unique-bash-creative-1927464998-34850167.jpg",
    "dispute-resolution-associate": "/images/pexels-khaliifah-hussein-1904370898-34078745.jpg",
  };
  return images[seed] || "/images/pexels-muhammad-maina-2163024752-38643224.jpg";
};

export const attorneys: Attorney[] = [
  {
    id: "att-001",
    slug: "founding-partner",
    fullName: "Dr. Lawrence Akoto Bediako Esq (Nana Atwere Bediako Akoto)",
    title: "Founding Partner & Managing Director",
    ghanaBarAdmissionYear: 2010,
    education: [
      "BL, Law, Ghana School of Law, Oct 2021 – Oct 2023",
      "Bachelor of Laws (LLB), Law, Ghana Institute of Management and Public Administration (GIMPA), 2013 – 2017",
      "Master of Business Administration (MBA), Finance, General, University of Ghana Business School (UGBS), 2010 – 2012",
      "Executive Certificate, Corporate Finance, London Business School, 2010 – 2010",
      "CA, Accountancy, Institute of Chartered Accountants, Ghana, 2003 – 2007",
    ],
    practiceAreaIds: ["pa-corporate", "pa-property"],
    languages: ["English", "Twi", "Ga"],
    bio: "Dr. Lawrence Akoto Bediako Esq founded the firm in 2015 following 5 years in private practice and in-house counsel roles with leading Ghanaian corporations. He advises corporate clients, high-net-worth individuals, and family-owned businesses on corporate transactions, property development, and succession planning. He is a member of the Ghana Bar Association and a notary public. Known to his clients and colleagues as Nana Atwere Bediako Akoto, he brings both traditional wisdom and modern legal expertise to every matter.",
    photoUrl: img("founding-partner"),
    featured: true,
  },
  {
    id: "att-002",
    slug: "dispute-head",
    fullName: "[Dispute Head Name]",
    title: "[Partner & Head of Dispute Resolution]",
    ghanaBarAdmissionYear: 2013,
    education: [
      "[LL.B, Kwame Nkrumah University of Science and Technology, 2011]",
      "[Professional Certificate in Law, Ghana School of Law, 2013]",
      "[Postgraduate Diploma in International Arbitration, [Chartered Institute], 2018]",
    ],
    practiceAreaIds: ["pa-dispute", "pa-employment"],
    languages: ["English", "[Twi]"],
    bio: "[Dispute Head Name] leads the firm's dispute resolution practice, with a track record of appearances before the High Court, Court of Appeal, and Supreme Court of Ghana in commercial, construction, and employment matters. [He / She] also sits as an arbitrator in domestic commercial references and is a member of the Chartered Institute of Arbitrators (CIArb).]",
    photoUrl: img("dispute-resolution-partner"),
    featured: true,
  },
  {
    id: "att-003",
    slug: "family-regulatory",
    fullName: "[Family & Regulatory Partner Name]",
    title: "[Partner, Family & Regulatory Practice]",
    ghanaBarAdmissionYear: 2015,
    education: [
      "[LL.B, University of Ghana School of Law, 2013]",
      "[Professional Certificate in Law, Ghana School of Law, 2015]",
      "[Certificate in Data Protection Practice, [Institute Name], 2022]",
    ],
    practiceAreaIds: ["pa-family", "pa-regulatory"],
    languages: ["English", "[Ga]", "[French, conversational]"],
    bio: "[Family & Regulatory Partner Name] advises on sensitive family and succession matters and leads the firm's regulatory compliance and data protection practice. [He / She] has supported clients across financial services, fintech, and the NGO sector on Data Protection Act compliance programmes and anti-bribery framework design.]",
    photoUrl: img("family-law-regulatory-partner"),
    featured: true,
  },
  {
    id: "att-004",
    slug: "senior-associate-corporate",
    fullName: "[Senior Associate Name]",
    title: "[Senior Associate, Corporate & Commercial]",
    ghanaBarAdmissionYear: 2018,
    education: [
      "[LL.B, University of Ghana School of Law, 2016]",
      "[Professional Certificate in Law, Ghana School of Law, 2018]",
    ],
    practiceAreaIds: ["pa-corporate", "pa-regulatory"],
    languages: ["English", "[Twi]"],
    bio: "[Senior Associate Name] supports the corporate and regulatory teams on company incorporations, M&A due diligence, commercial contract drafting, and SEC and Registrar General filings. Prior to joining the firm, [he / she] worked with [prior organisation / role].]",
    photoUrl: img("senior-associate-corporate"),
  },
  {
    id: "att-005",
    slug: "associate-property",
    fullName: "[Associate, Property]",
    title: "[Associate, Property & Real Estate]",
    ghanaBarAdmissionYear: 2020,
    education: [
      "[LL.B, [University Name], 2018]",
      "[Professional Certificate in Law, Ghana School of Law, 2020]",
    ],
    practiceAreaIds: ["pa-property", "pa-family"],
    languages: ["English", "[Ewe]"],
    bio: "[Associate Name] handles conveyancing, Lands Commission registration, lease advisory, and estate administration files. [He / She] has particular experience in title issues involving stool and customary land across Greater Accra and the Eastern Region.]",
    photoUrl: img("property-law-associate"),
  },
  {
    id: "att-006",
    slug: "associate-dispute",
    fullName: "[Associate, Dispute]",
    title: "[Associate, Dispute Resolution]",
    ghanaBarAdmissionYear: 2021,
    education: [
      "[LL.B, [University Name], 2019]",
      "[Professional Certificate in Law, Ghana School of Law, 2021]",
    ],
    practiceAreaIds: ["pa-dispute", "pa-employment"],
    languages: ["English", "[Twi]", "[Ga]"],
    bio: "[Associate Name] supports the dispute team on pleadings, discovery, witness statements, and advocacy at the High Court and the National Labour Commission. [He / She] has acted in debt recovery, contractual, and employment matters for clients in the financial services and hospitality sectors.]",
    photoUrl: img("dispute-resolution-associate"),
  },
];

export function getAttorneyById(id: string): Attorney | undefined {
  return attorneys.find((a) => a.id === id);
}

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return attorneys.find((a) => a.slug === slug);
}
