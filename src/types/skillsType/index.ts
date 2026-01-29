// export type TSkillCategory = 'Technical' | 'Soft' | 'Front-end' | 'Backend' | 'UI-Tools';

import { TSkills } from "@/components/dashboardComponents/skills/skillsSchema";

// export type TSkills = {
//     _id?: string,
//     title: string;
//     description?: string;
//     image?: string;
//     skillCategory: TSkillCategory;
//     createdAt: string;
//     updatedAt: string;
// };

export enum SkillCategory {
  Technical = "Technical",
  Soft = "Soft",
  Frontend = "Front-end",
  Backend = "Backend",
  UiTools = "UI-Tools",
}

export type TSkillCategory = `${SkillCategory}`;

// Main type interface
export type TSkill = {
  _id?: string;
  name: string;
  title?: string;
  description?: string;
  image?: string;
  skillCategory?: TSkillCategory;
};

export const defaultSkillsValus: TSkills = {
  name: "",
  title: "",
  description: "",
  image: "",
  skillCategory: "",
};

export const SKILLS_CATEGORY_OPTIONS = [
  { label: "None", value: "__NONE__" },
  { label: "Technical", value: "Technical" },
  { label: "Soft", value: "Soft" },
  { label: "Front-End", value: "Front-end" },
  { label: "Backend", value: "Backend" },
  { label: "UI-Tools", value: "UI-Tools" },
] as const;
