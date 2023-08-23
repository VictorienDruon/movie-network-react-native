import { supabase } from "..";
import { Database } from "../types/database.types";

type NewComment = Database["public"]["Tables"]["comments"]["Insert"];

interface GetAllArgs {
	postId: string;
	pageCount?: number;
	pageParam?: number;
}

export async function getAll({
	postId,
	pageCount = 10,
	pageParam = 0,
}: GetAllArgs) {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const { data, error } = await supabase
		.from("comments")
		.select("*, author: profiles(*)")
		.eq("post_id", postId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const comments = data.slice(0, pageCount);
	const nextComment = data.slice(pageCount);

	return {
		comments,
		nextCursor: nextComment.length ? pageParam + 1 : undefined,
	};
}

export async function create(newComment: NewComment) {
	const { data, error } = await supabase.from("comments").insert(newComment);

	if (error) throw error;

	return data;
}
