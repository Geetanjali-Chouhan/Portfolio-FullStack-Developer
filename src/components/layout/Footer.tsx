import { cacheLife } from "next/cache";
import { ArrowUp, Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { navLinks, site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { Avatar } from "@/components/ui/Avatar";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

const social = [
  { href: site.links.github, label: "GitHub", Icon: FaGithub, external: true },
  { href: site.links.linkedin, label: "LinkedIn", Icon: FaLinkedinIn, external: true },
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[#C5A46D]/30 bg-[#0B1428] text-[#E8EDF5]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Info */}
          <div>
            <a href="#home" className="inline-flex items-center gap-3" aria-label="Back to top">
              <div className="size-10 overflow-hidden rounded-full border border-[#C5A46D] shadow-xs">
                <Avatar src={getProfilePhoto()} className="size-full" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-editorial text-xl font-bold tracking-tight text-white">
                  {site.name}
                </span>
                <Sparkles className="size-3.5 text-[#DFCA9F]" aria-hidden />
              </div>
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#AAB5C5]">
              Engineering high-performance web applications with clean code, scalable architecture, and timeless digital aesthetics.
            </p>
            <p className="mt-2 text-xs font-mono text-[#DFCA9F]">
              Based in {site.location} · Open for Opportunities
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-xs font-bold tracking-widest text-[#DFCA9F] uppercase">
              Navigation
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-flex py-1 text-xs text-[#AAB5C5] transition-colors duration-200 hover:text-[#DFCA9F]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h2 className="font-mono text-xs font-bold tracking-widest text-[#DFCA9F] uppercase">
              Connect Directly
            </h2>
            <ul className="mt-4 flex gap-3">
              {social.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid size-11 place-items-center rounded-full border border-[#C5A46D]/40 bg-[#142B50] text-[#DFCA9F] shadow-xs transition-all duration-300 hover:scale-110 hover:border-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0B1428]"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#AAB5C5]">
              {site.email}
            </p>
          </div>
        </div>

        {/* Copyright & Top */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#C5A46D]/20 pt-8 text-xs text-[#AAB5C5] sm:flex-row">
          <p>
            © <CurrentYear /> <span className="font-bold text-white">{site.name}</span>. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 font-mono font-semibold text-[#DFCA9F] transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
