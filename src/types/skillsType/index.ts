// export type TSkillCategory = 'Technical' | 'Soft' | 'Front-end' | 'Backend' | 'UI-Tools';

import { TSkills } from "@/components/dashboardComponents/skills/skillsSchema";
import { MultiSelectOption } from "../projectType";

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
  sPinned: boolean;
};

export const defaultSkillsValus: TSkills = {
  name: "",
  title: "",
  description: "",
  image: "",
  skillCategory: [],
  sPinned: false,
};

export const SKILLS_CATEGORY_OPTIONS = [
  { label: "None", value: "__NONE__" },
  { label: "Technical", value: "Technical" },
  { label: "Soft", value: "Soft" },
  { label: "Front-End", value: "Front-end" },
  { label: "Backend", value: "Backend" },
  { label: "UI-Tools", value: "UI-Tools" },
] as const;

// multi category skills
export const SKILLS_CATEGORY: MultiSelectOption[] = [
  { id: 1, name: "UI-Tools", value: "UI-Tools" },
  { id: 2, name: "Technical", value: "Technical" },
  { id: 3, name: "Soft", value: "Soft" },
  { id: 4, name: "Front-End", value: "Front-end" },
  { id: 5, name: "Backend", value: "Backend" },
];
