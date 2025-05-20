
import { z } from "zod";

export const blogSchema = z.object({
    _id: z.string().optional(),
    title: z.string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
    content: z.string()
        .min(10, "Content must be at least 10 characters")
        .max(5000, "Content must be less than 5000 characters"),
    image: z.string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")), // Allows empty string
    category: z.string()
        .min(1, "Category is required")
        .max(50, "Category must be less than 50 characters")
        .optional(),
});

export type TBlog = z.infer<typeof blogSchema>;