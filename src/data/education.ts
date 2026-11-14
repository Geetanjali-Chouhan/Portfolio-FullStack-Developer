export type EducationItem = {
  /** e.g. "Master's degree". Shown as the small label above the degree name. */
  level: string;
  degree: string;
  institution: string;
  location?: string;
  startYear: number;
  endYear: number;
  /** Shown as written, e.g. "CGPA 6.0" or "81.39%". */
  grade?: string;
};

// From her resume (Geetanjali_Chouhan.pdf), newest first.
export const education: EducationItem[] = [
  {
    level: "Master's degree",
    degree: "Master of Computer Applications (MCA)",
    institution: "School of Computer Science & IT, DAVV",
    location: "Indore",
    startYear: 2022,
    endYear: 2024,
    grade: "CGPA 6.0",
  },
  {
    level: "Bachelor's degree",
    degree: "Bachelor of Information Technology (BIT)",
    institution: "P.M.B. Gujarati Science College, DAVV",
    location: "Indore",
    startYear: 2019,
    endYear: 2022,
    grade: "81.39%",
  },
];
