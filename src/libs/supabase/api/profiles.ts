import { formatPosts, sortItems } from "@/utils/arrays";
import { supabase } from "..";

export async function getProfile(id?: string) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!id) id = session.user.id;

	const { data, error } = await supabase
		.from("profiles")
		.select(
			"*, posts(*, author: profiles(*), likes(user_id)), comments(*, author: profiles(*)), likes(posts(*, author: profiles(*), likes(user_id)))"
		)
		.eq("id", id)
		.single();

	if (error) throw error;

	const { posts, comments, likes, ...profile } = data;

	const rawLikes = likes.map((like) => like.posts);

	const activities = [
		{ label: "posts", items: formatPosts(posts, session.user.id) },
		{ label: "likes", items: formatPosts(rawLikes, session.user.id) },
		{ label: "comments", items: sortItems(comments) },
	];

	return {
		...profile,
		activities,
	};
}
