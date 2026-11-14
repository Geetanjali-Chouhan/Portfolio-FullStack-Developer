import { Suspense } from "react";
import { site } from "@/data/site";
import { getProfilePhoto } from "@/lib/assets";
import { getSiteUrl } from "@/lib/site-url";
import { GsapEffects } from "@/components/effects/GsapEffects";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { GitHubActivity, GitHubSkeleton } from "@/components/sections/GitHubActivity";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

// Structured data for search engines. Only facts present on the page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: getSiteUrl(),
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Indore", addressCountry: "IN" },
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"],
};

export default function Home() {
  return (
    <>
      <GsapEffects />
      <Navbar photo={getProfilePhoto()} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Suspense fallback={<GitHubSkeleton />}>
          <GitHubActivity />
        </Suspense>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
