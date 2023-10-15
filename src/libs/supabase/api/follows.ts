import { QueryClient } from "@tanstack/react-query";
import { convertKeysToCamelCase } from "@/utils/objects";
import Person from "@/features/person-card/types/Person";
import { supabase } from "..";
import { Database } from "../types/database.types";
import { getPage, getRange } from "../utils/pagination";
import { formatPerson } from "../utils/map";

type NewFollow = Database["public"]["Tables"]["follows"]["Insert"] & {
	is_user_following: boolean;
};

type Follow = {
	createdAt: string;
	followedId: string;
	followerId: string;
};

export const getFollowing = async (userId: string, page: number) => {
	const { from, to } = getRange(page);

	const { data: following, error } = await supabase
		.from("follows")
		.select("profiles!follows_followed_id_fkey(*)")
		.eq("follower_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const flattenFollowers = following.map((follower) => follower.profiles);
	const camelCaseFollowing = flattenFollowers.map(formatPerson);

	return getPage<Person>(camelCaseFollowing, page);
};

export const getFollowers = async (userId: string, page: number) => {
	const { from, to } = getRange(page);

	const { data: followers, error } = await supabase
		.from("follows")
		.select("profiles!follows_follower_id_fkey(*)")
		.eq("followed_id", userId)
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	const flattenFollowers = followers.map((follower) => follower.profiles);
	const camelCaseFollowers = flattenFollowers.map(formatPerson);

	return getPage<Person>(camelCaseFollowers, page);
};

export const toggleFollow = async (newFollow: NewFollow): Promise<Follow> => {
	const { is_user_following, ...rest } = newFollow;

	if (is_user_following) {
		const { data: unfollowed, error } = await supabase
			.from("follows")
			.delete()
			.match(rest)
			.select()
			.single();

		if (error) throw error;

		return convertKeysToCamelCase<Follow>(unfollowed);
	} else {
		const { data: followed, error } = await supabase
			.from("follows")
			.insert(rest)
			.select()
			.single();

		if (error) throw error;

		return convertKeysToCamelCase<Follow>(followed);
	}
};

export function handleFollowSuccess(follow: Follow, queryClient: QueryClient) {
	const { followedId, followerId } = follow;

	queryClient.invalidateQueries({
		queryKey: ["profile", followedId],
	});
	queryClient.invalidateQueries({
		queryKey: ["followers", followedId],
	});
	queryClient.invalidateQueries({
		queryKey: ["profile", followerId],
	});
	queryClient.invalidateQueries({
		queryKey: ["following", followerId],
	});
}
