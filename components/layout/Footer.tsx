import React from "react";
import Link from "next/link";
import { FIRM } from "@/lib/config";
import { practiceAreas } from "@/content/practice-areas";
import { attorneys } from "@/content/attorneys";
import { Mail, MapPin, Phone, Linkedin, Twitter } from "lucide-react";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white text-warm-muted">
      <div className="container-page pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-10 w-10 rounded-md bg-gold grid place-items-center font-serif font-bold text-black-900 shadow-gold"
              >
                {FIRM.shortName.replace(/[[\]]/g, "").slice(0, 1) || "A"}
              </span>
              <span className="font-serif font-semibold text-base md:text-lg text-warm-text">
                {FIRM.name.replace(/[[\]]/g, "")}
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              {FIRM.positioning.replace(/[[\]]/g, "")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={FIRM.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="h-9 w-9 rounded-md border border-gray-300 inline-flex items-center justify-center text-warm-muted hover:text-gold hover:border-gold transition-colors"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href={FIRM.socials.twitter}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Twitter / X"
                className="h-9 w-9 rounded-md border border-gray-300 inline-flex items-center justify-center text-warm-muted hover:text-gold hover:border-gold transition-colors"
              >
                <Twitter aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-warm-text text-base mb-4">Practice Areas</h4>
            <ul className="space-y-2.5">
              {practiceAreas.slice(0, 6).map((pa) => (
                <li key={pa.id}>
                  <Link
                    href={`/practice-areas/${pa.slug}`}
                    className="text-sm text-warm-muted hover:text-gold transition-colors inline-flex items-center gap-2"
                  >
                    <span aria-hidden="true" className="h-px w-4 bg-gold/50" />
                    {pa.name.replace(/[[\]]/g, "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-warm-text text-base mb-4">The Firm</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm hover:text-gold transition-colors">
                  About {FIRM.shortName.replace(/[[\]]/g, "")}
                </Link>
              </li>
              <li>
                <Link href="/attorneys" className="text-sm hover:text-gold transition-colors">
                  Our attorneys
                </Link>
              </li>
              {attorneys.slice(0, 3).map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/attorneys/${a.slug}`}
                    className="text-sm text-warm-muted hover:text-gold transition-colors"
                  >
                    {a.fullName.replace(/[[\]]/g, "")}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/results" className="text-sm hover:text-gold transition-colors">
                  Notable matters
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm hover:text-gold transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-sm hover:text-gold transition-colors">
                  Client testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-warm-text text-base mb-4">Contact & Offices</h4>
            <ul className="space-y-3 text-sm">
              {FIRM.offices.map((off) => (
                <li key={off.id} className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                  <div>
                    <p className="text-warm-text">{off.name.replace(/[[\]]/g, "")}</p>
                    <p className="text-warm-muted">{off.address.replace(/[[\]]/g, "")}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="h-4 w-4 text-gold shrink-0" />
                <a href={`tel:${FIRM.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold transition-colors">
                  {FIRM.phone.replace(/[[\]]/g, "")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-4 w-4 text-gold shrink-0" />
                <a href={`mailto:${FIRM.email}`} className="hover:text-gold transition-colors">
                  {FIRM.email.replace(/[[\]]/g, "")}
                </a>
              </li>
              <li className="pt-2 text-xs uppercase tracking-widgold text-warm-muted">
                {FIRM.hours.weekday.replace(/[[\]]/g, "")}
                <br />
                {FIRM.hours.saturday.replace(/[[\]]/g, "")}
                <br />
                {FIRM.hours.sunday.replace(/[[\]]/g, "")}
              </li>
            </ul>
          </div>
        </div>

        <Divider className="mt-8 md:mt-12 mb-4 md:mb-6 !border-gray-200" />

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center md:justify-between text-xs text-warm-muted leading-relaxed">
          <p>
            © {new Date().getFullYear()} {FIRM.name.replace(/[[\]]/g, "")}. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-4 md:gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Use
            </Link>
            <Link href="/cookie-notice" className="hover:text-gold transition-colors">
              Cookies
            </Link>
            <Link href="/accessibility" className="hover:text-gold transition-colors">
              Accessibility
            </Link>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">
              Legal Disclaimer
            </Link>
          </nav>
        </div>

        <p className="mt-4 md:mt-6 max-w-3xl text-[11px] text-warm-muted/80 leading-relaxed">
          [LEGAL DISCLAIMER PLACEHOLDER: This website and its contents are provided for general
          informational purposes only and do not constitute legal advice, legal opinion, or a
          solicitation. Transmission or receipt of information through this website, including the
          chat assistant, does not create a lawyer-client relationship. You should not act or
          refrain from acting on the basis of any content on this site without seeking appropriate
          legal advice from a qualified lawyer admitted to practice in the relevant jurisdiction.]
        </p>
      </div>
    </footer>
  );
}
