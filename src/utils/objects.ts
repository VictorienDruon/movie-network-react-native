export type ObjectWithDate = { created_at: string };
export type ObjectWithLikes = { likes: { user_id: string }[] };

export function compareByDateAscending<T extends ObjectWithDate>(a: T, b: T) {
	return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
}

export function compareByDateDescending<T extends ObjectWithDate>(a: T, b: T) {
	return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function formatPost<T extends ObjectWithLikes>(post: T, userId: string) {
	const { likes, ...rest } = post;
	return {
		...rest,
		user_has_liked_post: likes.some((like) => like.user_id === userId),
	};
}
