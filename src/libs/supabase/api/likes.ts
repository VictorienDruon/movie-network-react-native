import { QueryClient } from "@tanstack/react-query";
import Post from "@/features/post-card/types/Post";
import { supabase } from "..";
import { Database } from "../types/database.types";
import DbPost from "../types/Post";
import { getPage, getRange } from "../utils/pagination";
import { formatPost } from "../utils/map";
import { convertKeysToCamelCase } from "@/utils/objects";

type NewLike = Database["public"]["Tables"]["likes"]["Insert"] & {
	userHasLikedPost: boolean;
};

type Like = {
	userId: string;
	postId: string;
	createdAt: string;
};

export async function getLikes(userId: string, page: number) {
	const { from, to } = getRange(page);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: posts, error } = await supabase
		.from("likes")
		.select(
			"posts(*, author: profiles!posts_user_id_fkey(*), likes(user_id), posts_posters(posters: poster_id(*)))"
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to)
		.returns<{ posts: DbPost }[]>();

	if (error) throw error;

	const flattenPosts = posts.flatMap((post) => post.posts);
	const formattedPosts = flattenPosts.map((post) =>
		formatPost(post, session.user.id)
	);

	return getPage<Post>(formattedPosts, page);
}

export async function toggleLike(newLike: NewLike): Promise<Like> {
	const { userHasLikedPost, ...rest } = newLike;

	if (userHasLikedPost) {
		const { data: unliked, error } = await supabase
			.from("likes")
			.delete()
			.match(rest)
			.select()
			.single();

		if (error) throw error;

		return convertKeysToCamelCase<Like>(unliked);
	} else {
		const { data: liked, error } = await supabase
			.from("likes")
			.insert(rest)
			.select()
			.single();

		if (error) throw error;

		return convertKeysToCamelCase<Like>(liked);
	}
}

export function handleLikeSuccess(like: Like, queryClient: QueryClient) {
	const { postId, userId } = like;

	queryClient.invalidateQueries({
		queryKey: ["feed"],
	});
	queryClient.invalidateQueries({
		queryKey: ["posts", userId],
	});
	queryClient.invalidateQueries({
		queryKey: ["likes", userId],
	});
	queryClient.invalidateQueries({
		queryKey: ["post", postId],
	});
}
