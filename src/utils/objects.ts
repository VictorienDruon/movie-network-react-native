export type ObjectWithLikes = { likes: { user_id: string }[] };

export function formatPost<T extends ObjectWithLikes>(post: T, userId: string) {
	const { likes, ...rest } = post;
	return {
		...rest,
		user_has_liked_post: likes.some((like) => like.user_id === userId),
	};
}
