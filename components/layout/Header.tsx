"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FIRM } from "@/lib/config";
import { Button, LinkButton } from "@/components/ui/Button";
import { useBookingModal } from "@/lib/hooks/useBookingModal";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/attorneys", label: "Attorneys" },
  { href: "/results", label: "Results" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function BookButton({ onClick }: { onClick?: () => void }) {
  const { open } = useBookingModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    open();
    onClick?.();
  };

  return (
    <LinkButton
      href="/book"
      onClick={handleClick}
      variant="primary"
      size="sm"
      leftIcon={<CalendarCheck aria-hidden="true" className="h-3.5 w-3.5" />}
      className="whitespace-nowrap"
    >
      Book
    </LinkButton>
  );
}

function getFormattedPhone() {
  return FIRM.phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
}

function CallButton({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${FIRM.phone.replace(/[^\d+]/g, "")}`}
      className={cn(
        "inline-flex h-9 items-center gap-2 px-3 text-sm font-medium rounded-lg",
        "text-warm-text hover:text-gold transition-colors",
        className
      )}
    >
      <Phone aria-hidden="true" className="h-3.5 w-3.5" />
      <span className="hidden md:inline font-medium tracking-tight">
        {getFormattedPhone()}
      </span>
    </a>
  );
}

export function Header() {
  const pathname = usePathname();
  const { open } = useBookingModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          scrolled
            ? "bg-white/90 backdrop-blur border-gold/15"
            : "bg-white/60 backdrop-blur-sm border-transparent"
        )}
      >
        <div className="container-page h-14 md:h-16 lg:h-20 flex items-center justify-between gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2 group" aria-label={`${FIRM.name} home`}>
            <Image
              src="/images/logo.png"
              alt={`${FIRM.name} logo`}
              width={36}
              height={36}
              className="h-8 w-auto md:h-9 object-contain"
              unoptimized
            />
            <span className="font-serif font-semibold text-warm-text group-hover:text-gold transition-colors text-base md:text-lg lg:text-xl leading-tight hidden sm:block">
              {FIRM.name.replace(/[[\]]/g, "")}
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  isActive(link.href)
                    ? "text-gold"
                    : "text-warm-text hover:text-gold"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-gold" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <CallButton />
            <BookButton />
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-warm-text hover:text-gold hover:border-gold transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-30 lg:hidden transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black-900/20 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white border-l border-gold/15 shadow-gold-lg flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
            <span className="font-serif font-semibold text-warm-text text-lg">
              Menu
            </span>
            <button
              type="button"
              className="h-10 w-10 rounded-lg border border-gray-300 text-warm-text hover:text-gold hover:border-gold inline-flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            <Link
              href="/"
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                pathname === "/"
                  ? "text-gold bg-gold/5"
                  : "text-warm-text hover:text-gold hover:bg-gray-100/50"
              )}
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "text-gold bg-gold/5"
                    : "text-warm-text hover:text-gold hover:bg-gray-100/50"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="gold-divider my-4" />
            <a
              href={`tel:${FIRM.phone.replace(/[^\d+]/g, "")}`}
              className="block px-4 py-3 rounded-lg text-base font-medium text-warm-text hover:text-gold hover:bg-gray-100/50"
            >
              Call {getFormattedPhone()}
            </a>
            <a
              href={`https://wa.me/${FIRM.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="block px-4 py-3 rounded-lg text-base font-medium text-warm-text hover:text-gold hover:bg-gray-100/50"
            >
              WhatsApp us
            </a>
          </nav>
          <div className="p-5 border-t border-gray-200">
            <Link
              href="/book"
              onClick={(e) => {
                e.preventDefault();
                open();
                setMobileOpen(false);
              }}
              className="w-full px-6 py-3 bg-gold text-black-900 font-medium rounded-sm hover:bg-gold-hl transition-colors text-center flex items-center justify-center gap-2"
            >
              <CalendarCheck aria-hidden="true" className="h-4 w-4" />
              Book
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
