import Image from "next/image";
import { Download, Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";

const channels = [
  {
    label: "Direct Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
    external: false,
  },
  {
    label: "WhatsApp Chat",
    value: "Send a message",
    href: site.whatsapp,
    Icon: MessageCircle,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "geetanjali-chouhan",
    href: site.links.linkedin,
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "GitHub",
    value: site.githubUser,
    href: site.links.github,
    Icon: FaGithub,
    external: true,
  },
];

export function Contact() {
  const photo = getProfilePhoto();

  return (
    <Section
      id="contact"
      eyebrow="Initiate Contact"
      title="Let's Build Something Meaningful Together."
      description="Whether you have an upcoming project, open role, or just want to connect, feel free to reach out."
      tone="dark"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#C5A46D]/40 bg-[#142B50]/60 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-12">
        {/* Ambient atmospheric lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-radial from-[#C5A46D]/20 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-radial from-[#2563EB]/20 to-transparent blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 items-center">
          {/* Left Column: Profile Card & Direct Channels */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#C5A46D] bg-[#0B1428] shadow-gold">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={site.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span className="grid h-full place-items-center font-editorial font-bold text-[#DFCA9F]">
                      {site.monogram}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-white sm:text-3xl">
                    {site.name}
                  </h3>
                  <p className="text-xs font-mono text-[#DFCA9F]">
                    {site.role}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#AAB5C5]">
                Available for frontend engineering, full-stack development, and collaborative digital opportunities. Reach out via form or any direct channel below.
              </p>

              {/* Contact Channels Grid */}
              <ul className="grid gap-3 sm:grid-cols-2">
                {channels.map(({ label, value, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-3 rounded-2xl border border-[#C5A46D]/30 bg-[#0B1428]/80 p-3.5 shadow-xs transition-all duration-300 hover:scale-[1.02] hover:border-[#C5A46D] hover:bg-[#0B1428]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#C5A46D]/30 bg-[#142B50] text-[#DFCA9F] transition-colors duration-200 group-hover:bg-[#C5A46D] group-hover:text-[#0B1428]">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-semibold tracking-wider text-[#AAB5C5] uppercase">
                          {label}
                        </span>
                        <span className="block truncate text-xs font-medium text-white group-hover:text-[#DFCA9F]">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Location Card with Google Maps */}
              <a
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl border border-[#C5A46D]/30 bg-[#0B1428]/80 p-3.5 shadow-xs transition-all duration-300 hover:scale-[1.02] hover:border-[#C5A46D]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#C5A46D]/30 bg-[#142B50] text-[#DFCA9F] group-hover:bg-[#C5A46D] group-hover:text-[#0B1428]">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <div>
                  <span className="block text-[10px] font-semibold tracking-wider text-[#AAB5C5] uppercase">
                    Location (Open in Google Maps)
                  </span>
                  <span className="block text-xs font-medium text-white group-hover:text-[#DFCA9F]">
                    {site.fullLocation}
                  </span>
                </div>
              </a>

              {/* Resume Download CTA */}
              <div className="pt-2">
                <ButtonLink
                  href={site.resume.href}
                  download={site.resume.filename}
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto shadow-gold"
                >
                  <Download className="size-4 text-[#0B1428]" aria-hidden />
                  Download Curriculum Vitae (PDF)
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Form */}
          <Reveal delay={0.1}>
            <ContactForm fallbackEmail={site.email} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
