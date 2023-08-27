import { supabase } from "..";

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
