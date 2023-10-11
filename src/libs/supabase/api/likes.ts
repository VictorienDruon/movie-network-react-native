import { RawPost, formatPost } from "@/libs/supabase/utils/map";
import { supabase } from "..";
import { Database } from "../types/database.types";

export type NewLike = Database["public"]["Tables"]["likes"]["Insert"] & {
	userHasLikedPost: boolean;
};

export async function getAll(
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
		.from("likes")
		.select(
			"posts(*, author: profiles(*), likes(user_id), posts_posters(posters: poster_id(*)))"
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to)
		.returns<{ posts: RawPost }[]>();

	if (error) throw error;

	const posts = data.slice(0, pageCount).flatMap((like) => like.posts);
	const nextPost = data.slice(pageCount);

	return {
		posts: posts.map((post) => formatPost(post, session.user.id)),
		nextCursor: nextPost.length ? pageParam + 1 : undefined,
	};
}

export async function toggle(newLike: NewLike) {
	const { userHasLikedPost, ...like } = newLike;

	if (userHasLikedPost) {
		const { error } = await supabase.from("likes").delete().match(like);

		if (error) throw error;

		return newLike;
	} else {
		const { error } = await supabase.from("likes").insert(like);

		if (error) throw error;

		return newLike;
	}
}
