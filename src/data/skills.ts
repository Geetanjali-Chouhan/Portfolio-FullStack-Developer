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
  SiPostman,
  SiVite,
} from "react-icons/si";
import { Code, HardDrive, Layers, ShieldCheck, Webhook } from "lucide-react";

export type Skill = {
  name: string;
  Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  level?: string;
};

export type SkillCategory = {
  title: string;
  blurb: string;
  tag: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    blurb: "Responsive, accessible & high-speed interfaces",
    tag: "Core Focus",
    skills: [
      { name: "React.js", Icon: SiReact, color: "#0284c7", level: "Advanced" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#0f172a", level: "Proficient" },
      { name: "JavaScript (ES6+)", Icon: SiJavascript, color: "#ca8a04", level: "Advanced" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#0891b2", level: "Advanced" },
      { name: "Redux Toolkit", Icon: SiRedux, color: "#7c3aed", level: "Proficient" },
      { name: "HTML5", Icon: SiHtml5, color: "#ea580c", level: "Mastery" },
      { name: "CSS3", Icon: SiCss, color: "#2563eb", level: "Mastery" },
    ],
  },
  {
    title: "Backend",
    blurb: "Scalable server architectures & real-time APIs",
    tag: "Server-side",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#16a34a", level: "Proficient" },
      { name: "Express.js", Icon: SiExpress, color: "#0f172a", level: "Proficient" },
      { name: "REST APIs", Icon: Webhook, color: "#2563eb", level: "Advanced" },
      { name: "Socket.IO", Icon: SiSocketdotio, color: "#0f172a", level: "Real-time" },
      { name: "Authentication (JWT)", Icon: ShieldCheck, color: "#059669", level: "Secure" },
    ],
  },
  {
    title: "Database",
    blurb: "Data modeling, schemas & persistent storage",
    tag: "Data Layer",
    skills: [
      { name: "MongoDB", Icon: SiMongodb, color: "#15803d", level: "NoSQL" },
      { name: "Mongoose", Icon: SiMongoose, color: "#b91c1c", level: "ODM Schemas" },
      { name: "LocalStorage", Icon: HardDrive, color: "#0284c7", level: "Client-side" },
      { name: "Data Modeling", Icon: Layers, color: "#d97706", level: "Architecture" },
    ],
  },
  {
    title: "Tools & Flow",
    blurb: "Modern developer workflow & quality tooling",
    tag: "Workflow",
    skills: [
      { name: "Git", Icon: SiGit, color: "#dc2626", level: "Version Control" },
      { name: "GitHub", Icon: SiGithub, color: "#0f172a", level: "CI/CD & Collab" },
      { name: "VS Code", Icon: Code, color: "#0284c7", level: "Primary IDE" },
      { name: "Postman", Icon: SiPostman, color: "#ea580c", level: "API Testing" },
      { name: "Vite", Icon: SiVite, color: "#7c3aed", level: "Build Tool" },
      { name: "npm", Icon: SiNpm, color: "#dc2626", level: "Package Mgr" },
    ],
  },
];
