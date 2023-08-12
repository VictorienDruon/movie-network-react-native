import { supabase } from "..";
import { Database } from "../types/database.types";

type NewComment = Database["public"]["Tables"]["comments"]["Insert"];

export async function getComments(postId: string) {
	const { data: comments, error } = await supabase
		.from("comments")
		.select("*, author: profiles(*)")
		.eq("post_id", postId);
	if (error) throw error;
	return comments;
}

export async function addComment(newComment: NewComment) {
	const { data, error } = await supabase.from("comments").insert(newComment);
	if (error) throw error;
	return data;
}
