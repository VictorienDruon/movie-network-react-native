import Person from "@/features/person-card/types/Person";
import { supabase } from "..";
import { isUserFollowing } from "../utils/filter";

const MAX_PROFILES = 10;

interface Profile extends Person {
	following: number;
	followers: number;
	isUserFollowing: boolean;
}

export async function getProfile(id: string): Promise<Profile> {
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
		id: parseInt(profile.id),
		name: profile.name,
		avatarUrl: profile.avatar_url,
		following: profile.following.length,
		followers: profile.followers.length,
		isUserFollowing: profile.followers.some((follower) =>
			isUserFollowing(session.user.id, follower.follower_id)
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
