import { z } from "zod";

export type CommentSchema = z.infer<typeof CommentSchema>;
export const CommentSchema = z.object({
	comment: z
		.string()
		.min(3, "Comments must be at least 3 characters long")
		.max(280, "Comments must be less than 280 characters long"),
});
