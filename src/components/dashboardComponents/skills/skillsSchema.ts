// import { SkillCategory } from "@/types/skillsType";
import { z } from "zod";

// export const skillCategoryEnum = z.enum([
//   "Technical",
//   "Soft",
//   "Front-end",
//   "Backend",
//   "UI-Tools",
// ]);

// const skillCategorySchema = z.union([
//   z.nativeEnum(SkillCategory),
//   z.literal(""),
// ]);

// const skillCategorySchema = z.preprocess(
//   (val) => {
//     if (val === "__NONE__") return "";
//     return val;
//   },
//   z.union([z.nativeEnum(SkillCategory), z.literal("")]),
// ) as z.ZodType<"" | SkillCategory>;

// export const skillsSchema = z.object({
//   _id: z.string().optional(),
//   title: z.string().min(1, "Title is required").max(100, "Title is too long"),
//   description: z.string().max(500, "Description is too long").optional(),
//   image: z
//     .string()
//     .url("Please enter a valid URL")
//     .optional()
//     .or(z.literal("")),
//   skillCategory: skillCategoryEnum,
// });

// Create skills schema
export const creatSkillsSchema = z.object({
  //   body: z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),

  title: z.string().max(500, "Description is too long").optional(),

  description: z.string().max(1000, "Description is too long").optional(),

  image: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  // skillCategory: skillCategorySchema.optional(),
  skillCategory: z.array(z.string()).optional(),
  sPinned: z.boolean().optional(),
  //   }),
});

// Update skills shema
export const updateSkillsSchema = z.object({
  // body: z.object({
  name: z
    .string()
    .max(100, "Name is too long, not exist 100 charecter")
    .optional(),

  title: z.string().max(500, "Description is too long").optional(),

  description: z.string().max(1000, "Description is too long").optional(),

  image: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  // skillCategory: skillCategorySchema.optional(),
  skillCategory: z.array(z.string()).optional(),
  sPinned: z.boolean().optional(),
  // }),
});

export type TSkills = z.infer<typeof creatSkillsSchema>;
export type TUpdateSkills = z.infer<typeof updateSkillsSchema>;
// export type TSkillCategory = z.infer<typeof skillCategoryEnum>;
