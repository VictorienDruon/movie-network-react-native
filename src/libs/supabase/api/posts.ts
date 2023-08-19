import { formatPosts } from "@/utils/arrays";
import { supabase } from "..";

export async function getPosts() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: posts, error } = await supabase
		.from("posts")
		.select("*, author: profiles(*), likes(user_id)");

	if (error) throw error;

	return formatPosts(posts, session.user.id);
}
