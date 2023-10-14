import DbPost from "../types/Post";

export function isUserFollowing(userId: string, followerId: string) {
	return userId === followerId;
}

export function hasUserLikedPost(likes: DbPost["likes"], userId: string) {
	return likes.some((like) => like.user_id === userId);
}
