import { z } from "zod";

export type CommentSchema = z.infer<typeof CommentSchema>;

export const CommentSchema = z.object({
	content: z.string().min(1).max(280),
});
