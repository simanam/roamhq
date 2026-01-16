"use client";

import { Logo } from "@/components/ui/logo";

const footerLinks = {
  Product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Brands", href: "#for-brands" },
    { label: "For Fleets", href: "#for-fleets" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "https://www.logixtecs.com/privacy" },
    { label: "Terms of Service", href: "https://www.logixtecs.com/terms" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  Support: [
    { label: "support@logixtecs.com", href: "mailto:support@logixtecs.com" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0d1117] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-slate-400 text-sm">
              Your Brand, In Motion.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12" />

        {/* Bottom Row */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Roam. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Maintained by Logixtecs Solutions LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
