import { cacheLife } from "next/cache";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { navLinks, site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { Avatar } from "@/components/ui/Avatar";

// Cached so reading the clock doesn't make the whole page dynamic.
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
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-3" aria-label="Back to top">
              <Avatar src={getProfilePhoto()} />
              <span>
                <span className="block font-bold text-heading">{site.name}</span>
                <span className="block text-sm text-muted">{site.role}</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Building modern web experiences with clean code and creative thinking.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-bold tracking-wide text-heading uppercase">Quick links</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold tracking-wide text-heading uppercase">Connect With Me</h2>
            <ul className="mt-4 flex gap-3">
              {social.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid size-11 place-items-center rounded-xl border border-line bg-card text-heading shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-royal hover:text-accent hover:shadow-md"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright sits in the middle column so it stays centred; "Back to top" is pushed to the right. */}
        <div className="mt-12 grid items-center gap-4 border-t border-line pt-6 text-sm sm:grid-cols-[1fr_auto_1fr]">
          <p className="justify-self-center rounded-full border border-royal-200 bg-royal-50 px-4 py-2 text-center text-xs font-semibold text-heading shadow-sm sm:col-start-2 sm:px-6 sm:text-sm">
            © <CurrentYear /> <span className="text-accent">{site.name}</span>. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-2 justify-self-center font-semibold text-muted transition-colors hover:text-accent sm:col-start-3 sm:row-start-1 sm:justify-self-end"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
