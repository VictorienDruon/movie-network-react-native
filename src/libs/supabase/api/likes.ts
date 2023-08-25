import { formatPosts } from "@/utils/arrays";
import { supabase } from "..";
import { Database } from "../types/database.types";

type NewLike = Database["public"]["Tables"]["likes"]["Insert"] & {
	userHasLikedPost: boolean;
};

export async function getAllByUser({ userId, pageParam, pageCount = 10 }) {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data, error } = await supabase
		.from("likes")
		.select("posts(*, author: profiles(*), likes(user_id))")
		.eq("user_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const likes = data.slice(0, pageCount).flatMap((like) => like.posts);
	const nextLike = data.slice(pageCount);

	return {
		likes: formatPosts(likes, session.user.id),
		nextCursor: nextLike.length ? pageParam + 1 : undefined,
	};
}

export async function toggle(newLike: NewLike) {
	const { userHasLikedPost, ...like } = newLike;

	if (userHasLikedPost) {
		const { data, error } = await supabase.from("likes").delete().match(like);

		if (error) throw error;

		return data;
	} else {
		const { data, error } = await supabase.from("likes").insert(like);

		if (error) throw error;

		return data;
	}
}
