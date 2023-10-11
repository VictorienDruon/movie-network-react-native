import { Database } from "@/libs/supabase/types/database.types";
import Post from "@/features/post-card/types/Post";

export type RawPost = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	likes: { user_id: Database["public"]["Tables"]["likes"]["Row"]["user_id"] }[];
	posts_posters: { posters: Database["public"]["Tables"]["posters"]["Row"] }[];
};

export function formatPost(post: RawPost, userId: string) {
	const { likes, posts_posters, ...rest } = post;

	const posters =
		posts_posters.length > 0 ? posts_posters.flatMap((p) => p.posters) : [];

	const user_has_liked_post = likes.some((like) => like.user_id === userId);

	return {
		...rest,
		posters,
		user_has_liked_post,
	} as Post;
}