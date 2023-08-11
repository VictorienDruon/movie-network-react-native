import { z } from "zod";

export const CommentSchema = z.object({
	content: z.string().min(1).max(280),
});

export type CommentSchema = z.infer<typeof CommentSchema>;
