import { QueryClient } from "@tanstack/react-query";
import Person from "@/features/person-card/types/Person";
import { supabase } from "..";
import { Database } from "../types/database.types";
import { isUserFollowing } from "../utils/filter";
import { getPage, getRange } from "../utils/pagination";
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

export async function updateProfile({
	id,
	updates,
}: {
	id: string;
	updates: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
}) {
	const { data: profile, error } = await supabase
		.from("profiles")
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;

	return profile;
}

export const handleProfileUpdated = (
	userId: string,
	queryClient: QueryClient
) => {
	queryClient.invalidateQueries({ queryKey: ["user"] });
	queryClient.invalidateQueries({ queryKey: ["profile", userId] });
};
