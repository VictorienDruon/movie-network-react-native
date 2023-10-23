import Post from "@/features/post-card/types/Post";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import Comment from "@/features/comment-card/types/Comment";
import { WatchlistItem } from "@/features/watchlist/types/WatchlistItem";
import DbPost from "../types/Post";
import DbPerson from "../types/Person";
import DbComment from "../types/Comment";
import Media from "../types/Media";
import { hasUserLikedPost } from "./filter";

function formatPoster({ posters }: { posters: Media }): Poster {
	return {
		id: posters.id.toString(),
		type: posters.type as "movie" | "tv" | "collection",
		title: posters.title,
		posterPath: posters.poster_path,
		backdropPath: posters.backdrop_path,
	};
}

export function formatWatchlistItem(item: Media): WatchlistItem {
	return {
		id: item.id.toString(),
		type: item.type as "movie" | "tv" | "collection",
		title: item.title,
		posterPath: item.poster_path,
		backdropPath: item.backdrop_path,
		date: item.date,
		runtime: item.runtime,
		seasonNumber: item.season_number,
		rating: item.rating,
		overview: item.overview,
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

export function formatComment(comment: DbComment): Comment {
	return {
		id: comment.id,
		content: comment.content,
		createdAt: comment.created_at,
		postId: comment.post_id,
		userId: comment.user_id,
		author: {
			id: comment.author.id,
			name: comment.author.name,
			avatarUrl: comment.author.avatar_url,
		},
	};
}
