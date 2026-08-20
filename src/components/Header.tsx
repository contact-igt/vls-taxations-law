"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "./ui/Container";
import { HeaderCta } from "./ui/Button";
import { PROGRAMME } from "@/lib/constants";
import { isRegistrationOpen } from "@/lib/programStatus";

const NAV_LINKS = [
  { href: "#why-this-course", label: "Why this course" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#faculty", label: "Faculty" },
  { href: "#faqs", label: "FAQs" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const registrationOpen = isRegistrationOpen(PROGRAMME);

  return (
    <header className="sticky top-0 z-50 border-b border-vls-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-[85px] items-center justify-between">
        <Link href="#top" className="flex items-center">
          <Image
            src="/assets/vls/brand/vls-logo.png"
            alt="VLS Law Academy"
            width={60}
            height={60}
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-vls-black transition-opacity duration-150 ease-out hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <HeaderCta href="#waitlist">
            {registrationOpen ? "Reserve Your Seat" : "Join Waitlist"}
          </HeaderCta>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-vls-black transition-transform duration-150 ease-out ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-vls-black transition-opacity duration-150 ease-out ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-vls-black transition-transform duration-150 ease-out ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-vls-border bg-white md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-vls-border-alt py-3 text-[15px] text-vls-black"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-4 flex h-12 items-center justify-center bg-vls-black text-[14px] font-bold text-vls-white"
            >
              {registrationOpen ? "Reserve Your Seat" : "Join Waitlist"}
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
