import { Person } from "@/features/person";
import { supabase } from "..";

const MAX_PROFILES = 10;

export async function getOne(id: string) {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: profile, error } = await supabase
		.from("profiles")
		.select(
			"*, following:follows!follows_follower_id_fkey(followed_id), followers:follows!follows_followed_id_fkey(follower_id)"
		)
		.eq("id", id)
		.single();

	if (error) throw error;

	return {
		...profile,
		following: profile.following.length,
		followers: profile.followers.length,
		is_user_following: profile.followers.some(
			(follower) => follower.follower_id === session.user.id
		),
	};
}

export async function searchProfiles(query: string, page: number) {
	const to = page * MAX_PROFILES;
	const from = to - MAX_PROFILES;

	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.ilike("name", `%${query}%`)
		.range(from, to);

	if (error) throw error;

	const profiles = data.slice(0, MAX_PROFILES);
	const nextPost = data.slice(MAX_PROFILES);

	return {
		profiles,
		nextCursor: nextPost.length ? page + 1 : undefined,
	};
}
