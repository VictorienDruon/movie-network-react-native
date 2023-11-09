import { z } from "zod";

export const PostSchema = z.object({
	content: z.string().trim().min(1).max(2048),
});
export type PostSchema = z.infer<typeof PostSchema>;

export const CommentSchema = z.object({
	content: z.string().trim().min(1).max(280),
});
export type CommentSchema = z.infer<typeof CommentSchema>;

export const NameSchema = z.object({
	name: z.string().trim().min(1).max(24),
});
export type NameSchema = z.infer<typeof NameSchema>;
