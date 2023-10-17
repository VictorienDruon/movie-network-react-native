import Post from "@/features/post-card/types/Post";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import DbPost from "../types/Post";
import DbPerson from "../types/Person";
import { hasUserLikedPost } from "./filter";

function formatPoster({ posters }: DbPost["posts_media"][number]): Poster {
	return {
		id: posters.id.toString(),
		title: posters.title,
		posterPath: posters.poster_path,
		backdropPath: posters.backdrop_path,
		type: posters.type as "movie" | "tv" | "collection",
	};
}

export function formatPerson(person: DbPerson): Person {
	return {
		id: person.id,
		name: person.name,
		avatarUrl: person.avatar_url,
		link: `/profile/${person.id}`,
	};
}

export function formatPost(post: DbPost, userId: string): Post {
	return {
		id: post.id,
		content: post.content,
		createdAt: post.created_at,
		posters: post.posts_media.map(formatPoster),
		author: formatPerson(post.author),
		userHasLikedPost: hasUserLikedPost(post.likes, userId),
	};
}
