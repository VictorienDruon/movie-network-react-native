import { supabase } from "..";
import { Database } from "../types/database.types";

export type NewFollow = Database["public"]["Tables"]["follows"]["Insert"] & {
	is_user_following: boolean;
};

export const getFollowing = async (
	userId: string,
	pageParam: number,
	pageCount = 10
) => {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const { data, error } = await supabase
		.from("follows")
		.select("profiles!follows_followed_id_fkey(*)")
		.eq("follower_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const users = data.slice(0, pageCount).flatMap((user) => user.profiles);
	const nextUser = data.slice(pageCount);

	return {
		users,
		nextCursor: nextUser.length ? pageParam + 1 : undefined,
	};
};

export const getFollowers = async (
	userId: string,
	pageParam: number,
	pageCount = 10
) => {
	const from = pageParam * pageCount;
	const to = from + pageCount;

	const { data, error } = await supabase
		.from("follows")
		.select("profiles!follows_follower_id_fkey(*)")
		.eq("followed_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const users = data.slice(0, pageCount).flatMap((user) => user.profiles);
	const nextUser = data.slice(pageCount);

	return {
		users,
		nextCursor: nextUser.length ? pageParam + 1 : undefined,
	};
};

export const toggle = async (newFollow: NewFollow) => {
	const { is_user_following, ...follow } = newFollow;

	if (is_user_following) {
		const { error } = await supabase.from("follows").delete().match(follow);

		if (error) throw error;

		return newFollow;
	} else {
		const { error } = await supabase.from("follows").insert(follow);

		if (error) throw error;

		return newFollow;
	}
};
