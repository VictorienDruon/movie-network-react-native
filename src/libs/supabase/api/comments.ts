import { QueryClient } from "@tanstack/react-query";
import { convertKeysToCamelCase } from "@/utils/objects";
import Comment from "@/features/comment-card/types/Comment";
import { supabase } from "..";
import { Database } from "../types/database.types";
import { getPage, getRange } from "../utils/pagination";
import { formatComment } from "../utils/map";

type NewComment = Database["public"]["Tables"]["comments"]["Insert"];

export async function getCommentsByPost(postId: string, page: number) {
	const { from, to } = getRange(page);

	const { data: comments, error } = await supabase
		.from("comments")
		.select("*, author: profiles!comments_user_id_fkey(*)")
		.eq("post_id", postId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const formattedComments = comments.map(formatComment);

	return getPage<Comment>(formattedComments, page);
}

export async function getCommentsByUser(userId: string, page: number) {
	const { from, to } = getRange(page);

	const { data: comments, error } = await supabase
		.from("comments")
		.select("*, author: profiles!comments_user_id_fkey(*)")
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const formattedComments = comments.map(formatComment);

	return getPage<Comment>(formattedComments, page);
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

export async function deleteComment(id: string) {
	const { data, error } = await supabase
		.from("comments")
		.delete()
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;

	return data;
}

export function handleCommentSuccess(
	comment: Comment,
	queryClient: QueryClient
) {
	const { postId, userId } = comment;

	queryClient.invalidateQueries({ queryKey: ["comments", postId] });
	queryClient.invalidateQueries({ queryKey: ["comments", userId] });
}
