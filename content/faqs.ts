import type { FAQItem } from "@/types";

export const faqs: FAQItem[] = [
  {
    id: "faq-general-1",
    question: "[How do I book a consultation and what are the fees?]",
    answer:
      "[You can book a consultation directly via the Book a Consultation page on this website, by calling our Accra office, or by sending us a message on WhatsApp. Our standard initial consultation fee is ₵[X,XXX] (Ghana Cedi) for up to [60] minutes, and we will confirm the fee with you in writing before any commitment. Payment options, including mobile money, are outlined during the booking flow once the optional payments feature is enabled.]",
    practiceAreaId: undefined,
  },
  {
    id: "faq-general-2",
    question: "[Where is your office and what are your opening hours?]",
    answer:
      "[Our office is at [Street, Area], Accra, Ghana. We are open Monday to Friday 8:30 AM to 5:30 PM and on Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays and public holidays. Consultations outside of these hours may be arranged by appointment on a case-by-case basis.]",
    practiceAreaId: undefined,
  },
  {
    id: "faq-general-3",
    question: "[Do you offer pro bono or contingency fee work?]",
    answer:
      "[We accept a limited number of pro bono matters each year, principally around access to justice and public-interest issues. Contingency fee arrangements may be considered in select dispute cases in accordance with the rules of the General Legal Council. Please contact us directly to discuss the specifics of your case.]",
    practiceAreaId: undefined,
  },
  {
    id: "faq-general-4",
    question: "[Will anything I share with your chat assistant create a lawyer-client relationship?]",
    answer:
      "[No. Use of this website or communication with our AI chat assistant does NOT create a lawyer-client relationship or legal professional privilege. Confidential or sensitive details should not be shared through the website or the chat assistant. These channels are for general information about our services only. A relationship is created only when both you and a partner of the firm sign a written engagement letter.]",
    practiceAreaId: undefined,
  },
  {
    id: "faq-corp-1",
    question: "[How long does it take to register a company in Ghana and what do you need from me?]",
    answer:
      "[Under the Companies Act, 2019 (Act 992), a standard private company limited by shares typically takes [5–10] business days from the point we receive complete instructions and your supporting documents. The process involves name reservation, filing of incorporation documents with the Registrar General, post-incorporation compliance steps, and (if applicable) Tax Identification Number registration. We will send you a clear checklist once you engage us.]",
    practiceAreaId: "pa-corporate",
  },
  {
    id: "faq-corp-2",
    question: "[Can a non-Ghanaian own 100% of a Ghanaian company?]",
    answer:
      "[In most sectors, yes — Ghana's investment laws permit 100% foreign ownership in many industries. However, certain sectors have minimum capital, local participation, or licensing requirements under the Ghana Investment Promotion Centre Act, 2013 (Act 865) and sector-specific regulation. We advise on structuring, GIPC registration, and any licensing required for your specific activity.]",
    practiceAreaId: "pa-corporate",
  },
  {
    id: "faq-dispute-1",
    question: "[How long do commercial cases typically take in Ghana?]",
    answer:
      "[Timeline depends on complexity, the tier of court, and the availability of judges. A straightforward High Court claim is often resolved in [12–24] months; more complex matters or appeals may take longer. Many disputes are resolved earlier through mediation or settlement, which we actively pursue where it is in our client's commercial interest.]",
    practiceAreaId: "pa-dispute",
  },
  {
    id: "faq-dispute-2",
    question: "[Should I choose arbitration or litigation for my commercial dispute?]",
    answer:
      "[It depends on your priorities: arbitration is confidential, party-led, and can produce a final award in a shorter fixed window, while litigation is public, appellate, and can be cheaper at entry. We will map the pros and cons against your specific counterparty, contract, and desired outcome in an initial case assessment.]",
    practiceAreaId: "pa-dispute",
  },
  {
    id: "faq-property-1",
    question: "[How do I verify that a land or property seller in Accra has good title?]",
    answer:
      "[Proper verification requires a Lands Commission search, a search at the registry of deeds (for unregistered land), customary stool or family land enquiries, court searches for pending litigation, and review of the root of title documents going back at least [30] years where available. We always recommend conducting full due diligence before committing any payment.]",
    practiceAreaId: "pa-property",
  },
  {
    id: "faq-property-2",
    question: "[What is stamp duty on property purchase and who pays it?]",
    answer:
      "[Stamp duty on conveyance on sale is currently [0.5%] of the property's market value (or consideration, whichever is higher) under the Stamp Duty Act, 2005 (Act 689). It is typically payable by the purchaser, though the parties can agree otherwise in the sale agreement. We handle stamp duty assessment, payment, and stamping as part of our conveyancing service.]",
    practiceAreaId: "pa-property",
  },
  {
    id: "faq-family-1",
    question: "[What is the difference between a customary marriage and an ordinance marriage in Ghana?]",
    answer:
      "[An ordinance marriage (under the Marriage Act, 1884–1985) is monogamous and registered at the Registrar of Marriages. A customary marriage is celebrated under the customary law of either party's family and may be polygamous unless the parties register it under the Customary Marriage and Divorce (Registration) Law, 1985 (PNDCL 112). Both are legally recognised; they have different implications for dissolution and property rights on divorce or intestacy.]",
    practiceAreaId: "pa-family",
  },
  {
    id: "faq-family-2",
    question: "[What happens to my property if I die without a will in Ghana?]",
    answer:
      "[If you die domiciled in Ghana without a will, your estate is distributed according to the Intestate Succession Act, 1985 (PNDCL 111), which sets fixed shares for a surviving spouse, children, parents, and other family members depending on the composition of your family. The outcome may not reflect your intended wishes; a properly drafted will is strongly recommended for anyone with property or dependants.]",
    practiceAreaId: "pa-family",
  },
  {
    id: "faq-employ-1",
    question: "[What is the maximum notice period or severance on termination in Ghana?]",
    answer:
      "[Under the Labour Act, 2003 (Act 651), minimum notice depends on length of continuous service — it scales up from [7] days for employees with less than [3] months of service to [30] days for employees who have completed more than [3] years. For redundancy or unlawful termination, additional severance, awards, or damages may be available, particularly for senior or long-serving employees.]",
    practiceAreaId: "pa-employment",
  },
  {
    id: "faq-reg-1",
    question: "[Do I need to register with the Data Protection Commission (DPC)?]",
    answer:
      "[If you process personal data in Ghana or offer goods or services to data subjects in Ghana, you are generally required to register as a data controller with the DPC under the Data Protection Act, 2012 (Act 843). Registration is renewable annually and follows from a documented compliance programme including a data processing register and data protection impact assessments where required.]",
    practiceAreaId: "pa-regulatory",
  },
  {
    id: "faq-reg-2",
    question: "[What are the anti-corruption rules applicable to businesses in Ghana?]",
    answer:
      "[The main domestic law is the Criminal Offences Act, 1960 (Act 29), and the Anti-Corruption Act, 1998 (Act 554), which criminalise active and passive bribery of both public officials and private persons. Ghana is also a signatory to the AU and UN anti-corruption conventions and many international investors apply the UK Bribery Act 2010 or US FCPA extraterritorial standards. A documented anti-corruption policy, gifts register, and due diligence on agents are essential for any serious business.]",
    practiceAreaId: "pa-regulatory",
  },
];

export const generalFAQs = faqs.filter((f) => !f.practiceAreaId);

export function faqsByPracticeArea(practiceAreaId: string): FAQItem[] {
  return faqs.filter((f) => f.practiceAreaId === practiceAreaId);
}
