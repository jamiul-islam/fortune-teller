import React from "react";
import Link from "next/link";

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  {
    id: "legal",
    label: "Legal notice",
    href: "/legal",
  },
  {
    id: "privacy",
    label: "Privacy policy",
    href: "/privacy",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];

export default function FooterSection() {
  return (
    <footer className="w-full bg-near-black text-off-white py-6 sm:py-7 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-4">
          <p className="text-xs sm:text-sm text-off-white/70 text-center md:text-left">
            © {new Date().getFullYear()} iTellFortune. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-xs sm:text-sm text-off-white/90 hover:text-crimson-light transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center px-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
