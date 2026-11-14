export type ExperienceItem = {
  company: string;
  role: string;
  type: string;
  duration: string;
  summary: string;
  /**
   * Responsibilities / contributions. Intentionally EMPTY: they could not be
   * verified from public sources. Add real bullet points here and they will
   * appear on the timeline automatically.
   */
  highlights: string[];
  /** Technologies used in this role. Left empty until confirmed. */
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Vijay Mantra",
    role: "Frontend Developer Intern",
    type: "Internship",
    duration: "7 months",
    summary: "Seven months as a Frontend Developer Intern at Vijay Mantra.",
    highlights: [],
    stack: [],
  },
];
