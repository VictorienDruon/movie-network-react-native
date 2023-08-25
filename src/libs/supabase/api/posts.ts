import { formatPost } from "@/utils/objects";
import { formatPosts } from "@/utils/arrays";
import { supabase } from "..";
import { Database } from "../types/database.types";

export type NewPost = Database["public"]["Tables"]["posts"]["Insert"];

export async function getOne(id: string) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: post, error } = await supabase
		.from("posts")
		.select("*, author: profiles(*), likes(user_id)")
		.eq("id", id)
		.single();

	if (error) throw error;

	return formatPost(post, session.user.id);
}

export async function getAll(pageParam: number, pageCount = 10) {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data, error } = await supabase
		.from("posts")
		.select("*, author: profiles(*), likes(user_id)")
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const posts = data.slice(0, pageCount);
	const nextPost = data.slice(pageCount);

	return {
		posts: formatPosts(posts, session.user.id),
		nextCursor: nextPost.length ? pageParam + 1 : undefined,
	};
}

export async function getAllByUser(
	userId: string,
	pageParam: number,
	pageCount = 10
) {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data, error } = await supabase
		.from("posts")
		.select("*, author: profiles(*), likes(user_id)")
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const posts = data.slice(0, pageCount);
	const nextPost = data.slice(pageCount);

	return {
		posts: formatPosts(posts, session.user.id),
		nextCursor: nextPost.length ? pageParam + 1 : undefined,
	};
}

export async function create(newPost: NewPost) {
	const { error } = await supabase.from("posts").insert(newPost);

	if (error) throw error;

	return newPost;
}
