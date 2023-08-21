import { formatPost } from "@/utils/objects";
import { formatPosts } from "@/utils/arrays";
import { supabase } from "..";
import { Database } from "../types/database.types";

type NewPost = Database["public"]["Tables"]["posts"]["Insert"];

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

export async function getAll() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: posts, error } = await supabase
		.from("posts")
		.select("*, author: profiles(*), likes(user_id)");

	if (error) throw error;

	return formatPosts(posts, session.user.id);
}

export async function create(newPost: NewPost) {
	const { data, error } = await supabase.from("posts").insert(newPost);

	if (error) throw error;

	return data;
}
