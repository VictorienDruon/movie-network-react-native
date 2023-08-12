import { supabase } from "..";

export async function getPosts() {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const { data: posts, error } = await supabase
		.from("posts")
		.select("*, author: profiles(*), likes(user_id)")
		.order("created_at", { ascending: false });
	if (error) throw error;
	return posts.map((post) => ({
		...post,
		user_has_liked_post: !!post.likes.find(
			(like) => like.user_id === session.user.id
		),
	}));
}
