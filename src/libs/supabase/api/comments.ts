import { QueryClient } from "@tanstack/react-query";
import { convertKeysToCamelCase } from "@/utils/objects";
import Comment from "@/features/comment-card/types/Comment";
import { supabase } from "..";
import { Database } from "../types/database.types";
import { getPage, getRange } from "../utils/pagination";

type NewComment = Database["public"]["Tables"]["comments"]["Insert"];

export async function getCommentsByPost(postId: string, page: number) {
	const { from, to } = getRange(page);

	const { data: comments, error } = await supabase
		.from("comments")
		.select("*, author: profiles(*)")
		.eq("post_id", postId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const camelCaseComments = comments.map(convertKeysToCamelCase<Comment>);

	return getPage<Comment>(camelCaseComments, page);
}

export async function getCommentsByUser(userId: string, page: number) {
	const { from, to } = getRange(page);

	const { data: comments, error } = await supabase
		.from("comments")
		.select("*, author: profiles(*)")
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const camelCaseComments = comments.map(convertKeysToCamelCase<Comment>);

	return getPage<Comment>(camelCaseComments, page);
}

export async function createComment(newComment: NewComment): Promise<Comment> {
	const { data: comment, error } = await supabase
		.from("comments")
		.insert(newComment)
		.select()
		.single();

	if (error) throw error;

	return convertKeysToCamelCase<Comment>(comment);
}

export function handleCommentSuccess(
	comment: Comment,
	queryClient: QueryClient
) {
	const { postId, userId } = comment;

	queryClient.invalidateQueries({ queryKey: ["comments", postId] });
	queryClient.invalidateQueries({ queryKey: ["comments", userId] });
}
