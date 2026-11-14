import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";
import { site } from "@/data/site";
import { MotionProvider } from "@/components/MotionProvider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.links.github }],
  keywords: [
    "Geetanjali Chouhan",
    "Full Stack Developer",
    "MERN Stack",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.description,
    siteName: `${site.name} Portfolio`,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-surface text-ink">
        {/* Scroll-reveal starts elements at opacity 0; without JavaScript they would stay hidden. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"],[data-hero-greet],[data-hero-item],[data-hero-frame],[data-hero-pop],[data-hero-card],[data-hero-word]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#about"
          className="sr-only z-100 rounded-lg bg-royal px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
