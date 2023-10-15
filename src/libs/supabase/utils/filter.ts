import DbPost from "../types/Post";

export function isUserFollowing(
	followers: { follower_id: string }[],
	userId: string
) {
	return followers.some((follower) => follower.follower_id === userId);
}

export function hasUserLikedPost(likes: DbPost["likes"], userId: string) {
	return likes.some((like) => like.user_id === userId);
}
