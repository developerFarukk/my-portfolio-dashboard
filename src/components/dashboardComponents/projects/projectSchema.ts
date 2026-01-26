// import { z } from 'zod';

// export const projectSchema = z.object({
//     _id: z.string().optional(),
//     title: z.string().min(1, "Title is required"),
//     descriptions: z.string().min(1, "Description is required"),
//     liveLink: z.string().url("Invalid URL format").min(1, "Live link is required"),
//     image: z.string().url("Invalid URL format").optional(),
//     githubClient: z.string().url("Invalid URL format").optional(),
//     githubServer: z.string().url("Invalid URL format").optional(),
//     techStack: z.array(z.string()).optional(),
//     features: z.array(z.string()).optional(),
//     category: z.string().optional(),
//     isTeamProject: z.boolean().optional().default(false),
//     contributors: z.array(z.string()).optional(),
//     videoDemo: z.string().url("Invalid URL format").optional()
// });

// export type TProject = z.infer<typeof projectSchema>;

import {
  ProjectCategory,
  ProjectPricingType,
  ProjectVisibility,
  TWebsiteType,
} from "@/types/projectType";
import { z } from "zod";

/* ---------- Sub Schemas ---------- */

// Feature description with title
const projectDescriptionTitleSchema = z.object({
  pDescriptionTitle: z.string().optional(),
  pDescriptionPoints: z.string().optional(),
});

// Project feature schema
const projectFeatureSchema = z.object({
  pFeatureTitle: z.string().min(1).optional(),
  pFeatureDescriptions: z.array(z.string()).optional(),
  pFeaturesDescriptionWithTitle: z
    .array(projectDescriptionTitleSchema)
    .optional(),
});

// Contributor schema
const contributorSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  profileLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolioLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  gitHubLink: z.string().url("Invalid URL").optional().or(z.literal("")),
});

// Review schema
const reviewSchema = z.object({
  reviewerName: z.string().optional(),
  reating: z.string().optional(),
  reviewText: z.string().optional(),
  reviewDate: z.string().optional(),
});

/* ---------- Main Project Schema ---------- */

export const projectSchema = z.object({
  pName: z.string().min(1, "Project name is required"),

  pTitle: z.string().min(1, "Project title is required"),

  pDescription: z.string().optional(),

  pLogoLink: z.string().url("Invalid URL").optional().or(z.literal("")),

  pLiveClientLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  pLiveServerLink: z.string().url("Invalid URL").optional().or(z.literal("")),

  pClientRepoLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  pServerRepoLink: z.string().url("Invalid URL").optional().or(z.literal("")),

  pOverviewVideoLink: z.array(z.string().url("Invalid URL")).optional(),

  pImageLink: z.array(z.string().url("Invalid URL")).optional(),

  pTechStack: z.array(z.string()).optional(),

  pCategory: z.nativeEnum(ProjectCategory).optional(),

  pVisibility: z.nativeEnum(ProjectVisibility).optional(),

  pPricingType: z.nativeEnum(ProjectPricingType).optional(),

  pType: z.nativeEnum(TWebsiteType).optional(),

  pFeatures: z.array(projectFeatureSchema).optional(),

  pContributors: z.array(contributorSchema).optional(),

  pReviewAvgRating: z.string().optional(),

  pReviews: z.array(reviewSchema).optional(),
});

/* ---------- Infer Type ---------- */

export type TProject = z.infer<typeof projectSchema>;
