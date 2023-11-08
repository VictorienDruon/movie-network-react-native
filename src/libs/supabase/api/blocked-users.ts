import { QueryClient } from "@tanstack/react-query";
import { supabase } from "..";
import { toggleFollow } from "./follows";

export async function getBlockedUsers(userId: string) {
	const { data, error } = await supabase
		.from("blocked_users")
		.select("blocked_user_id")
		.eq("blocker_user_id", userId);

	if (error) throw error;

	const blockedUserIds = data.map((blockedUser) => blockedUser.blocked_user_id);

	return blockedUserIds;
}

export async function toggleBlockUser({
	isUserBlocked,
	isUserFollowing,
	blockerUserId,
	blockedUserId,
}: {
	isUserBlocked: boolean;
	isUserFollowing: boolean;
	blockerUserId: string;
	blockedUserId: string;
}) {
	if (isUserBlocked) {
		const { error } = await supabase
			.from("blocked_users")
			.delete()
			.eq("blocker_user_id", blockerUserId)
			.eq("blocked_user_id", blockedUserId);

		if (error) throw error;
	} else {
		const { error } = await supabase.from("blocked_users").insert({
			blocker_user_id: blockerUserId,
			blocked_user_id: blockedUserId,
		});

		if (error) throw error;

		if (isUserFollowing) {
			await toggleFollow({
				follower_id: blockerUserId,
				followed_id: blockedUserId,
				is_user_following: true,
			});
		}
	}

	return { blockerUserId, blockedUserId };
}

export function handleBlockUserSuccess(
	blockerUserId: string,
	blockedUserId: string,
	queryClient: QueryClient
) {
	queryClient.invalidateQueries({
		queryKey: ["feed"],
	});
	queryClient.invalidateQueries({
		queryKey: ["profile", blockerUserId],
	});
	queryClient.invalidateQueries({
		queryKey: ["profile", blockedUserId],
	});
}
