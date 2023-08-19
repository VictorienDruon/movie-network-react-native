import { Database } from "@/libs/supabase/types/database.types";

type RawPost = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	likes: { user_id: Database["public"]["Tables"]["likes"]["Row"]["user_id"] }[];
};

function compareByDateDescending<T extends { created_at: string }>(
	a: T,
	b: T
): number {
	return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function sortItems<T extends { created_at: string }>(items: T[]): T[] {
	return items.slice().sort(compareByDateDescending);
}

export function formatPosts(rawPosts: RawPost[], userId: string) {
	const posts = rawPosts.map(({ likes, ...rest }) => ({
		...rest,
		user_has_liked_post: likes.some((like) => like.user_id === userId),
	}));
	return sortItems(posts);
}
