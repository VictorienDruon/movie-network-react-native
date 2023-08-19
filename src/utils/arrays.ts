import {
	ObjectWithDate,
	ObjectWithLikes,
	compareByDateAscending,
	compareByDateDescending,
	formatPost,
} from "./objects";

export function sortItems<T extends ObjectWithDate>(
	items: T[],
	ascending = false
) {
	return ascending
		? items.slice().sort(compareByDateAscending)
		: items.slice().sort(compareByDateDescending);
}

export function formatPosts<T extends ObjectWithLikes & ObjectWithDate>(
	posts: T[],
	userId: string,
	ascending = false
) {
	const formattedPosts = posts.map((post) => formatPost(post, userId));
	return sortItems(formattedPosts, ascending);
}
