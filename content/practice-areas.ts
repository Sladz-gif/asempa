import type { PracticeArea } from "@/types";

export const practiceAreas: PracticeArea[] = [
  {
    id: "pa-corporate",
    slug: "corporate-commercial",
    name: "[Corporate & Commercial Law]",
    shortDescription:
      "[Company formation, governance, contracts, and commercial transactions for businesses in Ghana.]",
    icon: "Building2",
    overview:
      "[Our corporate and commercial practice advises local and international businesses operating across Ghana and the wider West African region. We provide pragmatic, commercially-minded counsel on entity structuring, regulatory compliance, contract negotiation, and day-to-day operational matters, grounded in the Companies Act, 2019 (Act 992) and prevailing Ghanaian market practice.]",
    howWeHelp: [
      "[Company incorporation, re-registration, and restructuring under Act 992.]",
      "[Drafting and negotiation of commercial agreements — supply, distribution, agency, service, and SaaS contracts.]",
      "[Corporate governance advisory, board protocols, and general meetings.]",
      "[Regulatory compliance and filings with the Registrar General and SEC.]",
      "[Mergers, acquisitions, and share transfers with due diligence support.]",
    ],
    steps: [
      {
        title: "[Initial review]",
        description:
          "[We review your commercial objectives, entity documents, and risk profile to identify the legal structure that best fits your business.]",
      },
      {
        title: "[Structuring & drafting]",
        description:
          "[We draft the required agreements, board resolutions, and filings with clear, commercial terms that protect your position.]",
      },
      {
        title: "[Negotiation & execution]",
        description:
          "[We lead or support negotiation with counterparties and guide execution and regulatory filings until the matter closes.]",
      },
      {
        title: "[Ongoing counsel]",
        description:
          "[We remain available for day-to-day advisory, compliance reviews, and periodic health-checks as your business grows.]",
      },
    ],
  },
  {
    id: "pa-dispute",
    slug: "dispute-resolution",
    name: "[Dispute Resolution & Litigation]",
    shortDescription:
      "[Strategic advocacy in commercial, civil, and employment disputes before Ghanaian courts and arbitral tribunals.]",
    icon: "Scale",
    overview:
      "[Our dispute resolution team combines courtroom advocacy with a pragmatic, early-case-assessment approach. We represent clients before the High Court, Court of Appeal, Supreme Court of Ghana, and in domestic and international arbitrations seated in Accra, Lagos, and London.]",
    howWeHelp: [
      "[Case evaluation, risk mapping, and pre-action dispute resolution strategy.]",
      "[Commercial litigation and civil proceedings at all tiers of the Ghanaian courts.]",
      "[Arbitration under the Ghana Arbitration Act, 2010 (Act 798) and ICC, SIAC, and UNCITRAL rules.]",
      "[Employment, debt recovery, and enforcement of foreign judgments and awards.]",
      "[Alternative dispute resolution — mediation and expert determination.]",
    ],
    steps: [
      {
        title: "[Case assessment]",
        description:
          "[We review your documentation and provide a written assessment of merits, exposure, and likely outcomes.]",
      },
      {
        title: "[Strategy & pre-action]",
        description:
          "[Where appropriate, we pursue pre-action correspondence, mediation, or settlement to resolve the dispute without formal proceedings.]",
      },
      {
        title: "[Proceedings]",
        description:
          "[If required, we issue, conduct, and defend proceedings or arbitrations with senior counsel involvement where warranted.]",
      },
      {
        title: "[Resolution & enforcement]",
        description:
          "[We secure judgment or award and advise on enforcement, collection, and post-dispute compliance steps.]",
      },
    ],
  },
  {
    id: "pa-property",
    slug: "property-real-estate",
    name: "[Property & Real Estate]",
    shortDescription:
      "[Conveyancing, title perfection, lease advisory, and real estate development across Accra and Ghana.]",
    icon: "Home",
    overview:
      "[Our property practice acts for individuals, developers, landlords, tenants, and financial institutions on the full lifecycle of real estate in Ghana. We are experienced in customary and stool land issues, title registration at the Lands Commission, and structured real estate transactions.]",
    howWeHelp: [
      "[Title searches, due diligence, and customary land verification.]",
      "[Conveyancing for sale and purchase of residential and commercial property.]",
      "[Leasing, licences, and property management agreements.]",
      "[Development structuring, joint ventures, and planning/permissions support.]",
      "[Mortgage and security documentation for lenders and borrowers.]",
    ],
    steps: [
      {
        title: "[Due diligence & search]",
        description:
          "[We conduct Lands Commission, court, and customary searches to confirm root of title before you commit.]",
      },
      {
        title: "[Negotiation & documentation]",
        description:
          "[We negotiate terms and prepare sale agreements, leases, or security documents tailored to your transaction.]",
      },
      {
        title: "[Completion & registration]",
        description:
          "[We supervise completion, manage stamp duty, and register your interest with the Lands Commission.]",
      },
      {
        title: "[Post-completion]",
        description:
          "[We handle disputes, rent reviews, dilapidations, and re-financing as they arise over the life of the asset.]",
      },
    ],
  },
  {
    id: "pa-family",
    slug: "family-law",
    name: "[Family, Marriage & Succession]",
    shortDescription:
      "[Discreet, solutions-oriented counsel on marriage, divorce, custody, maintenance, and estates in Accra.]",
    icon: "Heart",
    overview:
      "[Family and succession matters require calm judgment and a high degree of discretion. Our team advises clients across the full spectrum of personal and family law, with particular experience in intercultural marriages, intergenerational wealth transfer, and wills and estate administration under Ghana's Intestate Succession Act, 1985 (PNDCL 111).]",
    howWeHelp: [
      "[Prenuptial and postnuptial agreements and separation deeds.]",
      "[Divorce, dissolution of customary marriages, and property settlement.]",
      "[Custody, access, and child maintenance applications.]",
      "[Wills, estate planning, and administration of intestate estates.]",
      "[Family mediation and private dispute resolution.]",
    ],
    steps: [
      {
        title: "[Private consultation]",
        description:
          "[We begin with a confidential consultation to understand your family situation and the outcomes you seek.]",
      },
      {
        title: "[Options & strategy]",
        description:
          "[We set out your legal options — including negotiation, mediation, or court application — with clear timelines and cost guidance.]",
      },
      {
        title: "[Documentation & proceedings]",
        description:
          "[We prepare agreements, applications, or court filings and shepherd the process to resolution.]",
      },
      {
        title: "[Implementation]",
        description:
          "[We ensure consent orders, deeds, wills, and grants are properly drawn, registered, and enforceable.]",
      },
    ],
  },
  {
    id: "pa-employment",
    slug: "employment-labour",
    name: "[Employment & Labour Law]",
    shortDescription:
      "[Advisory and advocacy for employers and senior executives on the Labour Act, 2003 (Act 651).]",
    icon: "Briefcase",
    overview:
      "[We advise employers, multinationals, and senior professionals on Ghana's employment law framework, including the Labour Act and National Labour Commission practice. Our work spans transactional support on hires and restructurings, and advocacy in disciplinary, termination, and unfair dismissal matters.]",
    howWeHelp: [
      "[Employment contracts, handbooks, and policy drafting.]",
      "[Restructuring, redundancies, and termination advisory.]",
      "[Executive severance and settlement agreements.]",
      "[Representation before the National Labour Commission and High Court.]",
      "[Work permits and immigration support for expatriate staff.]",
    ],
    steps: [
      {
        title: "[Situation review]",
        description:
          "[We review the employment context, contracts, and documentation to frame the issue and your options.]",
      },
      {
        title: "[Policy or response design]",
        description:
          "[For employers: we design compliant processes. For executives: we evaluate your entitlements and strategy.]",
      },
      {
        title: "[Negotiation or process]",
        description:
          "[We negotiate exit terms, represent in disciplinary or grievance hearings, or issue/defend claims at the NLC.]",
      },
      {
        title: "[Resolution & risk closure]",
        description:
          "[We document settlements or awards and advise on any forward-looking compliance steps.]",
      },
    ],
  },
  {
    id: "pa-regulatory",
    slug: "regulatory-compliance",
    name: "[Regulatory & Compliance]",
    shortDescription:
      "[Advice on sectoral regulation, data protection, anti-corruption, and permitting in Ghana.]",
    icon: "ShieldCheck",
    overview:
      "[Navigating the Ghanaian regulatory landscape requires a team that understands both the letter of the law and how regulators actually apply it. We advise clients across financial services, fintech, extractives, energy, FMCG, and NGOs on compliance, licensing, and regulatory investigations.]",
    howWeHelp: [
      "[Data Protection Act, 2012 (Act 843) compliance, registrations, and DPIA support.]",
      "[Anti-corruption and anti-bribery frameworks aligned with Act 554 and the UK Bribery Act extraterritorial scope.]",
      "[Sector licensing: Bank of Ghana, SEC, NCA, Minerals Commission, EPA.]",
      "[Regulatory investigations and enquiries by state agencies.]",
      "[Compliance audits, training, and policy roll-out for Ghana-based teams.]",
    ],
    steps: [
      {
        title: "[Gap analysis]",
        description:
          "[We map your operations against the applicable regulatory framework and identify compliance gaps and risk areas.]",
      },
      {
        title: "[Framework design]",
        description:
          "[We design policies, registers, and controls that fit your team size and the regulatory expectations of your sector.]",
      },
      {
        title: "[Implementation & filing]",
        description:
          "[We support registration filings, licensing applications, and roll-out across your organisation.]",
      },
      {
        title: "[Ongoing monitoring]",
        description:
          "[We provide periodic updates, health-checks, and advice as regulators issue new guidance or enforcement patterns shift.]",
      },
    ],
  },
];

export function getPracticeAreaById(id: string): PracticeArea | undefined {
  return practiceAreas.find((pa) => pa.id === id);
}

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return practiceAreas.find((pa) => pa.slug === slug);
}
