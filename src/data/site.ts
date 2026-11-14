/**
 * Single source of truth for personal details.
 * Everything here comes from the owner's public GitHub profile / README or
 * from facts supplied directly by her. Nothing is inferred.
 */
export const site = {
  name: "Geetanjali Chouhan",
  monogram: "GC",
  role: "Frontend Developer | Full Stack Developer",
  headline:
    "Building Modern Web Experiences with Clean Code and Creative Thinking.",
  // Used for <meta description> and social previews.
  description:
    "Geetanjali Chouhan is a Frontend & Full Stack Developer (MERN) who graduated in 2024 and completed a 7-month Frontend Developer internship at Vijay Mantra. Explore her projects, skills, 3D experience and GitHub activity.",
  intro:
    "I'm a Frontend & Full Stack Developer who crafts responsive, intuitive, and modern web applications across the MERN stack — React on the front end, Node.js and Express behind it, MongoDB underneath. I care about readable code, thoughtful interfaces and shipping things that work.",
  location: "Indore, India",
  fullLocation: "Indore, Madhya Pradesh, India",
  email: "geetanjalichouhan82@gmail.com",
  whatsapp: "https://wa.me/?text=Hi%20Geetanjali,%20I%20saw%20your%20developer%20portfolio%20and%20would%20love%20to%20connect!",
  maps: "https://maps.google.com/?q=Indore,+Madhya+Pradesh,+India",
  graduationYear: 2024,
  internshipMonths: 7,
  links: {
    linkedin: "https://www.linkedin.com/in/geetanjali-chouhan-421194291/",
    github: "https://github.com/Geetanjali-Chouhan",
  },
  githubUser: "Geetanjali-Chouhan",
  resume: {
    href: "/resume/Geetanjali_Chouhan.pdf",
    filename: "Geetanjali_Chouhan_Resume.pdf",
  },
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Milestones" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
