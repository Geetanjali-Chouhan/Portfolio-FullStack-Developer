import type { ComponentType } from "react";
import {
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
} from "react-icons/si";
import { Code, ShieldCheck, Webhook } from "lucide-react";

export type Skill = {
  name: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  /** Brand colour of the logo. */
  color: string;
};

export type SkillCategory = {
  title: string;
  blurb: string;
  skills: Skill[];
};

/**
 * Core lists come from the portfolio brief. Redux Toolkit, Socket.IO and
 * Mongoose are additions taken from her public GitHub README / repositories.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    blurb: "Responsive, accessible interfaces",
    skills: [
      { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", Icon: SiCss, color: "#1572b6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#d9b800" },
      { name: "React.js", Icon: SiReact, color: "#0ea5e9" },
      { name: "Next.js", Icon: SiNextdotjs, color: "var(--color-ink)" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06b6d4" },
      { name: "Redux Toolkit", Icon: SiRedux, color: "#764abc" },
    ],
  },
  {
    title: "Backend",
    blurb: "APIs and server-side logic",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { name: "Express.js", Icon: SiExpress, color: "var(--color-ink)" },
      { name: "REST APIs", Icon: Webhook, color: "#2563eb" },
      { name: "Authentication", Icon: ShieldCheck, color: "#2563eb" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "var(--color-ink)" },
    ],
  },
  {
    title: "Database",
    blurb: "Data modelling and storage",
    skills: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
      { name: "Mongoose", Icon: SiMongoose, color: "#a22a2a" },
    ],
  },
  {
    title: "Tools",
    blurb: "Everyday developer workflow",
    skills: [
      { name: "Git", Icon: SiGit, color: "#f05032" },
      { name: "GitHub", Icon: SiGithub, color: "var(--color-ink)" },
      { name: "VS Code", Icon: Code, color: "#007acc" },
      { name: "npm", Icon: SiNpm, color: "#cb3837" },
    ],
  },
];
