import { supabase } from "..";

export async function getProfile(id?: string) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!id) id = session.user.id;

	const { data: profile, error } = await supabase
		.from("profiles")
		.select(
			"*, posts(*, author: profiles(*), likes(user_id)), comments(*, author: profiles(*)), likes(posts(*, author: profiles(*), likes(user_id)))"
		)
		.eq("id", id)
		.single();

	if (error) throw error;

	const posts = profile.posts.map((post) => ({
		...post,
		user_has_liked_post: !!post.likes.find(
			(like) => like.user_id === session.user.id
		),
	}));

	const likes = profile.likes.map((like) => ({
		...like.posts,
		user_has_liked_post: !!like.posts.likes.find(
			(like) => like.user_id === session.user.id
		),
	}));

	return {
		...profile,
		posts,
		likes,
	};
}
