

import { z } from 'zod';

export const projectSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    descriptions: z.string().min(1, "Description is required"),
    liveLink: z.string().url("Invalid URL format").min(1, "Live link is required"),
    image: z.string().url("Invalid URL format").optional(),
    githubClient: z.string().url("Invalid URL format").optional(),
    githubServer: z.string().url("Invalid URL format").optional(),
    techStack: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    category: z.string().optional(),
    isTeamProject: z.boolean().optional().default(false),
    contributors: z.array(z.string()).optional(),
    videoDemo: z.string().url("Invalid URL format").optional()
});

export type TProject = z.infer<typeof projectSchema>;