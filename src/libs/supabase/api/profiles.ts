import Person from "@/features/person-card/types/Person";
import { supabase } from "..";
import { isUserFollowing } from "../utils/filter";
import { getPage, getRange } from "../utils/pagination";
import { convertKeysToCamelCase } from "@/utils/objects";
import { formatPerson } from "../utils/map";

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

	const { following, followers, ...rest } = profile;

	return {
		...formatPerson(rest),
		following: profile.following.length,
		followers: profile.followers.length,
		isUserFollowing: isUserFollowing(profile.followers, session.user.id),
	};
}

export async function searchProfiles(query: string, page: number) {
	const { from, to } = getRange(page);

	const { data: profiles, error } = await supabase
		.from("profiles")
		.select("*")
		.ilike("name", `%${query}%`)
		.range(from, to);

	if (error) throw error;

	const formattedProfiles = profiles.map(formatPerson);

	return getPage<Person>(formattedProfiles, page);
}
