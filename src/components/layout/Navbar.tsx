"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { ResumeDownloadButton } from "@/components/ui/ResumeDownloadButton";

// Sections that exist on the page but have no nav item. They are still tracked
// so the highlight clears instead of sticking on the previous nav link.
const EXTRA_SECTIONS = ["achievements", "github"];

function useActiveSection(): string {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = [...navLinks.map((l) => l.id), ...EXTRA_SECTIONS]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A section becomes "active" while it crosses a thin band near the top third.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar({ photo }: { photo: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-surface/90 shadow-[0_1px_0_rgb(15_23_42/0.02)] backdrop-blur-md"
          : "border-transparent bg-surface/70 backdrop-blur-sm",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#home"
          aria-label={`${site.name} — back to top`}
          className="group flex items-center gap-3"
        >
          <Avatar
            src={photo}
            className="shadow-sm shadow-royal/30 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="hidden leading-tight sm:block lg:hidden xl:block">
            <span className="block text-sm font-bold text-heading">{site.name}</span>
            <span className="block text-xs text-muted">{site.role}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-accent" : "text-muted hover:text-heading",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-royal transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* max-* variant (not `hidden`) so it reliably overrides the button's own display class. */}
          <ResumeDownloadButton size="sm" className="max-[340px]:hidden" />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-line bg-card text-heading transition-colors hover:border-royal hover:text-accent lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="animate-menu-in border-t border-line bg-surface px-5 pt-3 pb-5 shadow-lg lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={cn(
                    "flex min-h-12 items-center rounded-lg px-3 text-base font-semibold transition-colors",
                    active === link.id ? "bg-royal-50 text-accent" : "text-heading hover:bg-mist",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ResumeDownloadButton className="mt-3 w-full" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
