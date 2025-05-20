

import { z } from "zod";

export const skillCategoryEnum = z.enum([
    "Technical",
    "Soft",
    "Front-end",
    "Backend",
    "UI-Tools",
]);

export const skillsSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z
        .string()
        .max(500, "Description is too long")
        .optional(),
    image: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
    skillCategory: skillCategoryEnum,
});

export type TSkills = z.infer<typeof skillsSchema>;
export type TSkillCategory = z.infer<typeof skillCategoryEnum>;