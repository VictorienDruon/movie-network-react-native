import { convertKeysToCamelCase } from "@/utils/objects";
import Post from "@/features/post-card/types/Post";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import DbPost from "../types/Post";
import { hasUserLikedPost } from "./filter";

function formatPoster({ posters }: DbPost["posts_posters"][number]): Poster {
	return {
		id: posters.id,
		title: posters.title,
		posterPath: posters.poster_path,
		backdropPath: posters.backdrop_path,
		type: posters.type as "movie" | "tv" | "collection",
	};
}

export function formatPost(post: DbPost, userId: string): Post {
	return {
		id: post.id,
		content: post.content,
		createdAt: post.created_at,
		posters: post.posts_posters.map(formatPoster),
		author: convertKeysToCamelCase<Person>(post.author),
		userHasLikedPost: hasUserLikedPost(post.likes, userId),
	};
}
