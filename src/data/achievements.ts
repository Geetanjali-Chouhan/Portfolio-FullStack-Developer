import { site } from "./site";

export type Milestone = {
  title: string;
  detail: string;
  tag: string;
  /** Path under /public to an image preview for this milestone. */
  image?: string;
  imageAlt?: string;
};
export type Certification = {
  title: string;
  issuer: string;
  /** Free-form date shown after the issuer, e.g. "April 2026". */
  date?: string;
  url?: string;
  /** Path under /public to an image of the certificate; opens full size when clicked. */
  image?: string;
  imageAlt?: string;
};

/** Milestones are limited to facts that appear elsewhere on this site. */
export const milestones: Milestone[] = [
  {
    tag: `${site.internshipMonths} months`,
    title: "Frontend Developer Intern",
    detail: "Completed a seven-month internship at Vijay Mantra.",
    image: "/images/milestones/frontend-internship.jpg",
    imageAlt: "Frontend developer internship workspace with code and UI wireframes",
  },
  {
    tag: "MERN",
    title: "Built a real-time chat application",
    detail:
      "Designed and built a full-stack messaging app with Socket.IO, JWT auth and OTP email flows.",
    image: "/images/projects/chatting-app.webp",
    imageAlt: "Gupshup Messenger real-time chat application interface",
  },
  {
    tag: "Vanilla JS",
    title: "Built PulseCRUD without a framework",
    detail:
      "A team-management app with search, filters, light and dark themes and LocalStorage persistence — in plain HTML, CSS and JavaScript.",
    image: "/images/projects/pulsecrud.webp",
    imageAlt: "PulseCRUD team management application interface",
  },
];

/**
 * Only certifications listed on her resume. Add more here (title, issuer, date,
 * optional credential URL) and they appear automatically.
 */
export const certifications: Certification[] = [
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill – 2-Day Workshop",
    date: "April 2026",
    image: "/images/certifications/outskill-gen-ai-mastermind.webp",
    imageAlt:
      "Outskill Certificate of Completion awarded to Geetanjali Chouhan for successfully completing Generative AI Mastermind",
  },
];
