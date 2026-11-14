"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";

function useActiveSection(): string {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-16 items-center justify-between rounded-full border px-4 transition-all duration-300 sm:px-6",
          scrolled || open
            ? "border-[#C5A46D]/40 bg-[#0B1428]/90 shadow-2xl backdrop-blur-md text-white"
            : "border-[#C5A46D]/25 bg-white/75 shadow-card backdrop-blur-md text-[#0B1428]"
        )}
      >
        {/* Brand Name / Monogram */}
        <a
          href="#home"
          aria-label={`${site.name} — back to top`}
          className="group flex items-center gap-3"
        >
          <div className="relative size-9 overflow-hidden rounded-full border border-[#C5A46D] shadow-xs">
            <Avatar src={photo} className="size-full" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-editorial text-lg font-bold tracking-tight">
              GEETANJALI
            </span>
            <Sparkles className="size-3 text-[#C5A46D]" aria-hidden />
          </div>
        </a>

        {/* Center Nav Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors duration-200",
                    isActive
                      ? scrolled
                        ? "text-[#DFCA9F] bg-white/10"
                        : "text-[#0B1428] bg-[#C5A46D]/20 font-bold"
                      : scrolled
                        ? "text-[#AAB5C5] hover:text-white"
                        : "text-[#64748B] hover:text-[#0B1428]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 size-1 rounded-full bg-[#C5A46D]"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2">
          <ButtonLink
            href="#contact"
            variant="luxury-outline"
            size="sm"
            className={cn(
              "group relative hidden sm:inline-flex items-center justify-center gap-0 overflow-hidden rounded-full border-2 border-[#C5A46D] bg-transparent transition-all duration-300 hover:bg-linear-to-r hover:from-[#DFCA9F] hover:via-[#C5A46D] hover:to-[#9A7B45] hover:text-[#0B1428] hover:border-[#C5A46D] hover:shadow-gold hover:scale-105",
              scrolled ? "text-[#DFCA9F]" : "text-[#0B1428]"
            )}
          >
            <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
              Let&apos;s Connect
            </span>
            <span className="inline-flex max-w-0 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-w-5 group-hover:opacity-100 group-hover:translate-x-1">
              <ArrowRight className="size-3.5 shrink-0 text-[#0B1428] transition-transform duration-300 -translate-x-2.5 group-hover:translate-x-0" />
            </span>
          </ButtonLink>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className={cn(
              "grid size-10 place-items-center rounded-full border transition-colors lg:hidden",
              scrolled
                ? "border-[#C5A46D]/40 text-white hover:bg-white/10"
                : "border-[#C5A46D]/30 text-[#0B1428] hover:bg-black/5"
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="mt-2 rounded-3xl border border-[#C5A46D]/40 bg-[#0B1428]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-2xl px-4 text-sm font-semibold tracking-wide transition-colors",
                    active === link.id
                      ? "bg-[#142B50] text-[#DFCA9F]"
                      : "text-[#E8EDF5] hover:bg-white/5"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-[#C5A46D]/20">
            <ButtonLink
              href="#contact"
              variant="luxury-outline"
              size="md"
              className="group relative flex w-full items-center justify-center gap-0 overflow-hidden rounded-full border-2 border-[#C5A46D] bg-transparent text-[#DFCA9F] font-semibold transition-all duration-300 hover:bg-linear-to-r hover:from-[#DFCA9F] hover:via-[#C5A46D] hover:to-[#9A7B45] hover:text-[#0B1428] hover:border-[#C5A46D] hover:shadow-gold"
              onClick={() => setOpen(false)}
            >
              <span className="transition-transform duration-300 ease-out group-hover:-translate-x-1">
                Let&apos;s Connect
              </span>
              <span className="inline-flex max-w-0 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-w-6 group-hover:opacity-100 group-hover:translate-x-1">
                <ArrowRight className="size-4 shrink-0 text-[#0B1428] transition-transform duration-300 -translate-x-3 group-hover:translate-x-0" />
              </span>
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
