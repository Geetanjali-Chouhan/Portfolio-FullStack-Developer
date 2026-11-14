import { Download, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
    external: false,
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
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Have a project, an opportunity or just a question? Send a message and I'll get back to you."
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal>
          <ul className="space-y-4">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-royal-50 text-accent transition-colors duration-300 group-hover:bg-royal group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                      {label}
                    </span>
                    <span className="block truncate font-semibold text-heading">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 rounded-2xl border border-line bg-mist p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-card text-accent shadow-sm">
                <MapPin className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                  Based in
                </span>
                <span className="block font-semibold text-heading">{site.location}</span>
              </span>
            </li>
          </ul>

          <ButtonLink
            href={site.resume.href}
            download={site.resume.filename}
            variant="navy"
            className="mt-6 w-full sm:w-auto"
          >
            <Download className="size-4" aria-hidden />
            Download Resume
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm fallbackEmail={site.email} />
        </Reveal>
      </div>
    </Section>
  );
}
