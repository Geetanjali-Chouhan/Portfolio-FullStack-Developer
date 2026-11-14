/**
 * Single source of truth for personal details.
 * Everything here comes from the owner's public GitHub profile / README or
 * from facts supplied directly by her. Nothing is inferred.
 */
export const site = {
  name: "Geetanjali Chouhan",
  monogram: "GC",
  role: "Full Stack Developer",
  headline:
    "Building Modern Web Experiences with Clean Code and Creative Thinking.",
  // Used for <meta description> and social previews.
  description:
    "Geetanjali Chouhan is a Full Stack Developer (MERN) who graduated in 2024 and completed a 7-month Frontend Developer internship at Vijay Mantra. Explore her projects, skills and GitHub activity.",
  intro:
    "I'm a Full Stack Developer who builds across the MERN stack — React on the front end, Node.js and Express behind it, MongoDB underneath. I care about readable code, thoughtful interfaces and shipping things that work.",
  location: "Indore, India", // From the public GitHub profile.
  email: "geetanjalichouhan82@gmail.com", // The address on her resume; confirmed by her 2026-11-02.
  graduationYear: 2024,
  internshipMonths: 7,
  links: {
    linkedin: "https://www.linkedin.com/in/geetanjali-chouhan-421194291/",
    github: "https://github.com/Geetanjali-Chouhan",
  },
  githubUser: "Geetanjali-Chouhan",
  resume: {
    href: "/resume/Geetanjali_Chouhan.pdf",
    filename: "Geetanjali_Chouhan_Resume.pdf", // Name the visitor's browser saves it as.
  },
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
