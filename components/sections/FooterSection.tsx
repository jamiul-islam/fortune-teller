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
    <footer className="w-full bg-[#1a1a1a] text-[#f5f0eb] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#f5f0eb]/70">
            © {new Date().getFullYear()} iTellFortune. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-sm text-[#f5f0eb]/90 hover:text-[#c0392b] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
